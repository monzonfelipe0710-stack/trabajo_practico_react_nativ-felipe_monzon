import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORES } from '@/constants';

interface Props {
  mensaje: string;
  onReintentar: () => void;
}

export function EstadoError({ mensaje, onReintentar }: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.emoji}>😕</Text>
      <Text style={styles.titulo}>Algo salió mal</Text>
      <Text style={styles.mensaje}>{mensaje}</Text>
      <Pressable
        onPress={onReintentar}
        style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}>
        <Text style={styles.botonTexto}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 24,
    backgroundColor: COLORES.fondo,
  },
  emoji: {
    fontSize: 48,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORES.texto,
    textAlign: 'center',
  },
  mensaje: {
    fontSize: 14,
    color: COLORES.textoSecundario,
    textAlign: 'center',
  },
  boton: {
    marginTop: 12,
    backgroundColor: COLORES.error,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
