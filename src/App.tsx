import { useState } from 'react'
import { GokuSprite } from './components/GokuSprite'
import { GlowTitle } from './components/GlowTitle'
import { MusicButton } from './components/MusicButton'
import { EnergyParticles } from './components/EnergyParticles'
import { useLofiMusic } from './hooks/useLofiMusic'

/**
 * Componente principal de la app "Goku is Vibing".
 * Orquesta el fondo animado, el sprite de Goku, el título y el control de música.
 */
function App() {
  const [musicState, toggleMusica] = useLofiMusic()

  // Estado local para forzar el vibe extra al activar la música
  const [vibing, setVibing] = useState(false)

  const handleMusicToggle = () => {
    toggleMusica()
    setVibing(!musicState.isPlaying)
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0a0410' }}
    >
      {/* ===== FONDO CON GRADIENTES ANIMADOS DE ENERGÍA ===== */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* Gradiente principal animado */}
        <div
          className="absolute inset-0 animate-energy-flow"
          style={{
            background: 'linear-gradient(135deg, #1a0a2e 0%, #0f172a 25%, #1c0a08 50%, #0f0a1a 75%, #0a1628 100%)',
          }}
        />

        {/* Orbe de energía central (aura de ki) */}
        <div
          className="absolute rounded-full animate-aura"
          style={{
            width: '600px',
            height: '600px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse, rgba(251,191,36,0.08) 0%, rgba(249,115,22,0.05) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Anillo exterior de energía giratorio */}
        <div
          className="absolute rounded-full animate-spin-slow"
          style={{
            width: '700px',
            height: '700px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(251, 191, 36, 0.06)',
            boxShadow: '0 0 60px rgba(251,191,36,0.04)',
          }}
        />

        {/* Anillo interior giratorio en sentido contrario */}
        <div
          className="absolute rounded-full animate-spin-reverse"
          style={{
            width: '500px',
            height: '500px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(249, 115, 22, 0.08)',
          }}
        />

        {/* Luz azul de ki en la esquina inferior */}
        <div
          className="absolute animate-pulse"
          style={{
            width: '400px',
            height: '400px',
            bottom: '-100px',
            right: '-50px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Luz dorada en la esquina superior */}
        <div
          className="absolute animate-pulse"
          style={{
            width: '350px',
            height: '350px',
            top: '-80px',
            left: '-50px',
            background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)',
            filter: 'blur(25px)',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* ===== PARTÍCULAS DE ENERGÍA FLOTANTES ===== */}
      <EnergyParticles count={25} />

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div
        className="relative flex flex-col items-center gap-8 px-4"
        style={{ zIndex: 10 }}
      >
        {/* Título con efecto glow */}
        <GlowTitle text="Goku is Vibing" />

        {/* Sprite de Goku */}
        <div className="relative">
          {/* Sombra/reflejo en el suelo */}
          <div
            className="absolute bottom-0 left-1/2 rounded-full animate-pulse"
            style={{
              width: '100px',
              height: '20px',
              transform: 'translate(-50%, 10px)',
              background: 'radial-gradient(ellipse, rgba(251,191,36,0.3) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
          <GokuSprite isVibing={vibing} />
        </div>

        {/* Cita chill de Goku */}
        <p
          className="text-center text-sm italic max-w-xs"
          style={{
            color: 'rgba(253, 230, 138, 0.6)',
            letterSpacing: '0.05em',
          }}
        >
          "A veces no hace falta luchar... solo vibrar con el universo."
        </p>

        {/* Botón de música */}
        <MusicButton
          isPlaying={musicState.isPlaying}
          onToggle={handleMusicToggle}
        />

        {/* Info de la música */}
        <div className="text-center" style={{ color: 'rgba(253, 230, 138, 0.35)' }}>
          <p className="text-xs tracking-widest uppercase">
            {musicState.isPlaying
              ? '♪ Lofi Hip-Hop • Web Audio API • 75 BPM ♪'
              : 'Activa la música para sentir el ki'}
          </p>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div
        className="absolute bottom-4 text-xs"
        style={{ color: 'rgba(253, 230, 138, 0.2)', zIndex: 10 }}
      >
        ⚡ Power Level: Over 9000 ⚡
      </div>
    </div>
  )
}

export default App
