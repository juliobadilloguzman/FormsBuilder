import { PreguntaOpcionGrafica } from './preguntaOpcionGrafica';

export interface PreguntaMultiple {
  texto: string;
  opciones?: PreguntaOpcionGrafica[];
}
