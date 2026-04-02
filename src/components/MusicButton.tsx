import type { MusicButtonProps } from '../types'

/**
 * Botón para activar/desactivar la música lofi generada con Web Audio API.
 * Muestra el estado actual con icono y animación.
 */
export function MusicButton({ isPlaying, onToggle }: MusicButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="relative group cursor-pointer"
      style={{ background: 'none', border: 'none', padding: 0 }}
      aria-label={isPlaying ? 'Pausar música lofi' : 'Reproducir música lofi'}
    >
      {/* Resplandor exterior del botón */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isPlaying ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.3), transparent)',
          filter: 'blur(8px)',
          animation: isPlaying ? 'auraFlicker 1.5s ease-in-out infinite' : 'none',
        }}
      />

      {/* Contenedor principal del botón */}
      <div
        className={`relative flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
          isPlaying
            ? 'border-amber-400 bg-amber-500/20 text-amber-300'
            : 'border-orange-500/50 bg-orange-900/30 text-orange-300 hover:border-orange-400 hover:bg-orange-800/40'
        }`}
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: isPlaying
            ? '0 0 20px rgba(251,191,36,0.4), 0 0 40px rgba(249,115,22,0.2), inset 0 0 10px rgba(251,191,36,0.1)'
            : '0 0 10px rgba(249,115,22,0.2), inset 0 0 5px rgba(249,115,22,0.05)',
        }}
      >
        {/* Icono de música / pausa */}
        <span
          className={`text-2xl transition-transform duration-300 ${isPlaying ? 'animate-bounce-subtle' : ''}`}
        >
          {isPlaying ? '🎵' : '🎧'}
        </span>

        {/* Texto del botón */}
        <span className="font-semibold text-sm tracking-wide">
          {isPlaying ? 'Vibing...' : 'Play Lofi'}
        </span>

        {/* Ecualizador animado cuando está reproduciendo */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-5">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className="w-1 bg-amber-400 rounded-sm"
                style={{
                  height: `${Math.random() * 60 + 40}%`,
                  animation: `bounce-subtle ${0.3 + bar * 0.15}s ease-in-out infinite alternate`,
                  animationDelay: `${bar * 0.08}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Texto de estado debajo */}
      <p className="text-center text-xs text-orange-400/60 mt-1 tracking-widest">
        {isPlaying ? 'Web Audio API ♪' : 'click para vibing'}
      </p>
    </button>
  )
}
