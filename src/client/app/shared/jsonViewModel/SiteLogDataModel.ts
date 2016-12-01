/**
 * Use this as a 'SiteLogDataModel' (that comes from GeodesyML) or a 'SiteLogViewModel' (that the view is rendered from)
 */
export interface SiteLogModel {
  siteIdentification: any;
  siteLocation: any;
  gnssReceivers: any[];
  gnssAntennas: any[];
  surveyedLocalTies: any[];
  frequencyStandards: any[];
  humiditySensors: any[];
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
