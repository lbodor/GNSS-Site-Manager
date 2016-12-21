import {ValuePointer} from './value-pointer';

/**
 * Class to allow the association of values with Fields (JSON Pointers) so that you can define values to set at times
 * during the lifecycle of the objects, such as new() and on the last item before a new item is new()'d.
 */
export class FieldValues {
  valuePointers: Array<ValuePointer<any>> = [];

  public add(valuePointer: ValuePointer<any>) {
    this.valuePointers.push(valuePointer);
  }
}
