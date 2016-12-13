import {JsonPointerService as JPS} from '../shared/json-pointer/json-pointer.service';
import {FieldMapper} from '../shared/json-data-view-model/FieldMapper';
import {FieldMaps, FieldMap} from '../shared/json-data-view-model/FieldMap';
import {DataTypedPointer} from '../shared/json-data-view-model/DataTypedPointer';
import {TypedPointer} from '../shared/json-data-view-model/TypedPointer';
import {ViewTypedPointer} from '../shared/json-data-view-model/ViewTypedPointer';

/**
 * View Model class and methods to translate to/from the Data Model (from JSON from the GeodesyML)
 */
// TODO remove
export class HumiditySensorsViewModel {
  /**
   * Not the best form making private fields public, though this saves the clutter of creating accessors/getters for all
   */
  public humiditySensors: HumiditySensorPropertyViewModel[];

  constructor(humiditySensorPropertyViewModels?: HumiditySensorPropertyViewModel[]) {
    this._humiditySensors = humiditySensorPropertyViewModels;
  }

  set _humiditySensors(existing: HumiditySensorPropertyViewModel[]) {
    if (existing) {
      this.humiditySensors = existing;
    } else {
      this.humiditySensors = [];
    }
  }

  /**
   * Create this class and descendants from a JSON (from GeodesyML) object.
   *
   * @param humiditySensorPropertyDataModels with source data
   * @return this
   */
  createFromDataModel(humiditySensorPropertyDataModels: any): HumiditySensorsViewModel {
    for (let humiditySensorsPropertyDataModel of humiditySensorPropertyDataModels)
      this.humiditySensors.push(
        new HumiditySensorPropertyViewModel().createFromDataModel(humiditySensorsPropertyDataModel));

    return this;
  }

  /**
   * Extract the data here as a source JSON (from GeodesyML) object
   * @param humiditySensorPropertyDataModels to populate
   * @return humiditySensorPropertyDataModels given as a param (populated).  Be aware that even though the param is
   * populated, if upon entry it is undefined then the param will remain undefined in the caller.
   */
  setDataModel(humiditySensorPropertyDataModels: any): any {
    if (humiditySensorPropertyDataModels) {
      humiditySensorPropertyDataModels.length = 0;
    } else {
      humiditySensorPropertyDataModels = [];
    }
    for (let humiditySensorPropertyViewModel of this.humiditySensors) {
      let humiditySensorPropertyDataModel: any = {};
      humiditySensorPropertyViewModel.setDataModel(humiditySensorPropertyDataModel);
      humiditySensorPropertyDataModels.push(humiditySensorPropertyDataModel);
    }

    return humiditySensorPropertyDataModels;
  }
}

let dateDeletedPath: string = '/dateDeleted/value/0';
let dateInsertedPath: string = '/dateInserted/value/0';
let deletedReasonPath: string = '/deletedReason';
let humiditySensorPath: string = '/humiditySensor';
// TODO remove this
export class HumiditySensorPropertyViewModel {
  /**
   * Not the best form making private fields public, though saves clutter of creating accessors / getters for all
   */
  public dateDeleted: string;
  public dateInserted: string;
  public deletedReason: string;
  public humiditySensor: HumiditySensorViewModel;

  constructor(existing?: HumiditySensorPropertyViewModel) {
    this.dateDeleted = existing && existing.dateDeleted || '';
    this.dateInserted = existing && existing.dateInserted || '';
    this.deletedReason = existing && existing.deletedReason || '';
    this.humiditySensor = existing && existing.humiditySensor || new HumiditySensorViewModel(null);
  }

  /**
   * Create this class and descendants from a JSON (from GeodesyML) object.
   *
   * @param humiditySensorPropertyDataModel with source data
   * @return this
   */
  createFromDataModel(humiditySensorPropertyDataModel: any): HumiditySensorPropertyViewModel {
    this.dateDeleted = JPS.getString(humiditySensorPropertyDataModel, dateDeletedPath);
    this.dateInserted = JPS.getString(humiditySensorPropertyDataModel, dateInsertedPath);
    this.deletedReason = JPS.getString(humiditySensorPropertyDataModel, deletedReasonPath);
    this.humiditySensor.createFromDataModel(JPS.get(humiditySensorPropertyDataModel, humiditySensorPath));

    return this;
  }

  /**
   * Extract the data here as a source JSON (from GeodesyML) object
   * @param humiditySensorPropertyDataModels to populate
   * @return humiditySensorPropertyDataModels given as a param (populated)
   */
  setDataModel(humiditySensorPropertyDataModel: any) {
    JPS.set(humiditySensorPropertyDataModel, dateDeletedPath, this.dateDeleted);
    JPS.set(humiditySensorPropertyDataModel, dateInsertedPath, this.dateInserted);
    JPS.set(humiditySensorPropertyDataModel, deletedReasonPath, this.deletedReason);
    if (!JPS.get(humiditySensorPropertyDataModel, humiditySensorPath)) {
      humiditySensorPropertyDataModel.humiditySensor = {};
    }
    this.humiditySensor.setDataModel(JPS.get(humiditySensorPropertyDataModel, humiditySensorPath));

    return humiditySensorPropertyDataModel;
  }
}

let fieldMappingFlat: string[] = [
  '/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0', 'string',
  '/startDate', 'string',

  '/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0', 'string',
  '/endDate', 'string',

  '/calibrationDate/value/0', 'string',
  '/calibrationDate', 'string',

  '/dataSamplingInterval', 'string',
  '/dataSamplingInterval', 'number',

  '/accuracyPercentRelativeHumidity', 'string',
  '/accuracyPercentRelativeHumidity', 'number',

  '/aspiration', 'string',
  '/aspiration', 'string',

  '/notes', 'string',
  '/notes', 'string',

  '/manufacturer', 'string',
  '/manufacturer', 'string',

  '/serialNumber', 'string',
  '/serialNumber', 'string',

  '/heightDiffToAntenna', 'string',
  '/heightDiffToAntenna', 'number'
];

export class HumiditySensorViewModel implements FieldMapper {


  /**
   * Not the best form making private fields public, though saves clutter of creating accessors / getters for all
   */
  public startDate: string;
  public endDate: string;

  public calibrationDate: string;

  public dataSamplingInterval: number;
  public accuracyPercentRelativeHumidity: number;
  public aspiration: string;
  public notes: string;
  public manufacturer: string;
  public serialNumber: string;
  public heightDiffToAntenna: number;

  constructor(private existing?: HumiditySensorViewModel) {
    this.startDate = existing && existing.startDate || '';
    this.endDate = existing && existing.endDate || '';
    this.calibrationDate = existing && existing.calibrationDate || '';
    this.dataSamplingInterval = existing && existing.dataSamplingInterval || 0;
    this.accuracyPercentRelativeHumidity = existing && existing.accuracyPercentRelativeHumidity || 0;
    this.aspiration = existing && existing.aspiration || '';
    this.notes = existing && existing.notes || '';
    this.manufacturer = existing && existing.manufacturer || '';
    this.serialNumber = existing && existing.serialNumber || '';
    this.heightDiffToAntenna = existing && existing.heightDiffToAntenna || 0;
  }

  fieldMapping(): FieldMaps {
    if (fieldMappingFlat.length % 4 !== 0) {
      throw new Error('fieldMappingFlat isnt divisible by 4');
    }
    let fieldMapsArray: FieldMap[] = [];
    for (let i = 0; i < fieldMappingFlat.length; i += 4) {
      let dataPath: string = fieldMappingFlat[i];
      let dataPathType: string = fieldMappingFlat[i + 1];
      let viewPath: string = fieldMappingFlat[i + 2];
      let viewPathType: string = fieldMappingFlat[i + 3];

      this.assertCorrect(dataPath, dataPathType, viewPath, viewPathType);

      let dataTypePointer: TypedPointer = new DataTypedPointer(dataPath, dataPathType);
      let viewTypePointer: TypedPointer = new ViewTypedPointer(viewPath, viewPathType);
      fieldMapsArray.push(new FieldMap(dataTypePointer, viewTypePointer));
    }
    let fieldMaps = new FieldMaps(fieldMapsArray);
    return fieldMaps;
  }

  // should be private - soon - tslint error currently
  assertCorrect(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string) {
    assert(dataPath.match(/\/.*/));
    assert(dataPathType.match(/number|string/));
    assert(viewPath.match(/\/.*/));
    assert(viewPathType.match(/number|string/));
  }

  /**
   * Create this class from a JSON (from GeodesyML) object.
   *
   * @param humiditySensorPropertyDataModel with source data
   * @return this
   */
  createFromDataModel(humiditySensorDataModel: any) {
    // this.startDate = JPS.getString(humiditySensorDataModel, beginPosPath);
    // this.endDate = JPS.getString(humiditySensorDataModel, endPosPath);
    //
    // this.calibrationDate = JPS.getString(humiditySensorDataModel, calibrationDatePath);
    //
    // this.dataSamplingInterval = JPS.get(humiditySensorDataModel, dataSamplingIntervalPath);
    // this.accuracyPercentRelativeHumidity = JPS.get(humiditySensorDataModel, accuracyPercentRHPath);
    // this.aspiration = JPS.getString(humiditySensorDataModel, aspirationPath);
    // this.notes = JPS.getString(humiditySensorDataModel, notesPath);
    // this.manufacturer = JPS.getString(humiditySensorDataModel, manufacturerPath);
    // this.serialNumber = JPS.getString(humiditySensorDataModel, serialNumberPath);
    // this.heightDiffToAntenna = JPS.get(humiditySensorDataModel, heightDiffToAntennaPath);
  }

  // ('siteLog/humiditySensors/0/humiditySensorProperty/validTime/abstractTimePrimitive
  // /gml:TimePeriod/beginPosition/value/0', string),  ('siteLog/startDate', Date))

//   class TypedPointer {
//   string
//   pointer;
//   type
//   string;
// }
//
// class FieldMap (
//   froml; Typed
// )

// }

  /**
   * Extract the data here as a source JSON (from GeodesyML) object
   * @param humiditySensorPropertyDataModels to populate
   * @return humiditySensorPropertyDataModels given as a param (populated)
   */
  setDataModel(humiditySensorDataModel: any) {
    // JPS.set(humiditySensorDataModel, beginPosPath, this.startDate);
    // JPS.set(humiditySensorDataModel, endPosPath, this.endDate);
    //
    // JPS.set(humiditySensorDataModel, calibrationDatePath, this.calibrationDate);
    //
    // JPS.set(humiditySensorDataModel, dataSamplingIntervalPath, this.dataSamplingInterval.toString());
    // JPS.set(humiditySensorDataModel, accuracyPercentRHPath, this.accuracyPercentRelativeHumidity.toString());
    // JPS.set(humiditySensorDataModel, aspirationPath, this.aspiration);
    // JPS.set(humiditySensorDataModel, notesPath, this.notes);
    // JPS.set(humiditySensorDataModel, manufacturerPath, this.manufacturer);
    // JPS.set(humiditySensorDataModel, serialNumberPath, this.serialNumber);
    // JPS.set(humiditySensorDataModel, heightDiffToAntennaPath, this.heightDiffToAntenna.toString());
  }


}
