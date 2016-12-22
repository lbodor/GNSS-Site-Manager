import {AbstractViewModel} from '../shared/json-data-view-model/view-model/abstract-view-model';
import {FieldValues} from '../shared/json-data-view-model/field-values';
import {ValuePointer} from '../shared/json-data-view-model/value-pointer';
import {MiscUtils} from '../shared/global/misc-utils';

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

  constructor() {
    super();
    let presentDT: string = MiscUtils.getPresentDateTime();

    this.startDate = presentDT;
    this.calibrationDate = presentDT;
    this.endDate = '';
    this.dataSamplingInterval =  0;
    this.accuracyPercentRelativeHumidity = 0;
    this.aspiration =  '';
    this.notes = '';
    this.manufacturer = '';
    this.serialNumber = '';
    this.heightDiffToAntenna = 0;
  }

  // TODO - remove type field and use generics instead
  createFieldMappings(): void {
      this.addFieldMapping('/humiditySensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
        'string',
        '/startDate', 'string');

      this.addFieldMapping('/humiditySensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
        'string',
        '/endDate', 'string');

      this.addFieldMapping('/humiditySensor/calibrationDate/value/0', 'string',
        '/calibrationDate', 'string');

      this.addFieldMapping('/humiditySensor/dataSamplingInterval', 'string',
        '/dataSamplingInterval', 'number');

      this.addFieldMapping('/humiditySensor/accuracyPercentRelativeHumidity', 'string',
        '/accuracyPercentRelativeHumidity', 'number');

      this.addFieldMapping('/humiditySensor/aspiration', 'string',
        '/aspiration', 'string');

      this.addFieldMapping('/humiditySensor/notes', 'string',
        '/notes', 'string');

      this.addFieldMapping('/humiditySensor/manufacturer', 'string',
        '/manufacturer', 'string');

      this.addFieldMapping('/humiditySensor/serialNumber', 'string',
        '/serialNumber', 'string');

      this.addFieldMapping('/humiditySensor/heightDiffToAntenna', 'string',
        '/heightDiffToAntenna', 'number');
  };
  /**
   * Child classes return FieldValues to specify any values to set at JSON paths upon creation of a new item.
   *
   * These will be created dynamically at runtime since the values could be state or time dependant.
   *
   * For example, set the DateInstalled.
   */
  getDefaultsValues(): FieldValues {
    let fieldValues: FieldValues = new FieldValues();

    let presentDT: string = MiscUtils.getPresentDateTime();

    fieldValues.add(new ValuePointer<string>('/startDate', presentDT));
    fieldValues.add(new ValuePointer<string>('/calibrationDate', presentDT));

    return fieldValues;
  }

  /**
   * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
   */
  setFinalValuesBeforeCreatingNewItem(): void {
    let presentDT: string = MiscUtils.getPresentDateTime();

    this.endDate=presentDT;
  }
}
