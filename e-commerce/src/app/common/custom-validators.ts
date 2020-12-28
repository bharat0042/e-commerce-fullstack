import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

    static notOnlyWhitespace(control : FormControl) : ValidationErrors {
        let val: string = control.value;
        if(val.match('^[A-Z]{1}[a-z]+$')){
            return {'notOnlyWhiteSpace':false};
        }else{
            return{'notOnlyWhiteSpace':true};
        }
    }
}
