import {TypedPointer} from './TypedPointer';
export class ViewTypedPointer extends TypedPointer {
  constructor(pointer: string, type: string) {
    super(pointer, type);
  }
}
