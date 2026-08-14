import { Stack, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { FormularioItem } from '@/components/FormularioItem';
import { COLORES } from '@/constants';
import { crearItem } from '@/services/catalogo';
import type { Item } from '@/types';

export default function PantallaNuevo() {
  const router = useRouter();

  const guardar = async (datos: Omit<Item, 'id'>) => {
    await crearItem(datos);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Nuevo item', headerTitleAlign: 'center' }} />
      <KeyboardAvoidingView
        style={styles.pantalla}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
          <FormularioItem etiquetaBoton="Guardar item" onGuardar={guardar} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },
  contenido: {
    padding: 20,
    paddingBottom: 40,
  },
});
