// Tipos para los componentes de la app Goku is Vibing

/** Estado del reproductor de música lofi */
export interface MusicPlayerState {
  isPlaying: boolean;
  volume: number;
  audioContext: AudioContext | null;
}

/** Props para el componente de Goku pixel art */
export interface GokuProps {
  isVibing: boolean;
}

/** Props para el botón de música */
export interface MusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

/** Props para las partículas de energía flotantes */
export interface EnergyParticleProps {
  count: number;
}

/** Una partícula individual de energía */
export interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

/** Props para el fondo animado con gradientes */
export interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

/** Props para el título con efecto glow */
export interface GlowTitleProps {
  text: string;
}
