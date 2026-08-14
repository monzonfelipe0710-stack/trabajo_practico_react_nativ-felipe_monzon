import { StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORES } from '@/constants';

interface Props {
  etiqueta: string;
  valor: string;
  onChange: (texto: string) => void;
  error?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric';
  placeholder?: string;
}

export function CampoTexto({
  etiqueta,
  valor,
  onChange,
  error,
  multiline = false,
  keyboardType = 'default',
  placeholder,
}: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultilinea, error && styles.inputError]}
        value={valor}
        onChangeText={onChange}
        multiline={multiline}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={COLORES.textoSecundario}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    gap: 6,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORES.texto,
  },
  input: {
    backgroundColor: COLORES.fondo,
    borderWidth: 1,
    borderColor: COLORES.borde,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORES.texto,
  },
  inputMultilinea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: COLORES.error,
    backgroundColor: '#FEF2F2',
  },
  error: {
    fontSize: 12,
    color: COLORES.error,
  },
});
