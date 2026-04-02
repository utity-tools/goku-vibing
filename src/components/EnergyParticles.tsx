import { useMemo } from 'react'
import type { EnergyParticleProps, Particle } from '../types'

/**
 * Partículas de energía flotantes que suben desde abajo.
 * Simulan el ki/aura de Goku disipándose en el ambiente.
 */
export function EnergyParticles({ count }: EnergyParticleProps) {
  // Generamos las partículas una sola vez con posiciones y tiempos aleatorios
  const particles = useMemo<Particle[]>(() => {
    const colores = [
      'rgba(251, 191, 36, 0.8)',   // dorado
      'rgba(249, 115, 22, 0.7)',   // naranja
      'rgba(96, 165, 250, 0.6)',   // azul ki
      'rgba(253, 230, 138, 0.9)',  // amarillo pálido
      'rgba(252, 211, 77, 0.75)',  // ámbar
    ]

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,       // posición horizontal en %
      size: Math.random() * 8 + 3,  // tamaño entre 3 y 11px
      duration: Math.random() * 6 + 4, // duración entre 4 y 10s
      delay: Math.random() * 5,     // delay inicial aleatorio
      color: colores[Math.floor(Math.random() * colores.length)],
    }))
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full particle"
          style={{
            left: `${p.x}%`,
            bottom: '0',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
