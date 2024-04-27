import { Injectable } from '@angular/core';
import { translations } from 'src/assets/en_pl';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public getTranslations(wordPath: string): string{
    const path = wordPath.split('.')
    let current: any = translations
    for (const key of path.values()) {
     current = current[key]
    }
    return current
  }
}