import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { COLORES } from '@/constants';

export function EstadoCarga() {
  return (
    <View style={styles.contenedor}>
      <ActivityIndicator size="large" color={COLORES.primario} />
      <Text style={styles.texto}>Cargando…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: COLORES.fondo,
  },
  texto: {
    fontSize: 15,
    color: COLORES.textoSecundario,
  },
});
