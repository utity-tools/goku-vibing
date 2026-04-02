import type { GlowTitleProps } from '../types'

/**
 * Título con efecto glow pulsante naranja/dorado.
 * El texto vibra suavemente para transmitir el vibe chill-épico.
 */
export function GlowTitle({ text }: GlowTitleProps) {
  return (
    <div className="text-center select-none" style={{ zIndex: 10, position: 'relative' }}>
      {/* Subtítulo superior */}
      <p
        className="text-amber-300 text-sm font-medium tracking-widest uppercase mb-2 animate-pulse"
        style={{ letterSpacing: '0.4em' }}
      >
        ✦ Super Saiyan Lofi ✦
      </p>

      {/* Título principal con glow */}
      <h1
        className="animate-pulse-glow animate-vibe-text font-black uppercase"
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          background: 'linear-gradient(135deg, #FDE68A 0%, #FBBF24 30%, #F97316 60%, #FB923C 80%, #FDE68A 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s linear infinite, pulseGlow 2s ease-in-out infinite',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {text}
      </h1>

      {/* Línea decorativa debajo */}
      <div className="flex items-center justify-center gap-3 mt-3">
        <div
          className="h-px flex-1 max-w-xs"
          style={{
            background: 'linear-gradient(to right, transparent, #FBBF24, transparent)',
          }}
        />
        <span className="text-amber-400 text-lg">⚡</span>
        <div
          className="h-px flex-1 max-w-xs"
          style={{
            background: 'linear-gradient(to right, transparent, #FBBF24, transparent)',
          }}
        />
      </div>
    </div>
  )
}
