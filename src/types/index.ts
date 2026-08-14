export type TipoItem = 'pelicula' | 'serie' | 'juego';

export interface Item {
  id: string;
  tipo: TipoItem;
  titulo: string;
  genero: string;
  anio: number;
  descripcion: string;
  puntuacion: number;
  plataforma: string;
  emoji: string;
  color: string;
}
