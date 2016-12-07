// import {Response} from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SiteLogModel} from './SiteLogDataModel';
import {HttpUtilsService} from '../global/http-utils.service';
import {Subscriber} from 'rxjs';
import {HumiditySensorsViewModel} from '../../humidity-sensor/humiditySensor-view-model';
// import {SiteIdentification} from './SiteIdentification';
// import {SiteLocation} from './SiteLocation';
// import {SiteLogModel} from './SiteLogModel';

/**
 * This class provides the service to convert from 'Geodesy data model JSON' (from the XML via Jsonix) to
 * 'Geodesy view model JSON' as consumed by the UI component classes.
 */

@Injectable()
export class JsonViewModelService {

  /**
   * Given Geodesy data view JSON, translate to Geodesy model view json.
   * @param dataViewJson from the GeodesyML - complete SiteLog instance.
   * @return Observable containing a response with translated modelViewJson
   */
  public dataViewToModelViewJson(dataViewJson: any): Observable<SiteLogModel> {
    console.debug('dataViewToModelViewJson - dataViewJson: ', dataViewJson);

    return new Observable<SiteLogModel>((observer: Subscriber<SiteLogModel>) => {
      let siteLogDataModel: SiteLogModel = this.breakIntoParts(dataViewJson);
      console.debug('siteLogDataModel: ', siteLogDataModel);
      this.translateToView(siteLogDataModel).subscribe(
        (item: any) => {
          console.debug('dataViewToModelViewJson - item: ', item);
          observer.next(item);
        },
        (error: Error) => HttpUtilsService.handleError,
        () => {
          console.debug('dataViewToModelViewJson - complete');
          observer.complete();
        });
    });
  }

  /**
   * Given Geodesy data model JSON, break into constituent parts such as Antennas, Recievers, ... to
   * be translated individually.
   *
   * @param dataViewJson
   * @return each part broken out of the SiteLog (data model)
   */
  breakIntoParts(dataViewJson: any): SiteLogModel {
    let siteLogDataModel: SiteLogModel = <SiteLogModel>{};
    let siteLog: any = dataViewJson['geo:siteLog'];
    siteLogDataModel.siteIdentification = siteLog.siteIdentification;
    siteLogDataModel.siteLocation = siteLog.siteLocation;
    siteLogDataModel.gnssReceivers = siteLog.gnssReceivers;
    siteLogDataModel.gnssAntennas = siteLog.gnssAntennas;
    siteLogDataModel.surveyedLocalTies = siteLog.surveyedLocalTies;
    siteLogDataModel.frequencyStandards = siteLog.frequencyStandards;
    siteLogDataModel.humiditySensors = siteLog.humiditySensors;
    siteLogDataModel.pressureSensors = siteLog.pressureSensors;
    siteLogDataModel.temperatureSensors = siteLog.temperatureSensors;
    siteLogDataModel.waterVaporSensors = siteLog.waterVaporSensors;
    siteLogDataModel.siteOwner = siteLog.siteOwner;
    siteLogDataModel.siteContact = siteLog.siteContact;
    siteLogDataModel.siteMetadataCustodian = siteLog.siteMetadataCustodian;
    siteLogDataModel.siteDataSource = siteLog.siteDataSource;
    siteLogDataModel.moreInformation = siteLog.moreInformation;
    siteLogDataModel.dataStreamsSet = siteLog.dataStreamsSet;
    return siteLogDataModel;
  }

  translateToView(siteLogDataModel: SiteLogModel): Observable<SiteLogModel> {

    return new Observable<SiteLogModel>((observer: Subscriber<SiteLogModel>) => {
      let siteLogViewModel: SiteLogModel = <SiteLogModel>{};
      console.debug('siteLogViewModel (have to do something with this):', siteLogViewModel);

      // siteLogViewModel.siteIdentification = SiteIdentification.translateDataToView(siteLogDataModel);
      // siteLogViewModel.siteLocation = SiteLocation.translateDataToView(siteLogDataModel);
      // siteLogViewModel.siteIdentification = SiteIdentification.translateDataToView(siteLogDataModel);
      // siteLogViewModel.siteLocation = SiteLocation.translateDataToView(siteLogDataModel);
      // siteLogViewModel.gnssReceivers = GnssReceivers.translateDataToView(siteLogDataModel);
      // siteLogViewModel.gnssAntennas = GnssAntennas.translateDataToView(siteLogDataModel);
      // siteLogViewModel.surveyedLocalTies = SurveyedLocalTies.translateDataToView(siteLogDataModel);
      // siteLogViewModel.frequencyStandards = FrequencyStandards.translateDataToView(siteLogDataModel);
      let humiditySensorsViewModel: HumiditySensorsViewModel = new HumiditySensorsViewModel();
      humiditySensorsViewModel.setFromDataModel(siteLogDataModel.humiditySensors);
      // siteLogViewModel.humiditySensors =
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
      observer.next(siteLogViewModel);
      observer.complete();
    });
  }
}
