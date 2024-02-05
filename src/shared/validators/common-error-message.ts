import { ValidationErrors } from "@angular/forms";
import { forEach } from "lodash";

export class CommonErrorMessage{
  getErrorMessage(errors: ValidationErrors | null): string | void{
    if(errors){
      let errorMessage: string = '';
      forEach(errors, (errorValue, errorName)=>{
        switch(errorName){
          case 'required': {
            errorMessage += 'Pole wymagane';
            break;
          }
          case 'maxlength':{
            errorMessage += 'Zbyt długa wartość';
            break;
          }
          case 'minlength':{
            errorMessage += 'Zbyt krótka wartość';
            break;
          }
          case 'email':{
            errorMessage += 'Nie poprawny adres email';
            break;
          }
          case 'passwordMissmatch': {
            errorMessage += 'Hasła się nie zgadzają';
            break;
          }
          default: {
            errorMessage += 'Nieokreślony problem';
            break;
          }
        }
        errorMessage += '\n'
      })
      
      return errorMessage
    }
    return
  }
}