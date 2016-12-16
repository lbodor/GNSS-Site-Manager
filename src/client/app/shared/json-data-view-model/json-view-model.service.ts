import {Injectable} from '@angular/core';
// import {Observa?ble} from 'rxjs/Rx';
import {SiteLogDataModel, DataSiteLog} from './data-model/SiteLogDataModel';
// import {HttpUtilsService} from '../global/http-utils.service';
// import {Subscriber} from 'rxjs';
import {HumiditySensorViewModel} from '../../humidity-sensor/humiditySensor-view-model';
import {SiteLogViewModel, ViewSiteLog} from './view-model/SiteLogViewModel';
import {AbstractViewModel} from './view-model/AbstractViewModel';
import {DataViewTranslatorService} from './data-view-translator';
import {FieldMaps} from './FieldMap';
import {MiscUtilsService} from '../global/misc-utils.service';

/**
 * This class provides the service to convert from 'Geodesy data model JSON' (from the XML via Jsonix) to
 * 'Geodesy view model JSON' as consumed by the UI component classes.
 */

@Injectable()
export class JsonViewModelService {
  constructor(private miscUtilsService: MiscUtilsService) {
    //comment
  }

  /**
   * Given Geodesy data model JSON, translate to view model json.
   * @param dataModelJson from the GeodesyML - complete ViewSiteLog instance.
   * @return  translated ViewModelJson
   */
  public dataModelToViewModelJson(dataModelJson: any): SiteLogViewModel {
    console.debug('dataModelToViewModelJson - dataModelJson: ', dataModelJson);

    let siteLogDataModel: SiteLogDataModel = <SiteLogDataModel> dataModelJson;
    console.debug('siteLogDataModel: ', siteLogDataModel);
    let siteLogViewModel: SiteLogViewModel = <SiteLogViewModel>{};
    siteLogViewModel.siteLog = <ViewSiteLog>{};

    // siteLogViewModel.siteIdentification = SiteIdentification.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteLocation = SiteLocation.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteIdentification = SiteIdentification.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteLocation = SiteLocation.translateDataToView(siteLogDataModel);
    // siteLogViewModel.gnssReceivers = GnssReceivers.translateDataToView(siteLogDataModel);
    // siteLogViewModel.gnssAntennas = GnssAntennas.translateDataToView(siteLogDataModel);
    // siteLogViewModel.surveyedLocalTies = SurveyedLocalTies.translateDataToView(siteLogDataModel);
    // siteLogViewModel.frequencyStandards = FrequencyStandards.translateDataToView(siteLogDataModel);
    // let humiditySensors: HumiditySensors = new HumiditySensors();

    // let dataViewTranslatorService: DataViewTranslatorService = new DataViewTranslatorService(humiditySensorViewModel.fieldMapping());
    // dataViewTranslatorService.translateD2V(siteLogDataModel)
    // humiditySensorViewModel.createFromDataModel(siteLogDataModel['geo:siteLog'].humiditySensors);
    siteLogViewModel.siteLog.humiditySensors = <HumiditySensorViewModel[]> this.dataToViewModel(
      siteLogDataModel['geo:siteLog'].humiditySensors, new HumiditySensorViewModel());
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

  public viewModelToDataModelJson(viewModelJson: SiteLogViewModel): SiteLogDataModel {
    console.debug('viewModelToDataModelJson - viewModelJson: ', viewModelJson);

    // let siteLogDataModel: SiteLogDataModel = <SiteLogDataModel> dataModelJson;
    // console.debug('siteLogDataModel: ', siteLogDataModel);
    let siteLogDataModel: SiteLogDataModel = <SiteLogDataModel>{};
    siteLogDataModel['geo:siteLog'] = <DataSiteLog>{};

    // siteLogViewModel.siteIdentification = SiteIdentification.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteLocation = SiteLocation.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteIdentification = SiteIdentification.translateDataToView(siteLogDataModel);
    // siteLogViewModel.siteLocation = SiteLocation.translateDataToView(siteLogDataModel);
    // siteLogViewModel.gnssReceivers = GnssReceivers.translateDataToView(siteLogDataModel);
    // siteLogViewModel.gnssAntennas = GnssAntennas.translateDataToView(siteLogDataModel);
    // siteLogViewModel.surveyedLocalTies = SurveyedLocalTies.translateDataToView(siteLogDataModel);
    // siteLogViewModel.frequencyStandards = FrequencyStandards.translateDataToView(siteLogDataModel);
    // let humiditySensors: HumiditySensors = new HumiditySensors();

    // let dataViewTranslatorService: DataViewTranslatorService = new DataViewTranslatorService(humiditySensorViewModel.fieldMapping());
    // dataViewTranslatorService.translateD2V(siteLogDataModel)
    // humiditySensorViewModel.createFromDataModel(siteLogDataModel['geo:siteLog'].humiditySensors);
    siteLogDataModel['geo:siteLog'].humiditySensors = this.viewToDataModel(viewModelJson.siteLog.humiditySensors, new HumiditySensorViewModel());
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
    siteLogDataModel['geo:siteLog'].siteIdentification = viewModelJson.siteLog.siteIdentification;
    siteLogDataModel['geo:siteLog'].siteLocation = viewModelJson.siteLog.siteLocation;
    siteLogDataModel['geo:siteLog'].gnssReceivers = viewModelJson.siteLog.gnssReceivers;
    siteLogDataModel['geo:siteLog'].gnssAntennas = viewModelJson.siteLog.gnssAntennas;
    siteLogDataModel['geo:siteLog'].surveyedLocalTies = viewModelJson.siteLog.surveyedLocalTies;
    siteLogDataModel['geo:siteLog'].frequencyStandards = viewModelJson.siteLog.frequencyStandards;
    // siteLogDataModel['geo:siteLog'].humiditySensors = viewModelJson.siteLog.humiditySensors;
    siteLogDataModel['geo:siteLog'].pressureSensors = viewModelJson.siteLog.pressureSensors;
    siteLogDataModel['geo:siteLog'].temperatureSensors = viewModelJson.siteLog.temperatureSensors;
    siteLogDataModel['geo:siteLog'].waterVaporSensors = viewModelJson.siteLog.waterVaporSensors;
    siteLogDataModel['geo:siteLog'].siteOwner = viewModelJson.siteLog.siteOwner;
    siteLogDataModel['geo:siteLog'].siteContact = viewModelJson.siteLog.siteContact;
    siteLogDataModel['geo:siteLog'].siteMetadataCustodian = viewModelJson.siteLog.siteMetadataCustodian;
    siteLogDataModel['geo:siteLog'].siteDataSource = viewModelJson.siteLog.siteDataSource;
    siteLogDataModel['geo:siteLog'].moreInformation = viewModelJson.siteLog.moreInformation;
    siteLogDataModel['geo:siteLog'].dataStreamsSet = viewModelJson.siteLog.dataStreamsSet;

    return siteLogDataModel;
  }

  /* ***************************** Helper functions ***************************** */
  /**
   * Translate data model to view model
   * @param dataModels - array of data model items to convert
   * @param viewModelInstance - used as a template to copy and populate.  And has methods used.
   * @returns {AbstractViewModel[]} that is the super type of all view model types
   */
  private dataToViewModel(dataModels: any[], viewModelInstance: AbstractViewModel, singleInstance: AbstractViewModel): AbstractViewModel[] {
    let viewModels: AbstractViewModel[] = [];
    let fieldMappings: FieldMaps = singleInstance.getFieldMap();
    for (let dataModel of dataModels) {
      let blankViewModel: AbstractViewModel = this.miscUtilsService.cloneJsonObj(viewModelInstance);
      // let viewModel: AbstractViewModel = {};//new HumiditySensorViewModel();
      // let dataViewTranslatorService: DataViewTranslatorService = new DataViewTranslatorService(fieldMappings);
      DataViewTranslatorService.translateD2V(dataModel, blankViewModel, fieldMappings);  // humiditySensor
      viewModels.push(blankViewModel);
    }
    return viewModels;
  }

  /**
   * Translate view model to data model
   * @param viewModels - array of view model items to convert
   * @param viewModelInstance - used as a template to copy and populate.  And has methods used.
   * @returns {any[]} - translated data model
   */
  private viewToDataModel(viewModels: AbstractViewModel[]): any[] {
    let dataModels: any[] = [];
    // let viewModel: HumiditySensorViewModel = new HumiditySensorViewModel();
    let fieldMappings: FieldMaps = viewModels[0].getFieldMap();
    for (let viewModel of viewModels) {
      let dataModel: any = {};
      // let dataViewTranslatorService: DataViewTranslatorService = new DataViewTranslatorService(viewModel.fieldMapping());
      DataViewTranslatorService.translateV2D(viewModel, dataModel, fieldMappings);
      dataModels.push(dataModel);//new HumiditySensorPropertyType(dataModel));
    }
    return dataModels;
  }
}
