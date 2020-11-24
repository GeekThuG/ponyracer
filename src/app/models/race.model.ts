import {PoneyModel} from './poney.model';

export interface RaceModel {
  id: number;
  name: string;
  ponies: Array<PoneyModel>;
  startInstant: string;
}
