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

  /**
   * Constructor - optionally pass in an existing object to clone.  If none then fields are set to defaults.
   *
   * Three checks in order in (a=a|| existing && existing.a || default):
   * - the super may set a value,
   * - or value from existing,
   * - or use a default value
   * @param existing - build object from another
   */
  constructor(private existing?: HumiditySensorViewModel) {
    super();
    // TODO see if a way to simplify this
    this.startDate = this.startDate || existing && existing.startDate || '';
    this.endDate = this.endDate || existing && existing.endDate || '';
    this.calibrationDate = this.calibrationDate || existing && existing.calibrationDate || '';
    this.dataSamplingInterval = this.dataSamplingInterval || existing && existing.dataSamplingInterval || 0;
    this.accuracyPercentRelativeHumidity = this.accuracyPercentRelativeHumidity ||
      existing && existing.accuracyPercentRelativeHumidity || 0;
    this.aspiration = this.aspiration || existing && existing.aspiration || '';
    this.notes = this.notes || existing && existing.notes || '';
    this.manufacturer = this.manufacturer || existing && existing.manufacturer || '';
    this.serialNumber = this.serialNumber || existing && existing.serialNumber || '';
    this.heightDiffToAntenna = this.heightDiffToAntenna || existing && existing.heightDiffToAntenna || 0;
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
   * Child classes return FieldValues to specify any values to set at JSON paths in the object before a new item is
   * created.  That is, update the last one.
   *
   * These will be created dynamically at runtime since the values could be state or time dependant.
   *
   * For example, set the DateRemoved.
   */
  getBeforeCreatingNewItemValues(): FieldValues {
    let fieldValues: FieldValues = new FieldValues();

    let presentDT: string = MiscUtils.getPresentDateTime();

    fieldValues.add(new ValuePointer<string>('/endDate', presentDT));

    return fieldValues;
  }
}
