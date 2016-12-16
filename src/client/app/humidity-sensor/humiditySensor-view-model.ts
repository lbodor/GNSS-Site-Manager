import {AbstractViewModel} from '../shared/json-data-view-model/view-model/AbstractViewModel';

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

  getRawFieldMappings(): string[][] {
    return [
      ['/humiditySensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0', 'string',
        '/startDate', 'string'],

      ['/humiditySensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0', 'string',
        '/endDate', 'string'],

      ['/humiditySensor/calibrationDate/value/0', 'string',
        '/calibrationDate', 'string'],

      ['/humiditySensor/dataSamplingInterval', 'string',
        '/dataSamplingInterval', 'number'],

      ['/humiditySensor/accuracyPercentRelativeHumidity', 'string',
        '/accuracyPercentRelativeHumidity', 'number'],

      ['/humiditySensor/aspiration', 'string',
        '/aspiration', 'string'],

      ['/humiditySensor/notes', 'string',
        '/notes', 'string'],

      ['/humiditySensor/manufacturer', 'string',
        '/manufacturer', 'string'],

      ['/humiditySensor/serialNumber', 'string',
        '/serialNumber', 'string'],

      ['/humiditySensor/heightDiffToAntenna', 'string',
        '/heightDiffToAntenna', 'number']
    ];
  };
}
