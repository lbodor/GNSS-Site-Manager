import {Component, Input, Output, EventEmitter} from '@angular/core';
import { FormFieldConfigurationService } from './form-field-configuration.service';

@Component({
  moduleId: module.id,
  selector: 'gnss-text-input',
  templateUrl: 'text-input.component.html',
  styleUrls: ['text-input.component.css']
})
export class TextInputComponent {
  @Input() model: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() index: string = '0';
  @Input() required: string = '';
  @Input() minlength: string = '';
  @Input() maxlength: string = '';

  /* Output an event when the value in the field changes */
  @Output() modelChange = new EventEmitter();
  change(newValue:string) {
    console.log('newvalue', newValue);
    this.model = newValue;
    this.modelChange.emit(newValue);
  }

  /**
  * @param {FormFieldConfigurationService} formFieldConfigurationService - The injected FormFieldConfigurationService.
  * The idea is that the client passes in the 'model' value and the service
  * provides the field name, label, validators etc
  */
  constructor(
    private formFieldConfigurationService: FormFieldConfigurationService
  ) {}

  public ngOnInit() {
	  let configurationObject = this.formFieldConfigurationService.getObjectForKey(this.model);
	  console.log(configurationObject);
  }
}
