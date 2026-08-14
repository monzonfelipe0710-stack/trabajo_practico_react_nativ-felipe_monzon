import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EstadoCarga } from '@/components/EstadoCarga';
import { EstadoError } from '@/components/EstadoError';
import { EstadoVacio } from '@/components/EstadoVacio';
import { FiltroChips } from '@/components/FiltroChips';
import { ItemCard } from '@/components/ItemCard';
import { COLORES, GENEROS_POR_TIPO, TIPOS } from '@/constants';
import { listarItems } from '@/services/catalogo';
import type { EstadoDatos, Item, TipoItem } from '@/types';

export default function PantallaInicio() {
  const router = useRouter();
  const [tipo, setTipo] = useState<TipoItem | 'todos'>('todos');
  const [genero, setGenero] = useState<string | undefined>(undefined);
  const [estado, setEstado] = useState<EstadoDatos<Item[]>>({ estado: 'cargando' });

  const cargar = useCallback(async () => {
    setEstado({ estado: 'cargando' });
    try {
      const items = await listarItems({ tipo, genero });
      setEstado({ estado: 'exito', datos: items });
    } catch {
      setEstado({ estado: 'error', mensaje: 'No se pudo cargar el catálogo.' });
    }
  }, [tipo, genero]);

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [cargar])
  );

  const cambiarTipo = (nuevoTipo: TipoItem | 'todos') => {
    setTipo(nuevoTipo);
    setGenero(undefined);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.pantalla}>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.banner}>
          <SafeAreaView edges={['top']}>
            <View style={styles.bannerContenido}>
              <Ionicons name="sparkles" size={22} color="#FFFFFF" />
              <Text style={styles.bannerTitulo}>GeekCatálogo</Text>
              <Text style={styles.bannerSubtitulo}>Películas, series y juegos</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.filtros}>
          <FiltroChips opciones={TIPOS} seleccionado={tipo} onSeleccionar={cambiarTipo} />
          {tipo !== 'todos' && (
            <FiltroChips
              opciones={[
                { valor: 'Todos', etiqueta: 'Todos' },
                ...GENEROS_POR_TIPO[tipo].map((generoOpcion) => ({
                  valor: generoOpcion,
                  etiqueta: generoOpcion,
                })),
              ]}
              seleccionado={genero ?? 'Todos'}
              onSeleccionar={(valor) => setGenero(valor === 'Todos' ? undefined : valor)}
            />
          )}
        </View>

        {estado.estado === 'cargando' && <EstadoCarga />}

        {estado.estado === 'error' && (
          <EstadoError mensaje={estado.mensaje} onReintentar={cargar} />
        )}

        {estado.estado === 'exito' &&
          (estado.datos.length === 0 ? (
            <EstadoVacio
              emoji="🔍"
              titulo="Sin resultados"
              mensaje="No hay items que coincidan con el filtro elegido."
            />
          ) : (
            <FlatList
              style={styles.lista}
              contentContainerStyle={styles.listaContenido}
              data={estado.datos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ItemCard
                  item={item}
                  onPress={() =>
                    router.push({ pathname: '/item/[id]', params: { id: item.id } })
                  }
                />
              )}
            />
          ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },
  banner: {
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  bannerContenido: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 2,
  },
  bannerTitulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bannerSubtitulo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  filtros: {
    paddingVertical: 14,
    gap: 10,
  },
  lista: {
    flex: 1,
  },
  listaContenido: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 12,
  },
});
