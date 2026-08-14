import type { Item, TipoItem } from '@/types';
import { datosIniciales } from './data';
import { delay, latenciaAleatoria } from './latencia';

let catalogo: Item[] = [...datosIniciales];

export interface FiltrosCatalogo {
  tipo?: TipoItem | 'todos';
  genero?: string;
}

export async function listarItems(filtros: FiltrosCatalogo = {}): Promise<Item[]> {
  await delay(latenciaAleatoria());
  let resultado = catalogo;
  if (filtros.tipo && filtros.tipo !== 'todos') {
    resultado = resultado.filter((item) => item.tipo === filtros.tipo);
  }
  if (filtros.genero) {
    resultado = resultado.filter((item) => item.genero === filtros.genero);
  }
  return [...resultado];
}

export async function obtenerItem(id: string): Promise<Item> {
  await delay(latenciaAleatoria());
  const item = catalogo.find((item) => item.id === id);
  if (!item) {
    throw new Error('Item no encontrado');
  }
  return item;
}

export async function crearItem(datos: Omit<Item, 'id'>): Promise<Item> {
  await delay(latenciaAleatoria());
  const item: Item = { ...datos, id: String(Date.now()) };
  catalogo = [item, ...catalogo];
  return item;
}

export async function actualizarItem(id: string, datos: Omit<Item, 'id'>): Promise<Item> {
  await delay(latenciaAleatoria());
  const existe = catalogo.some((item) => item.id === id);
  if (!existe) {
    throw new Error('Item no encontrado');
  }
  const actualizado: Item = { ...datos, id };
  catalogo = catalogo.map((item) => (item.id === id ? actualizado : item));
  return actualizado;
}
