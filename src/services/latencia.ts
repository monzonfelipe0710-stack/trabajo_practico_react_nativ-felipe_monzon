const MIN_LATENCIA = 500;
const MAX_LATENCIA = 1000;

export function latenciaAleatoria(): number {
  return Math.floor(Math.random() * (MAX_LATENCIA - MIN_LATENCIA + 1)) + MIN_LATENCIA;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
