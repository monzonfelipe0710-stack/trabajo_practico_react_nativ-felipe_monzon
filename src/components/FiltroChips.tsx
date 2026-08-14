import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { COLORES } from '@/constants';

interface Opcion<T extends string> {
  valor: T;
  etiqueta: string;
}

interface Props<T extends string> {
  opciones: Opcion<T>[];
  seleccionado: T;
  onSeleccionar: (valor: T) => void;
}

export function FiltroChips<T extends string>({ opciones, seleccionado, onSeleccionar }: Props<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contenedor}>
      {opciones.map((opcion) => {
        const activo = opcion.valor === seleccionado;
        return (
          <Pressable
            key={opcion.valor}
            onPress={() => onSeleccionar(opcion.valor)}
            style={[styles.chip, activo && styles.chipActivo]}>
            <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>
              {opcion.etiqueta}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    gap: 8,
    paddingHorizontal: 16,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORES.tarjeta,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  chipActivo: {
    backgroundColor: COLORES.primario,
    borderColor: COLORES.primario,
  },
  chipTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORES.texto,
  },
  chipTextoActivo: {
    color: '#FFFFFF',
  },
});
