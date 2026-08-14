import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EstadoCarga } from '@/components/EstadoCarga';
import { EstadoError } from '@/components/EstadoError';
import { EstadoVacio } from '@/components/EstadoVacio';
import { ItemCard } from '@/components/ItemCard';
import { COLORES } from '@/constants';
import { obtenerItem } from '@/services/catalogo';
import { listarIdsDeseos, quitarDeseo } from '@/services/deseos';
import type { EstadoDatos, Item } from '@/types';

export default function PantallaDeseos() {
  const router = useRouter();
  const [estado, setEstado] = useState<EstadoDatos<Item[]>>({ estado: 'cargando' });

  const cargar = useCallback(async () => {
    setEstado({ estado: 'cargando' });
    try {
      const ids = await listarIdsDeseos();
      const items = await Promise.all(
        ids.map(async (id) => {
          try {
            return await obtenerItem(id);
          } catch {
            return null;
          }
        })
      );
      setEstado({ estado: 'exito', datos: items.filter((item): item is Item => item !== null) });
    } catch {
      setEstado({ estado: 'error', mensaje: 'No se pudo cargar la lista de deseos.' });
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [cargar])
  );

  const quitar = async (id: string) => {
    await quitarDeseo(id);
    cargar();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.pantalla}>
        <LinearGradient colors={['#F43F5E', '#BE123C']} style={styles.banner}>
          <SafeAreaView edges={['top']}>
            <View style={styles.bannerContenido}>
              <Ionicons name="heart" size={22} color="#FFFFFF" />
              <Text style={styles.bannerTitulo}>Lista de deseos</Text>
              <Text style={styles.bannerSubtitulo}>Lo que querés ver o jugar</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {estado.estado === 'cargando' && <EstadoCarga />}

        {estado.estado === 'error' && (
          <EstadoError mensaje={estado.mensaje} onReintentar={cargar} />
        )}

        {estado.estado === 'exito' &&
          (estado.datos.length === 0 ? (
            <EstadoVacio
              emoji="💔"
              titulo="Tu lista de deseos está vacía"
              mensaje="Explorá el catálogo y guardá lo que te gusta tocando el corazón en el detalle."
              etiquetaBoton="Ir al catálogo"
              onBoton={() => router.push('/')}
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
                  trailing={
                    <Pressable
                      onPress={() => quitar(item.id)}
                      style={({ pressed }) => [styles.botonQuitar, pressed && styles.botonQuitarPresionado]}>
                      <Ionicons name="heart-dislike" size={20} color={COLORES.error} />
                    </Pressable>
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
  lista: {
    flex: 1,
  },
  listaContenido: {
    padding: 16,
    gap: 12,
  },
  botonQuitar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonQuitarPresionado: {
    backgroundColor: '#FEE2E2',
  },
});
