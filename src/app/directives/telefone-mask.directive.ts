import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTelefoneMask]',
  standalone: true,
})
export class TelefoneMaskDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: string) {
    this.onInputChange(event, true);
  }

  @HostListener('keyup.backspace', ['$event'])
  keyUpBackspace(event: KeyboardEvent) {
    this.onInputChange(event.target as HTMLInputElement, false);
  }

  onInputChange(event: any, isModelChange: boolean) {
    if (isModelChange) {
      this.maskPhoneNumber(event);
    } else {
      this.maskPhoneNumber(event.value);
    }
  }

  maskPhoneNumber(value: string) {
    if (!value) return;

    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '').slice(0, 11);

    let phoneMask = '';

    if (numbers.length > 0) {
      phoneMask = `(${numbers.substring(0, 2)}`;
    }
    if (numbers.length > 2) {
      phoneMask += `) ${numbers.substring(2, 7)}`;
    }
    if (numbers.length > 7) {
      phoneMask += `-${numbers.substring(7, 11)}`;
    }

    if (this.ngControl.control) {
      this.ngControl.control.setValue(phoneMask, {
        emitEvent: false,
      });
    }
  }
}
