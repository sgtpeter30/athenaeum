import { Book } from "./book.model";

export interface ExternalBook extends Book {
  selected?: boolean,
  source: string
}