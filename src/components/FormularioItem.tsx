import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORES, EMOJIS_POR_TIPO, GENEROS_POR_TIPO, SOMBRAS, TIPO_COLORES, TIPOS } from '@/constants';
import type { Item, TipoItem } from '@/types';
import { CampoTexto } from './CampoTexto';

const ANIO_MINIMO = 1900;
const ANIO_MAXIMO = new Date().getFullYear();

interface CamposFormulario {
  titulo: string;
  tipo: TipoItem | '';
  genero: string;
  anio: string;
  descripcion: string;
  puntuacion: string;
  plataforma: string;
}

type ErroresFormulario = Partial<Record<keyof CamposFormulario, string>>;

interface Props {
  itemInicial?: Item;
  etiquetaBoton: string;
  onGuardar: (datos: Omit<Item, 'id'>) => Promise<void>;
}

function camposDesdeItem(item?: Item): CamposFormulario {
  if (!item) {
    return {
      titulo: '',
      tipo: '',
      genero: '',
      anio: '',
      descripcion: '',
      puntuacion: '',
      plataforma: '',
    };
  }
  return {
    titulo: item.titulo,
    tipo: item.tipo,
    genero: item.genero,
    anio: String(item.anio),
    descripcion: item.descripcion,
    puntuacion: String(item.puntuacion),
    plataforma: item.plataforma,
  };
}

function validarCampos(campos: CamposFormulario): ErroresFormulario {
  const errores: ErroresFormulario = {};

  if (campos.titulo.trim().length < 2) {
    errores.titulo = 'Ingresá un título de al menos 2 caracteres.';
  }

  if (!campos.tipo) {
    errores.tipo = 'Elegí un tipo.';
  }

  if (!campos.genero) {
    errores.genero = 'Elegí un género.';
  }

  const anio = Number(campos.anio);
  if (!campos.anio.trim() || Number.isNaN(anio) || anio < ANIO_MINIMO || anio > ANIO_MAXIMO) {
    errores.anio = `El año debe estar entre ${ANIO_MINIMO} y ${ANIO_MAXIMO}.`;
  }

  if (campos.descripcion.trim().length < 10) {
    errores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
  }

  const puntuacion = Number(campos.puntuacion);
  if (!campos.puntuacion.trim() || Number.isNaN(puntuacion) || puntuacion < 0 || puntuacion > 10) {
    errores.puntuacion = 'La puntuación debe estar entre 0 y 10.';
  }

  if (campos.plataforma.trim().length < 2) {
    errores.plataforma = 'Ingresá la plataforma (mínimo 2 caracteres).';
  }

  return errores;
}

export function FormularioItem({ itemInicial, etiquetaBoton, onGuardar }: Props) {
  const [campos, setCampos] = useState<CamposFormulario>(() => camposDesdeItem(itemInicial));
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [guardando, setGuardando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | undefined>(undefined);

  const cambiarCampo = (campo: keyof CamposFormulario, valor: string) => {
    setCampos((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => ({ ...prev, [campo]: undefined }));
  };

  const elegirTipo = (tipo: TipoItem) => {
    setCampos((prev) => ({ ...prev, tipo, genero: '' }));
    setErrores((prev) => ({ ...prev, tipo: undefined, genero: undefined }));
  };

  const guardar = async () => {
    const nuevosErrores = validarCampos(campos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }
    setGuardando(true);
    setErrorGeneral(undefined);
    try {
      await onGuardar({
        tipo: campos.tipo as TipoItem,
        titulo: campos.titulo.trim(),
        genero: campos.genero,
        anio: Number(campos.anio),
        descripcion: campos.descripcion.trim(),
        puntuacion: Number(campos.puntuacion),
        plataforma: campos.plataforma.trim(),
        emoji: EMOJIS_POR_TIPO[campos.tipo as TipoItem],
        color: TIPO_COLORES[campos.tipo as TipoItem],
      });
    } catch {
      setErrorGeneral('No se pudo guardar el item. Intentá de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.tarjeta}>
      <CampoTexto
        etiqueta="Título"
        valor={campos.titulo}
        onChange={(texto) => cambiarCampo('titulo', texto)}
        error={errores.titulo}
        placeholder="Ej. Origen"
      />

      <View style={styles.bloque}>
        <Text style={styles.etiqueta}>Tipo</Text>
        <View style={styles.chips}>
          {TIPOS.filter((opcion) => opcion.valor !== 'todos').map((opcion) => {
            const activo = campos.tipo === opcion.valor;
            return (
              <Pressable
                key={opcion.valor}
                onPress={() => elegirTipo(opcion.valor as TipoItem)}
                style={[styles.chip, activo && styles.chipActivo]}>
                <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>
                  {opcion.etiqueta}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {errores.tipo && <Text style={styles.error}>{errores.tipo}</Text>}
      </View>

      {campos.tipo !== '' && (
        <View style={styles.bloque}>
          <Text style={styles.etiqueta}>Género</Text>
          <View style={styles.chips}>
            {GENEROS_POR_TIPO[campos.tipo].map((genero) => {
              const activo = campos.genero === genero;
              return (
                <Pressable
                  key={genero}
                  onPress={() => cambiarCampo('genero', genero)}
                  style={[styles.chip, activo && styles.chipActivo]}>
                  <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>{genero}</Text>
                </Pressable>
              );
            })}
          </View>
          {errores.genero && <Text style={styles.error}>{errores.genero}</Text>}
        </View>
      )}

      <View style={styles.fila}>
        <View style={styles.filaCampo}>
          <CampoTexto
            etiqueta="Año"
            valor={campos.anio}
            onChange={(texto) => cambiarCampo('anio', texto)}
            keyboardType="numeric"
            error={errores.anio}
            placeholder="2024"
          />
        </View>
        <View style={styles.filaCampo}>
          <CampoTexto
            etiqueta="Puntuación"
            valor={campos.puntuacion}
            onChange={(texto) => cambiarCampo('puntuacion', texto)}
            keyboardType="numeric"
            error={errores.puntuacion}
            placeholder="0 - 10"
          />
        </View>
      </View>

      <CampoTexto
        etiqueta="Plataforma"
        valor={campos.plataforma}
        onChange={(texto) => cambiarCampo('plataforma', texto)}
        error={errores.plataforma}
        placeholder="Ej. Netflix, Steam, Cine"
      />

      <CampoTexto
        etiqueta="Descripción"
        valor={campos.descripcion}
        onChange={(texto) => cambiarCampo('descripcion', texto)}
        multiline
        error={errores.descripcion}
        placeholder="Contá de qué trata…"
      />

      {errorGeneral && <Text style={styles.errorGeneral}>{errorGeneral}</Text>}

      <Pressable
        onPress={guardar}
        disabled={guardando}
        style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}>
        {guardando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botonTexto}>{etiquetaBoton}</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: COLORES.tarjeta,
    borderRadius: 20,
    padding: 20,
    gap: 18,
    borderWidth: 1,
    borderColor: COLORES.borde,
    ...SOMBRAS.tarjeta,
  },
  bloque: {
    gap: 6,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORES.texto,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORES.fondo,
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
  fila: {
    flexDirection: 'row',
    gap: 12,
  },
  filaCampo: {
    flex: 1,
  },
  error: {
    fontSize: 12,
    color: COLORES.error,
  },
  errorGeneral: {
    fontSize: 14,
    color: COLORES.error,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: COLORES.primario,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botonPresionado: {
    backgroundColor: COLORES.primarioOscuro,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
