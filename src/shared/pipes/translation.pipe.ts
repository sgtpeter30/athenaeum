import { Pipe, PipeTransform, inject } from "@angular/core"
import { TranslationService } from "../services/translation/translation.service"

@Pipe({
  standalone: true,
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  translationService = inject(TranslationService)
  transform(wordPath: string):string {
    console.log(wordPath)
    return this.translationService.getTranslations(wordPath)
    // console.log(wordPath)
    // return wordPath.toString()
  }
}