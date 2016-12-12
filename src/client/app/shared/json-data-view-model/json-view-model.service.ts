import {Injectable} from '@angular/core';
// import {Observa?ble} from 'rxjs/Rx';
import {SiteLogDataModel} from './data-model/SiteLogDataModel';
// import {HttpUtilsService} from '../global/http-utils.service';
// import {Subscriber} from 'rxjs';
import {HumiditySensorsViewModel} from '../../humidity-sensor/humiditySensor-view-model';
import {SiteLogViewModel, SiteLog} from './view-model/SiteLogViewModel';

/**
 * This class provides the service to convert from 'Geodesy data model JSON' (from the XML via Jsonix) to
 * 'Geodesy view model JSON' as consumed by the UI component classes.
 */

@Injectable()
export class JsonViewModelService {

  /**
   * Given Geodesy data model JSON, translate to view model json.
   * @param dataModelJson from the GeodesyML - complete SiteLog instance.
   * @return  translated ViewModelJson
   */
  public dataModelToViewModelJson(dataModelJson: any): SiteLogViewModel {
    console.debug('dataModelToViewModelJson - dataModelJson: ', dataModelJson);

    let siteLogDataModel: SiteLogDataModel = <SiteLogDataModel> dataModelJson;
    console.debug('siteLogDataModel: ', siteLogDataModel);
    let siteLogViewModel: SiteLogViewModel = <SiteLogViewModel>{};
    siteLogViewModel.siteLog = <SiteLog>{};

    // siteLogViewModel.siteIdentification = SiteIdentification.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteLocation = SiteLocation.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteIdentification = SiteIdentification.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteLocation = SiteLocation.translateDataToView(siteLogDataModel);
    // siteLogViewModel.gnssReceivers = GnssReceivers.translateDataToView(siteLogDataModel);
    // siteLogViewModel.gnssAntennas = GnssAntennas.translateDataToView(siteLogDataModel);
    // siteLogViewModel.surveyedLocalTies = SurveyedLocalTies.translateDataToView(siteLogDataModel);
    // siteLogViewModel.frequencyStandards = FrequencyStandards.translateDataToView(siteLogDataModel);
    let humiditySensorsViewModel: HumiditySensorsViewModel = new HumiditySensorsViewModel();
    humiditySensorsViewModel.createFromDataModel(siteLogDataModel['geo:siteLog'].humiditySensors);
    siteLogViewModel.siteLog.humiditySensors = humiditySensorsViewModel.humiditySensors;
    //   console.debug('translateToView subscribe fn - siteIdentification: ', siteLogViewModel.siteIdentification);
    // siteLogViewModel.pressureSensors = PressureSensors.translateDataToView(siteLogDataModel);
    // siteLogViewModel.temperatureSensors = TemperatureSensors.translateDataToView(siteLogDataModel);
    // siteLogViewModel.waterVaporSensors = WaterVaporSensors.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteOwner = SiteOwner.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteContact = SiteContact.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteMetadataCustodian = SiteMetadataCustodian.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteDataSource = SiteDataSource.translateDataToView(siteLogDataModel);
    // siteLogViewModel.moreInformation = MoreInformation.translateDataToView(siteLogDataModel);
    // siteLogViewModel.dataStreamsSet = DataStreamsSet.translateDataToView(siteLogDataModel);

    // For now just copy the DataModel parts over that haven't had translate to view written yet
    siteLogViewModel.siteLog.siteIdentification = siteLogDataModel['geo:siteLog'].siteIdentification;
    siteLogViewModel.siteLog.siteLocation = siteLogDataModel['geo:siteLog'].siteLocation;
    siteLogViewModel.siteLog.gnssReceivers = siteLogDataModel['geo:siteLog'].gnssReceivers;
    siteLogViewModel.siteLog.gnssAntennas = siteLogDataModel['geo:siteLog'].gnssAntennas;
    siteLogViewModel.siteLog.surveyedLocalTies = siteLogDataModel['geo:siteLog'].surveyedLocalTies;
    siteLogViewModel.siteLog.frequencyStandards = siteLogDataModel['geo:siteLog'].frequencyStandards;
    // siteLogViewModel.siteLog.humiditySensors = siteLogDataModel['geo:siteLog'].humiditySensors;
    siteLogViewModel.siteLog.pressureSensors = siteLogDataModel['geo:siteLog'].pressureSensors;
    siteLogViewModel.siteLog.temperatureSensors = siteLogDataModel['geo:siteLog'].temperatureSensors;
    siteLogViewModel.siteLog.waterVaporSensors = siteLogDataModel['geo:siteLog'].waterVaporSensors;
    siteLogViewModel.siteLog.siteOwner = siteLogDataModel['geo:siteLog'].siteOwner;
    siteLogViewModel.siteLog.siteContact = siteLogDataModel['geo:siteLog'].siteContact;
    siteLogViewModel.siteLog.siteMetadataCustodian = siteLogDataModel['geo:siteLog'].siteMetadataCustodian;
    siteLogViewModel.siteLog.siteDataSource = siteLogDataModel['geo:siteLog'].siteDataSource;
    siteLogViewModel.siteLog.moreInformation = siteLogDataModel['geo:siteLog'].moreInformation;
    siteLogViewModel.siteLog.dataStreamsSet = siteLogDataModel['geo:siteLog'].dataStreamsSet;

    return siteLogViewModel;
  }
}
