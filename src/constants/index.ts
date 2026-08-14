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
  primario: '#6C5CE7',
  primarioOscuro: '#5A4BD1',
  fondo: '#F7F8FC',
  tarjeta: '#FFFFFF',
  texto: '#1E2430',
  textoSecundario: '#6B7280',
  error: '#EF4444',
  exito: '#10B981',
  borde: '#E5E7EB',
};

export const TIPO_COLORES: Record<TipoItem, string> = {
  pelicula: '#E74C3C',
  serie: '#3498DB',
  juego: '#E67E22',
};
