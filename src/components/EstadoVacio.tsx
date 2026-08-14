import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORES } from '@/constants';

interface Props {
  emoji: string;
  titulo: string;
  mensaje: string;
  etiquetaBoton?: string;
  onBoton?: () => void;
}

export function EstadoVacio({ emoji, titulo, mensaje, etiquetaBoton, onBoton }: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.mensaje}>{mensaje}</Text>
      {etiquetaBoton && onBoton && (
        <Pressable
          onPress={onBoton}
          style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}>
          <Text style={styles.botonTexto}>{etiquetaBoton}</Text>
        </Pressable>
      )}
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
    backgroundColor: COLORES.primario,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  botonPresionado: {
    backgroundColor: COLORES.primarioOscuro,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
