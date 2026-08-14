import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { COLORES } from '@/constants';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORES.primario,
        tabBarInactiveTintColor: COLORES.textoSecundario,
        headerTitleAlign: 'center',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
