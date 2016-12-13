import {ViewTypedPointer} from './ViewTypedPointer';
import {DataTypedPointer} from './DataTypedPointer';

/**
 * Mapping to assist in mapping data model to view model by linking both sides.
 * A collection of these defines a complete (for the application) or partial (for just one or a few sections of data)
 * mapping to translate one of view or data model to the other.
 */
export class FieldMaps {
  fieldMaps: FieldMap[];

  constructor(fieldMaps: FieldMap[]) {
    this.fieldMaps = fieldMaps;
  }
}

export class FieldMap {
  dataTypedPointer: DataTypedPointer;
  viewTypedPointer: ViewTypedPointer;

  constructor(dataTypedPointer: DataTypedPointer, viewTypedPointer: ViewTypedPointer) {
    this.dataTypedPointer = dataTypedPointer;
    this.viewTypedPointer = viewTypedPointer;
  }
}
