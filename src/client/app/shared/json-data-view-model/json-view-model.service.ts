import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SiteLogDataModel} from './data-model/SiteLogDataModel';
import {HttpUtilsService} from '../global/http-utils.service';
import {Subscriber} from 'rxjs';
import {HumiditySensorsViewModel} from '../../humidity-sensor/humiditySensor-view-model';
import {SiteLogViewModel} from './view-model/SiteLogViewModel';

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
  public dataViewToModelViewJson(dataViewJson: any): Observable<SiteLogViewModel> {
    console.debug('dataViewToModelViewJson - dataViewJson: ', dataViewJson);

    return new Observable<SiteLogViewModel>((observer: Subscriber<SiteLogViewModel>) => {
      let siteLogDataModel: SiteLogDataModel = this.breakIntoParts(dataViewJson);
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
  breakIntoParts(dataViewJson: any): SiteLogDataModel {
    let siteLogInput: any = dataViewJson['geo:siteLog'];
    let siteLogOutput: SiteLogDataModel = <SiteLogDataModel>{};
    siteLogOutput['geo:siteLog'] = <any>{};
    siteLogOutput['geo:siteLog'].siteIdentification = siteLogInput.siteIdentification;
    siteLogOutput['geo:siteLog'].siteLocation = siteLogInput.siteLocation;
    siteLogOutput['geo:siteLog'].gnssReceivers = siteLogInput.gnssReceivers;
    siteLogOutput['geo:siteLog'].gnssAntennas = siteLogInput.gnssAntennas;
    siteLogOutput['geo:siteLog'].surveyedLocalTies = siteLogInput.surveyedLocalTies;
    siteLogOutput['geo:siteLog'].frequencyStandards = siteLogInput.frequencyStandards;
    siteLogOutput['geo:siteLog'].humiditySensors = siteLogInput.humiditySensors;
    siteLogOutput['geo:siteLog'].pressureSensors = siteLogInput.pressureSensors;
    siteLogOutput['geo:siteLog'].temperatureSensors = siteLogInput.temperatureSensors;
    siteLogOutput['geo:siteLog'].waterVaporSensors = siteLogInput.waterVaporSensors;
    siteLogOutput['geo:siteLog'].siteOwner = siteLogInput.siteOwner;
    siteLogOutput['geo:siteLog'].siteContact = siteLogInput.siteContact;
    siteLogOutput['geo:siteLog'].siteMetadataCustodian = siteLogInput.siteMetadataCustodian;
    siteLogOutput['geo:siteLog'].siteDataSource = siteLogInput.siteDataSource;
    siteLogOutput['geo:siteLog'].moreInformation = siteLogInput.moreInformation;
    siteLogOutput['geo:siteLog'].dataStreamsSet = siteLogInput.dataStreamsSet;
    return siteLogOutput;
  }

  translateToView(siteLogDataModel: SiteLogDataModel): Observable<SiteLogViewModel> {

    return new Observable<SiteLogViewModel>((observer: Subscriber<SiteLogViewModel>) => {
      let siteLogViewModel: SiteLogViewModel = <SiteLogViewModel>{};
      siteLogViewModel.siteLog = <any>{};
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

      observer.next(siteLogViewModel);
      observer.complete();
    });
  }
}
