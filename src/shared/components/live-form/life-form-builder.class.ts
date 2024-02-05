import { FormBuilder } from "@angular/forms";
import { LiveFormTypes, LiveFormControl, LiveFormControlConverted, LiveFormGroupModel, LiveFormGroup } from "src/shared/models/live-form.model";

export class LiveFormBuilder{

  fb = new FormBuilder

  group<T extends object>(data: LiveFormGroup<T> ): LiveFormGroupModel{
    return data
  }

  controls(data: LiveFormControl): LiveFormControlConverted {
    return {
      type: LiveFormTypes.LiveFormControl,
      label: data.label,
      component: data.component,
      inputType: data?.inputType,
      disabled: data?.disabled,
      formItem: this.fb.control(data?.value, {validators: data?.validators})
    }
  }
  // todo array
  // array(data): LiveFormArray;
}