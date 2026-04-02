import type { GokuProps } from '../types'

/**
 * Goku en pixel art construido con divs y SVG.
 * Cada "pixel" es un div con color específico.
 * Cuando está vibing, flota y su aura pulsa más rápido.
 */
export function GokuSprite({ isVibing }: GokuProps) {
  return (
    <div className={`relative flex items-center justify-center ${isVibing ? 'animate-float' : 'animate-bounce-subtle'}`}>

      {/* Aura de ki exterior */}
      <div
        className="absolute rounded-full animate-aura"
        style={{
          width: '280px',
          height: '320px',
          background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.15) 0%, rgba(249, 115, 22, 0.08) 50%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Aura de ki interior (más brillante) */}
      <div
        className="absolute rounded-full"
        style={{
          width: '180px',
          height: '220px',
          background: 'radial-gradient(ellipse, rgba(253, 230, 138, 0.25) 0%, rgba(251, 146, 60, 0.15) 40%, transparent 70%)',
          filter: 'blur(4px)',
          animation: 'auraFlicker 1s ease-in-out infinite',
        }}
      />

      {/* Cuerpo de Goku en SVG pixel art */}
      <svg
        width="120"
        height="180"
        viewBox="0 0 120 180"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: 'pixelated', position: 'relative', zIndex: 10 }}
      >
        {/* ===== PELO (Super Saiyan dorado con picos) ===== */}
        {/* Pico izquierdo lejano */}
        <rect x="20" y="10" width="12" height="30" fill="#FCD34D" />
        <rect x="16" y="18" width="8" height="20" fill="#FCD34D" />

        {/* Pico izquierdo */}
        <rect x="28" y="4" width="12" height="36" fill="#FBBF24" />
        <rect x="24" y="12" width="8" height="24" fill="#FBBF24" />

        {/* Pico central izquierdo */}
        <rect x="38" y="0" width="12" height="40" fill="#F59E0B" />

        {/* Pico central */}
        <rect x="50" y="2" width="12" height="38" fill="#FCD34D" />
        <rect x="54" y="0" width="8" height="20" fill="#FDE68A" />

        {/* Pico central derecho */}
        <rect x="62" y="4" width="10" height="34" fill="#FBBF24" />

        {/* Pico derecho */}
        <rect x="72" y="8" width="12" height="30" fill="#F59E0B" />

        {/* Base del pelo */}
        <rect x="24" y="28" width="64" height="16" fill="#F59E0B" />
        <rect x="20" y="34" width="72" height="10" fill="#D97706" />

        {/* ===== CARA ===== */}
        {/* Piel de la cara */}
        <rect x="26" y="38" width="60" height="44" rx="4" fill="#FDBCB4" />

        {/* Cejas negras serias */}
        <rect x="32" y="42" width="18" height="4" fill="#1C1917" rx="1" />
        <rect x="62" y="42" width="18" height="4" fill="#1C1917" rx="1" />

        {/* Ojos - expresión intensa */}
        {/* Ojo izquierdo */}
        <rect x="32" y="50" width="20" height="14" rx="2" fill="white" />
        <rect x="37" y="52" width="10" height="10" rx="2" fill="#1E40AF" />
        <rect x="40" y="54" width="5" height="5" rx="1" fill="#1C1917" />
        <rect x="41" y="55" width="2" height="2" fill="white" />

        {/* Ojo derecho */}
        <rect x="60" y="50" width="20" height="14" rx="2" fill="white" />
        <rect x="64" y="52" width="10" height="10" rx="2" fill="#1E40AF" />
        <rect x="67" y="54" width="5" height="5" rx="1" fill="#1C1917" />
        <rect x="68" y="55" width="2" height="2" fill="white" />

        {/* Nariz */}
        <rect x="54" y="62" width="4" height="6" rx="1" fill="#E8A99E" />

        {/* Boca - sonrisa chill */}
        <rect x="42" y="72" width="28" height="4" rx="2" fill="#C0392B" />
        <rect x="44" y="72" width="24" height="6" rx="3" fill="#E74C3C" />

        {/* Mejillas sonrosadas */}
        <rect x="28" y="66" width="12" height="8" rx="4" fill="#FCA5A5" opacity="0.5" />
        <rect x="72" y="66" width="12" height="8" rx="4" fill="#FCA5A5" opacity="0.5" />

        {/* Cicatriz de Goku */}
        <rect x="36" y="56" width="3" height="10" fill="#C8847A" opacity="0.6" rx="1" />

        {/* ===== CUELLO ===== */}
        <rect x="46" y="80" width="20" height="12" fill="#FDBCB4" />

        {/* ===== GI (uniforme naranja) ===== */}
        {/* Torso principal */}
        <rect x="24" y="90" width="64" height="52" rx="2" fill="#EA580C" />

        {/* Cuello del gi (azul) */}
        <rect x="46" y="90" width="20" height="8" fill="#1D4ED8" />

        {/* Línea del cinturón */}
        <rect x="24" y="128" width="64" height="10" fill="#1D4ED8" />

        {/* Pliegues del gi */}
        <rect x="56" y="92" width="4" height="44" fill="#C2410C" opacity="0.4" />
        <rect x="40" y="96" width="3" height="36" fill="#C2410C" opacity="0.3" />
        <rect x="70" y="96" width="3" height="36" fill="#C2410C" opacity="0.3" />

        {/* ===== BRAZOS ===== */}
        {/* Brazo izquierdo */}
        <rect x="10" y="90" width="16" height="50" rx="6" fill="#EA580C" />
        <rect x="10" y="120" width="16" height="24" rx="4" fill="#FDBCB4" />

        {/* Brazo derecho - levantado haciendo la señal de "relax" */}
        <rect x="86" y="86" width="16" height="50" rx="6" fill="#EA580C" />
        <rect x="86" y="110" width="16" height="30" rx="4" fill="#FDBCB4" />

        {/* Manos */}
        {/* Mano izquierda */}
        <rect x="8" y="140" width="20" height="16" rx="5" fill="#FDBCB4" />

        {/* Mano derecha - pulgares arriba */}
        <rect x="84" y="136" width="20" height="16" rx="5" fill="#FDBCB4" />
        <rect x="98" y="128" width="8" height="12" rx="3" fill="#FDBCB4" />

        {/* ===== PIERNAS ===== */}
        {/* Pierna izquierda */}
        <rect x="28" y="138" width="26" height="32" rx="4" fill="#EA580C" />
        {/* Pierna derecha */}
        <rect x="58" y="138" width="26" height="32" rx="4" fill="#EA580C" />

        {/* ===== PIES (botas) ===== */}
        {/* Bota izquierda */}
        <rect x="24" y="164" width="30" height="16" rx="4" fill="#1C1917" />
        {/* Bota derecha */}
        <rect x="58" y="164" width="30" height="16" rx="4" fill="#1C1917" />

        {/* ===== NOTAS MUSICALES flotando (vibing) ===== */}
        <text x="6" y="50" fontSize="14" fill="#FDE68A" opacity="0.9" className="animate-wave">♪</text>
        <text x="100" y="40" fontSize="12" fill="#FCD34D" opacity="0.8">♫</text>
        <text x="102" y="70" fontSize="10" fill="#FDE68A" opacity="0.7">♩</text>
      </svg>

      {/* Destellos de energía en las manos */}
      <div
        className="absolute rounded-full animate-pulse"
        style={{
          width: '24px',
          height: '24px',
          left: '4px',
          bottom: '14px',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.9), rgba(59, 130, 246, 0.4))',
          filter: 'blur(2px)',
          zIndex: 5,
        }}
      />
    </div>
  )
}
