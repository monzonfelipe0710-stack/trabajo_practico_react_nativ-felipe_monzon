import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_DESEOS = '@geekcatalogo/deseos';

async function listarIds(): Promise<string[]> {
  const valor = await AsyncStorage.getItem(CLAVE_DESEOS);
  if (!valor) {
    return [];
  }
  try {
    const ids: unknown = JSON.parse(valor);
    return Array.isArray(ids) ? (ids.filter((id) => typeof id === 'string') as string[]) : [];
  } catch {
    return [];
  }
}

async function guardarIds(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(CLAVE_DESEOS, JSON.stringify(ids));
}

export async function listarIdsDeseos(): Promise<string[]> {
  return listarIds();
}

export async function estaEnDeseos(id: string): Promise<boolean> {
  const ids = await listarIds();
  return ids.includes(id);
}

export async function agregarDeseo(id: string): Promise<string[]> {
  const ids = await listarIds();
  const nuevos = ids.includes(id) ? ids : [...ids, id];
  await guardarIds(nuevos);
  return nuevos;
}

export async function quitarDeseo(id: string): Promise<string[]> {
  const ids = await listarIds();
  const nuevos = ids.filter((deseo) => deseo !== id);
  await guardarIds(nuevos);
  return nuevos;
}
