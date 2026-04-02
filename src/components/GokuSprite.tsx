import type { GokuProps } from '../types'

export function GokuSprite({ isVibing }: GokuProps) {
  return (
    <div className={`relative flex items-center justify-center ${isVibing ? 'animate-float' : 'animate-bounce-subtle'}`}>

      {/* Aura de ki exterior */}
      <div
        className="absolute rounded-full animate-aura"
        style={{
          width: '320px',
          height: '380px',
          background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.15) 0%, rgba(249, 115, 22, 0.08) 50%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Aura de ki interior (más brillante) */}
      <div
        className="absolute rounded-full"
        style={{
          width: '220px',
          height: '280px',
          background: 'radial-gradient(ellipse, rgba(253, 230, 138, 0.25) 0%, rgba(251, 146, 60, 0.15) 40%, transparent 70%)',
          filter: 'blur(4px)',
          animation: 'auraFlicker 1s ease-in-out infinite',
        }}
      />

      {/* Imagen de Goku */}
      <img
        src="/goku-vibing.png"
        alt="Goku"
        style={{
          width: '260px',
          height: 'auto',
          position: 'relative',
          zIndex: 10,
          filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.4))',
        }}
      />

      {/* Notas musicales flotando */}
      <div className="absolute" style={{ top: '10px', left: '0px', fontSize: '20px', color: '#FDE68A', opacity: 0.9, zIndex: 11 }}>♪</div>
      <div className="absolute" style={{ top: '0px', right: '10px', fontSize: '16px', color: '#FCD34D', opacity: 0.8, zIndex: 11 }}>♫</div>
      <div className="absolute" style={{ top: '40px', right: '0px', fontSize: '13px', color: '#FDE68A', opacity: 0.7, zIndex: 11 }}>♩</div>
    </div>
  )
}
