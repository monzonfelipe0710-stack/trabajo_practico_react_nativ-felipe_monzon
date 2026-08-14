import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { EstadoCarga } from '@/components/EstadoCarga';
import { EstadoError } from '@/components/EstadoError';
import { FormularioItem } from '@/components/FormularioItem';
import { COLORES } from '@/constants';
import { actualizarItem, obtenerItem } from '@/services/catalogo';
import type { EstadoDatos, Item } from '@/types';

export default function PantallaEditar() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [estado, setEstado] = useState<EstadoDatos<Item>>({ estado: 'cargando' });

  const cargar = useCallback(async () => {
    setEstado({ estado: 'cargando' });
    try {
      const item = await obtenerItem(id);
      setEstado({ estado: 'exito', datos: item });
    } catch {
      setEstado({ estado: 'error', mensaje: 'No se pudo cargar el item.' });
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [cargar])
  );

  const guardar = async (datos: Omit<Item, 'id'>) => {
    await actualizarItem(id, datos);
    router.back();
  };

  if (estado.estado === 'cargando') {
    return (
      <>
        <Stack.Screen options={{ title: 'Editar item' }} />
        <EstadoCarga />
      </>
    );
  }

  if (estado.estado === 'error') {
    return (
      <>
        <Stack.Screen options={{ title: 'Editar item' }} />
        <EstadoError mensaje={estado.mensaje} onReintentar={cargar} />
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Editar item', headerTitleAlign: 'center' }} />
      <KeyboardAvoidingView
        style={styles.pantalla}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
          <FormularioItem
            itemInicial={estado.datos}
            etiquetaBoton="Guardar cambios"
            onGuardar={guardar}
          />
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
