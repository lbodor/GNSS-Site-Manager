import {TypedPointer} from './TypedPointer';
export class DataTypedPointer extends TypedPointer {
  constructor(pointer: string, type: string) {
    super(pointer, type);
  }
}
