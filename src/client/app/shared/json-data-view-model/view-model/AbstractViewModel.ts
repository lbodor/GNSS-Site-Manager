import {FieldMaps, FieldMap} from '../FieldMap';
import {ViewTypedPointer} from '../ViewTypedPointer';
import {TypedPointer} from '../TypedPointer';
import {DataTypedPointer} from '../DataTypedPointer';

export abstract class AbstractViewModel {
  /**
   * Build data structure that maps between data and view models.  Uses array of arrays from getRawFieldMappings()
   *
   * Define the view models as data elements with given type in the extending classes
   *
   * @returns {FieldMaps}
   */
  private fieldMapping(rawFieldMappings: string[][]): FieldMaps {
    if (rawFieldMappings.length === 0) {
      throw new Error('fieldMappings contains no items');
    }
    let fieldMapsArray: FieldMap[] = [];
    for (let rawFieldMap of rawFieldMappings) {
      if (rawFieldMap.length < 4) {
        throw new Error('fieldMappings isnt divisible by 4');
      }
      let dataPath: string = rawFieldMap[0];
      let dataPathType: string = rawFieldMap[1];
      let viewPath: string = rawFieldMap[2];
      let viewPathType: string = rawFieldMap[3];

      this.assertCorrect(dataPath, dataPathType, viewPath, viewPathType);

      let dataTypePointer: TypedPointer = new DataTypedPointer(dataPath, dataPathType);
      let viewTypePointer: TypedPointer = new ViewTypedPointer(viewPath, viewPathType);
      fieldMapsArray.push(new FieldMap(dataTypePointer, viewTypePointer));
    }
    let fieldMaps = new FieldMaps(fieldMapsArray);
    return fieldMaps;
  }

  private assertCorrect(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string) {
    assert(dataPath.match(/\/.*/));
    assert(dataPathType.match(/number|string/));
    assert(viewPath.match(/\/.*/));
    assert(viewPathType.match(/number|string/));
  }

  /**
   * Method for clients to implement that return the raw mappings from data to view. It is an array of arrays.
   * Each of the internal arrays contain 4 items:
   *  [data json pointer, data type at that data pointer, view json pointer, data type at that view pointer]
   */
  public getFieldMap(): FieldMaps {
    return this.fieldMapping(this.getRawFieldMappings());
  }

  /**
   * Simple way to specify the data / view model mappings.
   * @returns string[][]
   */
  public abstract getRawFieldMappings(): string[][];
}
