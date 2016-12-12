import {HumiditySensorPropertyViewModel} from '../../../humidity-sensor/humiditySensor-view-model';
/**
 * ViewModel equivalent of ../data-model/SiteLogDataModel
 */
export interface SiteLog {
  siteIdentification: any;
  siteLocation: any;
  gnssReceivers: any[];
  gnssAntennas: any[];
  surveyedLocalTies: any[];
  frequencyStandards: any[];
  humiditySensors: HumiditySensorPropertyViewModel[];
  pressureSensors: any[];
  temperatureSensors: any[];
  waterVaporSensors: any[];
  siteOwner: any[];
  siteContact: any[];
  siteMetadataCustodian: any;
  siteDataSource: any;
  moreInformation: any;
  dataStreamsSet: any;
}

export interface SiteLogViewModel {
  siteLog: SiteLog;
}
