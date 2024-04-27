import { Book } from './book.model'

export interface Translations {
  common: {
    [name: string]: string
  },
  book: TranslationsBook;
}
export type TranslationsBook = {
  [K in keyof Book]: string;
}