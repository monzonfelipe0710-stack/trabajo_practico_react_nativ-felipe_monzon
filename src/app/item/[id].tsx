import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EstadoCarga } from '@/components/EstadoCarga';
import { EstadoError } from '@/components/EstadoError';
import { COLORES, SOMBRAS, TIPO_COLORES, TIPO_ETIQUETA, oscurecerColor } from '@/constants';
import { obtenerItem } from '@/services/catalogo';
import type { EstadoDatos, Item } from '@/types';

export default function PantallaDetalle() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [estado, setEstado] = useState<EstadoDatos<Item>>({ estado: 'cargando' });

  const cargar = useCallback(async () => {
    setEstado({ estado: 'cargando' });
    try {
      const item = await obtenerItem(id);
      setEstado({ estado: 'exito', datos: item });
    } catch {
      setEstado({ estado: 'error', mensaje: 'No se pudo encontrar el item.' });
    }
  }, [id]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  if (estado.estado === 'cargando') {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <EstadoCarga />
      </>
    );
  }

  if (estado.estado === 'error') {
    return (
      <>
        <Stack.Screen options={{ title: 'Detalle' }} />
        <EstadoError mensaje={estado.mensaje} onReintentar={cargar} />
      </>
    );
  }

  const item = estado.datos;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
        <LinearGradient
          colors={[item.color, oscurecerColor(item.color, 0.4)]}
          style={styles.hero}>
          <SafeAreaView edges={['top']}>
            <Pressable onPress={() => router.back()} style={styles.botonAtras}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <View style={styles.pills}>
              <View style={[styles.pill, { backgroundColor: TIPO_COLORES[item.tipo] }]}>
                <Text style={styles.pillTexto}>{TIPO_ETIQUETA[item.tipo]}</Text>
              </View>
              <View style={styles.pill}>
                <Text style={styles.pillTexto}>{item.anio}</Text>
              </View>
              <View style={styles.pill}>
                <Text style={styles.pillTexto}>{item.genero}</Text>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.cuerpo}>
          <View style={[styles.tarjeta, styles.tarjetaPuntuacion]}>
            <Text style={styles.estrella}>★</Text>
            <View>
              <Text style={styles.puntuacion}>{item.puntuacion.toFixed(1)}</Text>
              <Text style={styles.puntuacionEtiqueta}>puntuación</Text>
            </View>
            <View style={styles.divisor} />
            <View style={styles.plataforma}>
              <Ionicons name="play-circle" size={20} color={COLORES.primario} />
              <Text style={styles.plataformaTexto}>{item.plataforma}</Text>
            </View>
          </View>

          <View style={[styles.tarjeta, styles.tarjetaSeccion]}>
            <Text style={styles.tituloSeccion}>Descripción</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </View>

          <View style={[styles.tarjeta, styles.tarjetaSeccion]}>
            <Text style={styles.tituloSeccion}>Detalles</Text>
            <View style={styles.detalleFila}>
              <Ionicons name="pricetag" size={18} color={COLORES.textoSecundario} />
              <Text style={styles.detalleTexto}>{item.genero}</Text>
            </View>
            <View style={styles.detalleFila}>
              <Ionicons name="calendar" size={18} color={COLORES.textoSecundario} />
              <Text style={styles.detalleTexto}>Estrenado en {item.anio}</Text>
            </View>
            <View style={styles.detalleFila}>
              <Ionicons name="tv" size={18} color={COLORES.textoSecundario} />
              <Text style={styles.detalleTexto}>{item.plataforma}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: COLORES.fondo,
  },
  contenido: {
    paddingBottom: 40,
  },
  hero: {
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: 'center',
  },
  botonAtras: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  pillTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cuerpo: {
    padding: 20,
    gap: 16,
    marginTop: -12,
  },
  tarjeta: {
    backgroundColor: COLORES.tarjeta,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORES.borde,
    ...SOMBRAS.tarjeta,
  },
  tarjetaPuntuacion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  estrella: {
    fontSize: 34,
    color: COLORES.estrella,
  },
  puntuacion: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORES.texto,
  },
  puntuacionEtiqueta: {
    fontSize: 12,
    color: COLORES.textoSecundario,
  },
  divisor: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: COLORES.borde,
    marginHorizontal: 4,
  },
  plataforma: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  plataformaTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORES.texto,
    flexShrink: 1,
  },
  tarjetaSeccion: {
    padding: 16,
    gap: 10,
  },
  tituloSeccion: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORES.texto,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  descripcion: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORES.texto,
  },
  detalleFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detalleTexto: {
    fontSize: 14,
    color: COLORES.textoSecundario,
  },
});
