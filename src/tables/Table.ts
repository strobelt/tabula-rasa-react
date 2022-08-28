import { DocumentReference } from 'firebase/firestore/lite';

export type Table = {
  id: string;
  name: string;
  players: string[];
  reference: DocumentReference;
};
