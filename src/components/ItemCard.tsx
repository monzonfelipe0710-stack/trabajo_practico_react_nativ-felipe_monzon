import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORES, SOMBRAS, TIPO_COLORES, TIPO_ETIQUETA } from '@/constants';
import type { Item } from '@/types';
import { PortadaSimulada } from './PortadaSimulada';

interface Props {
  item: Item;
  onPress: () => void;
  trailing?: ReactNode;
}

export function ItemCard({ item, onPress, trailing }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}>
      <PortadaSimulada item={item} tamaño={72} />
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>
          {item.titulo}
        </Text>
        <View style={styles.metadatos}>
          <View style={[styles.pillTipo, { backgroundColor: TIPO_COLORES[item.tipo] }]}>
            <Text style={styles.pillTexto}>{TIPO_ETIQUETA[item.tipo]}</Text>
          </View>
          <Text style={styles.anio}>{item.anio}</Text>
        </View>
        <View style={styles.puntuacion}>
          <Text style={styles.estrella}>★</Text>
          <Text style={styles.puntuacionTexto}>{item.puntuacion.toFixed(1)}</Text>
        </View>
      </View>
      {trailing}
      <Ionicons name="chevron-forward" size={22} color={COLORES.textoSecundario} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORES.tarjeta,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORES.borde,
    ...SOMBRAS.tarjeta,
  },
  presionada: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  info: {
    flex: 1,
    gap: 6,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORES.texto,
  },
  metadatos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pillTipo: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pillTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  anio: {
    fontSize: 13,
    color: COLORES.textoSecundario,
  },
  puntuacion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  estrella: {
    color: COLORES.estrella,
    fontSize: 14,
  },
  puntuacionTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORES.texto,
  },
});
