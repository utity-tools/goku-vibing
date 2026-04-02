import { useState, useRef, useCallback } from 'react'
import type { MusicPlayerState } from '../types'

/**
 * Hook para generar y controlar música lofi con Web Audio API.
 * Crea capas de sonido: drones armónicos + ruido ambiente + ritmo suave.
 * Todo generado proceduralmente, sin archivos de audio externos.
 */
export function useLofiMusic(): [MusicPlayerState, () => void] {
  const [state, setState] = useState<MusicPlayerState>({
    isPlaying: false,
    volume: 0.4,
    audioContext: null,
  })

  // Referencias a los nodos de audio para poder detenerlos
  const nodesRef = useRef<AudioNode[]>([])
  const masterGainRef = useRef<GainNode | null>(null)

  /**
   * Crea un oscilador con tipo y frecuencia dados, conectado al nodo destino.
   */
  const crearOscilador = (
    ctx: AudioContext,
    tipo: OscillatorType,
    frecuencia: number,
    ganancia: number,
    destino: AudioNode
  ): OscillatorNode => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = tipo
    osc.frequency.value = frecuencia
    gain.gain.value = ganancia

    osc.connect(gain)
    gain.connect(destino)
    osc.start()

    nodesRef.current.push(osc, gain)
    return osc
  }

  /**
   * Crea ruido café (brown noise) que suena como lluvia/cassette.
   * Se genera filtrando ruido blanco con un filtro paso-bajo.
   */
  const crearRuidoCafe = (ctx: AudioContext, destino: AudioNode): void => {
    const bufferSize = ctx.sampleRate * 2 // 2 segundos de buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // Algoritmo de ruido café (integración de ruido blanco)
    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      data[i] = (lastOut + 0.02 * white) / 1.02
      lastOut = data[i]
      data[i] *= 3.5 // amplificamos un poco
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 400

    const gain = ctx.createGain()
    gain.gain.value = 0.03 // muy sutil, solo textura

    source.connect(filter)
    filter.connect(gain)
    gain.connect(destino)
    source.start()

    nodesRef.current.push(source, filter, gain)
  }

  /**
   * Crea una capa de acordes suaves (pad lofi estilo chillhop).
   * Usa triángulos y senos para simular un pad de teclado cálido.
   */
  const crearPadArmonico = (ctx: AudioContext, destino: AudioNode): void => {
    // Notas del acorde Am7 (la menor séptima) - muy chill
    const notas = [220, 261.63, 329.63, 392, 440, 523.25]
    const reverb = crearReverb(ctx)
    reverb.connect(destino)

    notas.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = i % 2 === 0 ? 'triangle' : 'sine'
      osc.frequency.value = freq

      // Ligero detune para calidez de cassette
      osc.detune.value = (Math.random() - 0.5) * 12

      gain.gain.value = 0.04 / (i + 1) // las notas más agudas suenan más suave

      osc.connect(gain)
      gain.connect(reverb)
      osc.start()

      nodesRef.current.push(osc, gain)
    })

    nodesRef.current.push(reverb)
  }

  /**
   * Simula un reverb básico con delay nodes encadenados.
   */
  const crearReverb = (ctx: AudioContext): ConvolverNode => {
    const convolver = ctx.createConvolver()
    const rate = ctx.sampleRate
    const length = rate * 2 // 2 segundos de reverb
    const impulse = ctx.createBuffer(2, length, rate)

    // Generamos el impulso del reverb
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2)
      }
    }

    convolver.buffer = impulse
    return convolver
  }

  /**
   * Crea el hi-hat sutil del lofi (tick-tick suave y rítmico).
   */
  const crearHiHat = (ctx: AudioContext, destino: AudioNode): void => {
    const bpm = 75 // ritmo chill de lofi
    const intervalo = 60 / bpm / 2 // cada corchea

    const tick = () => {
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate)
      const data = buffer.getChannelData(0)

      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 8)
      }

      const source = ctx.createBufferSource()
      source.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.value = 8000

      const gain = ctx.createGain()
      gain.gain.value = 0.08

      source.connect(filter)
      filter.connect(gain)
      gain.connect(destino)
      source.start()

      nodesRef.current.push(source, filter, gain)
    }

    // Programamos los hi-hats como intervalos
    const id = setInterval(tick, intervalo * 1000)

    // Guardamos el ID para poder cancelarlo
    ;(nodesRef.current as unknown as { hiHatInterval?: ReturnType<typeof setInterval> }).hiHatInterval = id
  }

  /**
   * Activa o desactiva la música lofi.
   */
  const toggleMusica = useCallback(() => {
    if (state.isPlaying) {
      // Detenemos todos los nodos de audio
      nodesRef.current.forEach((node) => {
        try {
          if (node instanceof AudioBufferSourceNode || node instanceof OscillatorNode) {
            node.stop()
          }
        } catch {
          // Algunos nodos ya pueden estar detenidos
        }
      })

      // Cancelamos el intervalo del hi-hat
      const hiHatInterval = (nodesRef.current as unknown as { hiHatInterval?: ReturnType<typeof setInterval> }).hiHatInterval
      if (hiHatInterval) clearInterval(hiHatInterval)

      nodesRef.current = []

      // Fade out del contexto
      if (masterGainRef.current && state.audioContext) {
        masterGainRef.current.gain.exponentialRampToValueAtTime(
          0.001,
          state.audioContext.currentTime + 0.5
        )
        setTimeout(() => {
          state.audioContext?.close()
        }, 600)
      }

      setState({ isPlaying: false, volume: 0.4, audioContext: null })
    } else {
      // Creamos el contexto de audio
      const ctx = new AudioContext()
      const masterGain = ctx.createGain()
      masterGain.gain.value = 0

      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain

      // Construimos las capas de sonido
      crearPadArmonico(ctx, masterGain)
      crearRuidoCafe(ctx, masterGain)
      crearHiHat(ctx, masterGain)

      // Agregamos también drones bajos para más profundidad
      crearOscilador(ctx, 'sine', 55, 0.06, masterGain)    // bass drone La
      crearOscilador(ctx, 'triangle', 110, 0.03, masterGain) // octava arriba

      // Fade in suave
      masterGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 2)

      setState({ isPlaying: true, volume: 0.4, audioContext: ctx })
    }
  }, [state])

  return [state, toggleMusica]
}
