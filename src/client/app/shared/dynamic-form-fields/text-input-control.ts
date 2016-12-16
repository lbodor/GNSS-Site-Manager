import { InputControlBase } from './input-control-base';

export class TextInputControl extends InputControlBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: any) {
    super(options);
    this.type = options['type'] + '' || '';
  }
}
