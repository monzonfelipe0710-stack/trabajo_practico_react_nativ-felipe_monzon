import type { TipoItem } from '@/types';

export const TIPOS: { valor: TipoItem | 'todos'; etiqueta: string }[] = [
  { valor: 'todos', etiqueta: 'Todos' },
  { valor: 'pelicula', etiqueta: 'Películas' },
  { valor: 'serie', etiqueta: 'Series' },
  { valor: 'juego', etiqueta: 'Juegos' },
];

export const GENEROS_POR_TIPO: Record<TipoItem, string[]> = {
  pelicula: ['Acción', 'Ciencia ficción', 'Terror', 'Comedia', 'Drama'],
  serie: ['Drama', 'Comedia', 'Crimen', 'Ciencia ficción', 'Documental'],
  juego: ['Aventura', 'RPG', 'Shooter', 'Estrategia', 'Deportes'],
};

export const TIPO_ETIQUETA: Record<TipoItem, string> = {
  pelicula: 'Película',
  serie: 'Serie',
  juego: 'Juego',
};

export const COLORES = {
  primario: '#7C5CFC',
  primarioOscuro: '#5B3FD4',
  primarioClaro: '#EDE9FE',
  fondo: '#F4F5FB',
  tarjeta: '#FFFFFF',
  texto: '#1E2430',
  textoSecundario: '#6B7280',
  error: '#EF4444',
  exito: '#10B981',
  borde: '#EAECF3',
  estrella: '#F59E0B',
};

export const TIPO_COLORES: Record<TipoItem, string> = {
  pelicula: '#E74C3C',
  serie: '#3498DB',
  juego: '#E67E22',
};

export const SOMBRAS = {
  tarjeta: {
    shadowColor: '#1E2430',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  flotante: {
    shadowColor: COLORES.primario,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
};

export function oscurecerColor(hex: string, cantidad: number): string {
  const limpio = hex.replace('#', '');
  const numero = parseInt(limpio, 16);
  const r = Math.max(0, Math.round(((numero >> 16) & 0xff) * (1 - cantidad)));
  const g = Math.max(0, Math.round(((numero >> 8) & 0xff) * (1 - cantidad)));
  const b = Math.max(0, Math.round((numero & 0xff) * (1 - cantidad)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
