import { StyleSheet, Text, View } from 'react-native';

import type { Item } from '@/types';

interface Props {
  item: Item;
  tamaño?: number;
}

export function PortadaSimulada({ item, tamaño = 64 }: Props) {
  return (
    <View
      style={[
        styles.contenedor,
        { backgroundColor: item.color, width: tamaño, height: tamaño, borderRadius: tamaño / 5 },
      ]}>
      <Text style={[styles.emoji, { fontSize: tamaño * 0.45 }]}>{item.emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
