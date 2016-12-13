import {DataViewTranslatorService} from '../shared/json-data-view-model/data-view-translator.service';
import {AbstractViewModel} from '../shared/json-data-view-model/view-model/AbstractViewModel';

/**
 * Class to assist with creating and managing the ViewModel instances
 */
export class HumiditySensors {

  /**
   * Create the ViewModels array by translating from the JSON data model (from GeodesyML) object.
   *
   * @param humiditySensorsDataModels from the JSON data model (from GeodesyML) object
   * @return HumiditySensorViewModel[]
   */
  static dataToViewModel(humiditySensorsDataModels: any[]): HumiditySensorViewModel[] {
    let humiditySensorViewModels: HumiditySensorViewModel[] = [];
    for (let humiditySensorsDataModel of humiditySensorsDataModels) {
      let viewModel: HumiditySensorViewModel = new HumiditySensorViewModel();
      let dataViewTranslatorService: DataViewTranslatorService = new DataViewTranslatorService(viewModel.fieldMapping());
      dataViewTranslatorService.translateD2V(humiditySensorsDataModel.humiditySensor, viewModel);
      humiditySensorViewModels.push(viewModel);
    }
    return humiditySensorViewModels;
  }

  static viewToDataModel(humiditySensorsViewModels: HumiditySensorViewModel[]): any[] {
    let humiditySensorDataModels: any[] = [];
    let viewModel: HumiditySensorViewModel = new HumiditySensorViewModel();
    for (let humiditySensorsViewModel of humiditySensorsViewModels) {
      let dataModel: any = {};
      let dataViewTranslatorService: DataViewTranslatorService = new DataViewTranslatorService(viewModel.fieldMapping());
      dataViewTranslatorService.translateV2D(humiditySensorsViewModel, dataModel);
      humiditySensorDataModels.push(new HumiditySensorPropertyType(dataModel));
    }
    return humiditySensorDataModels;
  }
}

class ValueArray {
  value: string[];

  constructor(item0: string) {
    this.value = [];
    this.value.push(item0);
  }
}

export class HumiditySensorPropertyType {
  public dateInserted: ValueArray;
  public dateDeleted: ValueArray;
  public deletedReason: string;
  public humiditySensor: any;

  constructor(humiditySensor: any) {
    this.humiditySensor = humiditySensor;
    this.dateInserted = new ValueArray('');
    this.dateDeleted = new ValueArray('');
    this.deletedReason='';
  }
}

export class HumiditySensorViewModel extends AbstractViewModel {
  /**
   * Not the best form making private fields public, however saves clutter of creating accessors / getters for all
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

  /**
   * Constructor - optionally pass in an existing object to clone.  If none then fields are set to defaults.
   * @param existing
   */
  constructor(private existing?: HumiditySensorViewModel) {
    super();
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

  getFieldMappings(): string[][] {
    return [
      ['/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0', 'string',
        '/startDate', 'string'],

      ['/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0', 'string',
        '/endDate', 'string'],

      ['/calibrationDate/value/0', 'string',
        '/calibrationDate', 'string'],

      ['/dataSamplingInterval', 'string',
        '/dataSamplingInterval', 'number'],

      ['/accuracyPercentRelativeHumidity', 'string',
        '/accuracyPercentRelativeHumidity', 'number'],

      ['/aspiration', 'string',
        '/aspiration', 'string'],

      ['/notes', 'string',
        '/notes', 'string'],

      ['/manufacturer', 'string',
        '/manufacturer', 'string'],

      ['/serialNumber', 'string',
        '/serialNumber', 'string'],

      ['/heightDiffToAntenna', 'string',
        '/heightDiffToAntenna', 'number']
    ];
  };

}
