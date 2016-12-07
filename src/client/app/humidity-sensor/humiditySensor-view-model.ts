// export interface BeginPosition {
//   value: string[];
// }
//
// export interface EndPosition {
//   value: string[];
// }
//
// export interface TimePeriod {
//   beginPosition: BeginPosition;
//   endPosition: EndPosition;
// }
//
// export interface AbstractTimePrimitive {
//   'gml:TimePeriod': TimePeriod;
// }
//
// export interface ValidTime {
//   abstractTimePrimitive: AbstractTimePrimitive;
// }
//
// export interface ValidTime2 {
//   TYPE_NAME: string;
//   value: string[];
// }

// import {SiteLogDataModel} from '../shared/json-data-view-model/data-model/SiteLogDataModel';
import {JsonPointerService} from '../shared/json-pointer/json-pointer.service';

/**
 * View Model class and methods to translate to/from the Data Model (from JSON from the GeodesyML)
 */
export class HumiditySensorsViewModel {
  private _humiditySensorPropertyViewModels: HumiditySensorPropertyViewModel[];
  // private humiditySensorsPath: string = '/humiditySensors';

  // constructor() {
  //   this.humiditySensorPropertyViewModels = [];
  // }

  constructor(humiditySensorPropertyViewModels?: HumiditySensorPropertyViewModel[]) {
    this.humiditySensorPropertyViewModels = humiditySensorPropertyViewModels;
  }

  set humiditySensorPropertyViewModels(existing: HumiditySensorPropertyViewModel[]) {
    if (existing) {
      this._humiditySensorPropertyViewModels = existing;
    } else {
      this._humiditySensorPropertyViewModels = [];
    }
  }

  get humiditySensorPropertyViewModels() {
    return this._humiditySensorPropertyViewModels;
  }

  setFromDataModel(humiditySensorPropertyDataModels: any) {
    for (let humiditySensorsPropertyDataModel of humiditySensorPropertyDataModels)
      this.humiditySensorPropertyViewModels.push(
        new HumiditySensorPropertyViewModel().setFromDataModel(humiditySensorsPropertyDataModel));
  }

  setDataModel(humiditySensorPropertyDataModels: any) {
    humiditySensorPropertyDataModels.length = 0;
    for (let humiditySensorPropertyViewModel of this.humiditySensorPropertyViewModels) {
      let humiditySensorPropertyDataModel: any;
      humiditySensorPropertyViewModel.setDataModel(humiditySensorPropertyDataModel);
      humiditySensorPropertyDataModels.push(humiditySensorPropertyDataModel);
    }
  }

  toJSON(): any {

  }
}

export class HumiditySensorPropertyViewModel {
  private _dateDeleted: string;
  private _dateInserted: string;
  private _deletedReason: string;
  private _humiditySensor: HumiditySensorViewModel;
  private dateDeletedPath: string = '/dateDeleted/value/0';
  private dateInsertedPath: string = '/dateInserted/value/0';
  private deletedReasonPath: string = '/deletedReason';
  private humiditySensorPath: string = '/humiditySensor';

  // constructor() {
  //   this.dateDeleted = '';
  //   this.dateInserted = '';
  //   this.deletedReason = '';
  //   this.humiditySensor = new HumiditySensorViewModel();
  // }

  constructor(existing?: HumiditySensorPropertyViewModel) {
    this.dateDeleted = existing && existing.dateDeleted || '';
    this.dateInserted = existing && existing.dateInserted || '';
    this.deletedReason = existing && existing.deletedReason || '';
    this.humiditySensor = existing && existing.humiditySensor || new HumiditySensorViewModel(null);
  }

  set dateDeleted(val: string) {
    if (val) {
      this._dateDeleted = val;
    }
  }

  get dateDeleted(): string {
    return this._dateDeleted;
  }

  set dateInserted(val: string) {
    if (val) {
      this._dateInserted = val;
    }
  }

  get dateInserted(): string {
    return this._dateInserted;
  }

  set deletedReason(val: string) {
    if (val) {
      this._deletedReason = val;
    }
  }

  get deletedReason(): string {
    return this._deletedReason;
  }

  set humiditySensor(val: HumiditySensorViewModel) {
    if (val) {
      this._humiditySensor = val;//.setFromExisting(val);
    }
  }

  get humiditySensor(): HumiditySensorViewModel {
    return this._humiditySensor;
  }

  setFromDataModel(humiditySensorPropertyDataModel: any): HumiditySensorPropertyViewModel {
    this.dateDeleted = JsonPointerService.getString(humiditySensorPropertyDataModel, this.dateDeletedPath);
    this.dateInserted = JsonPointerService.getString(humiditySensorPropertyDataModel, this.dateInsertedPath);
    this.deletedReason = JsonPointerService.getString(humiditySensorPropertyDataModel, this.deletedReasonPath);
    this.humiditySensor = JsonPointerService.get(humiditySensorPropertyDataModel, this.humiditySensorPath);

    return this;
  }

  toJSON(): any {

  }

  setDataModel(humiditySensorPropertyDataModel: any) {
    JsonPointerService.set(humiditySensorPropertyDataModel, this.dateDeletedPath, this.dateDeleted);
    JsonPointerService.set(humiditySensorPropertyDataModel, this.dateInsertedPath, this.dateInserted);
    JsonPointerService.set(humiditySensorPropertyDataModel, this.deletedReasonPath, this.deletedReason);
    this.humiditySensor.setDataModel(JsonPointerService.get(humiditySensorPropertyDataModel, this.humiditySensorPath));

    return humiditySensorPropertyDataModel;
  }
}

export class HumiditySensorViewModel {
  private _startDate: string;
  private _endDate: string;

  private _calibrationDate: string;

  private _dataSamplingInterval: number;
  private _accuracyPercentRelativeHumidity: number;
  private _aspiration: string;
  private _notes: string;
  private _manufacturer: string;
  private _serialNumber: string;
  private _heightDiffToAntenna: number;
  private beginPosPath: string = '/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0';
  private endPosPath: string = '/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0';
  private calibrationDatePath: string = '/calibrationDate/value/0';
  private dataSamplingIntervalPath: string = '/dataSamplingInterval';
  private accuracyPercentRHPath: string = '/accuracyPercentRelativeHumidity';
  private aspirationPath: string = '/aspiration';
  private notesPath: string = '/notes';
  private manufacturerPath: string = '/manufacturer';
  private serialNumberPath: string = '/serialNumber';
  private heightDiffToAntennaPath: string = '/heightDiffToAntenna';

  // constructor() {
  //   this._startDate = '';
  //   this._endDate = '';
  //   this._calibrationDate = '';
  //   this._dataSamplingInterval = 0;
  //   this._accuracyPercentRelativeHumidity = 0;
  //   this._aspiration = '';
  //   this._notes = '';
  //   this._manufacturer = '';
  //   this._serialNumber = '';
  //   this._heightDiffToAntenna = 0;
  // }

  constructor(private existing: HumiditySensorViewModel) {
    this._startDate = existing && existing._startDate || '';
    this._endDate = existing && existing._endDate || '';
    this._calibrationDate = existing && existing._calibrationDate || '';
    this._dataSamplingInterval = existing && existing._dataSamplingInterval || 0;
    this._accuracyPercentRelativeHumidity = existing && existing._accuracyPercentRelativeHumidity || 0;
    this._aspiration = existing && existing._aspiration || '';
    this._notes = existing && existing._notes || '';
    this._manufacturer = existing && existing._manufacturer || '';
    this._serialNumber = existing && existing._serialNumber || '';
    this._heightDiffToAntenna = existing && existing._heightDiffToAntenna || 0;
  }

  set startDate(val: string) {
    if (val) {
      this._startDate = val;
    }
  }

  get startDate(): string {
    return this._startDate;
  }

  set endDate(val: string) {
    if (val) {
      this._endDate = val;
    }
  }

  get endDate(): string {
    return this._endDate;
  }

  set calibrationDate(val: string) {
    if (val) {
      this._calibrationDate = val;
    }
  }

  get calibrationDate(): string {
    return this._calibrationDate;
  }

  set dataSamplingInterval(val: number) {
    if (val) {
      this._dataSamplingInterval = val;
    }
  }

  get dataSamplingInterval(): number {
    return this._dataSamplingInterval;
  }

  set accuracyPercentRelativeHumidity(val: number) {
    if (val) {
      this._accuracyPercentRelativeHumidity = val;
    }
  }

  get accuracyPercentRelativeHumidity(): number {
    return this._accuracyPercentRelativeHumidity;
  }

  set aspiration(val: string) {
    if (val) {
      this._aspiration = val;
    }
  }

  get aspiration(): string {
    return this._aspiration;
  }

  set notes(val: string) {
    if (val) {
      this._notes = val;
    }
  }

  get notes(): string {
    return this._notes;
  }

  set manufacturer(val: string) {
    if (val) {
      this._manufacturer = val;
    }
  }

  get manufacturer(): string {
    return this._manufacturer;
  }

  set serialNumber(val: string) {
    if (val) {
      this._serialNumber = val;
    }
  }

  get serialNumber(): string {
    return this._serialNumber;
  }

  set heightDiffToAntenna(val: number) {
    if (val) {
      this._heightDiffToAntenna = val;
    }
  }

  get heightDiffToAntenna(): number {
    return this._heightDiffToAntenna;
  }

  setFromExisting(val: HumiditySensorViewModel) {
    this._startDate = val._startDate;
    this._endDate = val._endDate;

    this._calibrationDate = val._calibrationDate;

    this._dataSamplingInterval = val._dataSamplingInterval;
    this._accuracyPercentRelativeHumidity = val._accuracyPercentRelativeHumidity;
    this._aspiration = val._aspiration;
    this._notes = val._notes;
    this._manufacturer = val._manufacturer;
    this._serialNumber = val._serialNumber;
    this._heightDiffToAntenna = val._heightDiffToAntenna;
  }

  setFromDataModel(humiditySensorDataModel: any) {
    this._startDate = JsonPointerService.getString(humiditySensorDataModel, this.beginPosPath);
    this._endDate = JsonPointerService.getString(humiditySensorDataModel, this.endPosPath);

    this._calibrationDate = JsonPointerService.getString(humiditySensorDataModel, this.calibrationDatePath);

    this._dataSamplingInterval = JsonPointerService.get(humiditySensorDataModel, this.dataSamplingIntervalPath);
    this._accuracyPercentRelativeHumidity = JsonPointerService.get(humiditySensorDataModel, this.accuracyPercentRHPath);
    this._aspiration = JsonPointerService.getString(humiditySensorDataModel, this.aspirationPath);
    this._notes = JsonPointerService.getString(humiditySensorDataModel, this.notesPath);
    this._manufacturer = JsonPointerService.getString(humiditySensorDataModel, this.manufacturerPath);
    this._serialNumber = JsonPointerService.getString(humiditySensorDataModel, this.serialNumberPath);
    this._heightDiffToAntenna = JsonPointerService.get(humiditySensorDataModel, this.heightDiffToAntennaPath);
  }

  toJSON(): any {

  }

  setDataModel(humiditySensorDataModel: any) {
    JsonPointerService.set(humiditySensorDataModel, this.beginPosPath, this._startDate);
    JsonPointerService.set(humiditySensorDataModel, this.endPosPath, this._endDate);

    JsonPointerService.set(humiditySensorDataModel, this.calibrationDatePath, this._calibrationDate);

    JsonPointerService.set(humiditySensorDataModel, this.dataSamplingIntervalPath,
      this._dataSamplingInterval.toString());
    JsonPointerService.set(humiditySensorDataModel, this.accuracyPercentRHPath,
      this._accuracyPercentRelativeHumidity.toString());
    JsonPointerService.set(humiditySensorDataModel, this.aspirationPath, this._aspiration);
    JsonPointerService.set(humiditySensorDataModel, this.notesPath, this._notes);
    JsonPointerService.set(humiditySensorDataModel, this.manufacturerPath, this._manufacturer);
    JsonPointerService.set(humiditySensorDataModel, this.serialNumberPath, this._serialNumber);
    JsonPointerService.set(humiditySensorDataModel, this.heightDiffToAntennaPath, this._heightDiffToAntenna.toString());
  }
}


// (c.TYPE_NAME) || (c.TYPE_NAME = 'GEODESYML_0.3.HumiditySensorPropertyType');
// (c._dateDeleted) || (c._dateDeleted = {});
// (c._dateDeleted.TYPE_NAME) || (c._dateDeleted.TYPE_NAME = 'GML_3_2_1.TimePositionType');
// (c._dateDeleted.value) || (c._dateDeleted.value = []);
// (c._dateInserted) || (c._dateInserted = {});
// (c._dateInserted.TYPE_NAME) || (c._dateInserted.TYPE_NAME = 'GML_3_2_1.TimePositionType');
// (c._dateInserted.value) || (c._dateInserted.value = []);
// (c._deletedReason) || (c._deletedReason = '');
// (c._humiditySensor) || (c._humiditySensor = {});


//   validTime = {});
// validTime.abstractTimePrimitive) || validTime.abstractTimePrimitive = {});
// validTime.abstractTimePrimitive['gml:TimePeriod'])
// || validTime.abstractTimePrimitive['gml:TimePeriod'] = {});
//
// validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition)
// || validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition = {});
// validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value)
// || validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value = []);
//
// validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition)
// || validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition = {});
// validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value) ||
// validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value = []);
//
//
// // Defined in equipment.xsd - hsType
// dataSamplingInterval) || dataSamplingInterval = 0);
// accuracyPercentRelativeHumidity) || accuracyPercentRelativeHumidity = 0);
// aspiration) || aspiration = '');
// notes) || notes = '');
// // Defined in equipment.xsd - baseSensorEquipmentType
// manufacturer) || manufacturer = '');
// serialNumber) || serialNumber = '');
// heightDiffToAntenna) || heightDiffToAntenna = 0);
// calibrationDate) || calibrationDate = {});
// calibrationDate.value) || calibrationDate.value = ['']);
