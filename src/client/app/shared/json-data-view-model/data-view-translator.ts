// import {Injectable} from '@angular/core';
import {JsonPointerService} from '../json-pointer/json-pointer.service';
import {FieldMaps} from './FieldMap';
import {DataTypedPointer} from './DataTypedPointer';
import {ViewTypedPointer} from './ViewTypedPointer';

// @Injectable()
export class DataViewTranslatorService {

  /**
   * Translate from data and view models.
   * @param data model is input.  Its paths should match the fieldMappings.dataModel
   * @return view model.  Its paths should match the fieldMappings.viewModel
   */
  static translateD2V(dataModel: any, viewModel: any, fieldMappings: FieldMaps): any {
    for (let fieldMap of fieldMappings.fieldMaps) {
      let dataTypedPointer: DataTypedPointer = fieldMap.dataTypedPointer;
      let viewTypedPointer: ViewTypedPointer = fieldMap.viewTypedPointer;
      let dataValue: string = JsonPointerService.get(dataModel, dataTypedPointer.pointer);
      if (viewTypedPointer.type === 'number') {
        JsonPointerService.set(viewModel, viewTypedPointer.pointer, parseInt(dataValue));
      } else {
        JsonPointerService.set(viewModel, viewTypedPointer.pointer, dataValue);
      }
    }
  }

  /**
   * Translate from view and data models.
   * @param view model is input.  Its paths should match the fieldMappings.viewModel
   * @return data model.  Its paths should match the fieldMappings.dataModel
   */
  static translateV2D(viewModel: any, dataModel: any, fieldMappings: FieldMaps): any {
    for (let fieldMap of fieldMappings.fieldMaps) {
      let dataTypedPointer: DataTypedPointer = fieldMap.dataTypedPointer;
      let viewTypedPointer: ViewTypedPointer = fieldMap.viewTypedPointer;
      let viewValue: string = JsonPointerService.get(viewModel, viewTypedPointer.pointer);
      if (dataTypedPointer.type === 'number') {
        JsonPointerService.set(dataModel, dataTypedPointer.pointer, parseInt(viewValue));
      } else {
        JsonPointerService.set(dataModel, dataTypedPointer.pointer, viewValue);
      }
    }
  }
}
