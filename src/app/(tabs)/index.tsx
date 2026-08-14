import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { EstadoCarga } from '@/components/EstadoCarga';
import { EstadoError } from '@/components/EstadoError';
import { EstadoVacio } from '@/components/EstadoVacio';
import { ItemCard } from '@/components/ItemCard';
import { COLORES } from '@/constants';
import { listarItems } from '@/services/catalogo';
import type { EstadoDatos, Item } from '@/types';

export default function PantallaInicio() {
  const router = useRouter();
  const [estado, setEstado] = useState<EstadoDatos<Item[]>>({ estado: 'cargando' });

  const cargar = useCallback(async () => {
    setEstado({ estado: 'cargando' });
    try {
      const items = await listarItems();
      setEstado({ estado: 'exito', datos: items });
    } catch {
      setEstado({ estado: 'error', mensaje: 'No se pudo cargar el catálogo.' });
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [cargar])
  );

  if (estado.estado === 'cargando') {
    return <EstadoCarga />;
  }

  if (estado.estado === 'error') {
    return <EstadoError mensaje={estado.mensaje} onReintentar={cargar} />;
  }

  if (estado.datos.length === 0) {
    return (
      <EstadoVacio
        emoji="📭"
        titulo="No hay items todavía"
        mensaje="El catálogo está vacío. Volvé más tarde o creá un item nuevo."
      />
    );
  }

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.contenido}
      data={estado.datos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard
          item={item}
          onPress={() => router.push({ pathname: '/item/[id]', params: { id: item.id } })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    backgroundColor: COLORES.fondo,
  },
  contenido: {
    padding: 16,
    gap: 12,
  },
});
