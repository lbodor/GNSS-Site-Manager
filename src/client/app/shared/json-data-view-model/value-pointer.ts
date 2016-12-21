/**
 * Tuple to enable assigning values of arbitrary types to JSON Pointers to be applied at some time.
 * @param T - type of value
 */
export class ValuePointer<T> {
  pointer: string;
  value: T;

  /**
   *
   * @param pointer - JSON Pointer into object to set value
   * @param type - type of the value
   * @param value - value to set
   */
  constructor(pointer: string, value: T) {
    this.pointer = pointer;
    this.value = value;
  }
}
