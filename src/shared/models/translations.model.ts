import { Book } from './book.model'
import { ExternalBook } from './external-book.model';

export interface Translations {
  common: {
    [name: string]: string
  },
  // book: TranslationsBook;
  book: any;
}
export type TranslationsBook = {
  [K in keyof ExternalBook]: string;
}