import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantsService, DialogService, MiscUtils,
         SiteLogService, JsonDiffService, JsonCheckService } from '../shared/index';
import {SiteLogViewModel} from '../shared/json-data-view-model/view-model/site-log-view-model';

/**
 * This class represents the SiteInfoComponent for viewing and editing the details of site/receiver/antenna.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-site-info',
  templateUrl: 'site-info.component.html'
})
export class SiteInfoComponent implements OnInit, OnDestroy {
  private siteId: string;
  private isLoading: boolean = false;
  private siteLogOrigin: any = {};
  private siteLogModel: any = {};
  private siteLogModelXXX: any = {};
  private siteIdentification: any = null;
  private siteLocation: any = {};
  private siteContacts: Array<any> = [];
  private siteMetadataCustodian: any = {};
  private siteDataCenters: Array<any> = [];
  private siteDataSource: any = {};
  private receivers: Array<any> = [];
  private antennas: Array<any> = [];
  private surveyedLocalTies: Array<any> = [];
  private frequencyStandards: Array<any> = [];
  private episodicEffects: Array<any> = [];
  private humiditySensors: Array<any> = [];
  private pressureSensors: Array<any> = [];
  private temperatureSensors: Array<any> = [];
  private waterVaporSensors: Array<any> = [];
  private errorMessage: string;
  private siteInfoTab: any = null;
  private submitted: boolean = false;
  public miscUtils: any = MiscUtils;

  public siteContactName: string = ConstantsService.SITE_CONTACT;
  public siteMetadataCustodianName: string = ConstantsService.SITE_METADATA_CUSTODIAN;
  public siteDataCenterName: string = ConstantsService.SITE_DATA_CENTER;
  public siteDataSourceName: string = ConstantsService.SITE_DATA_SOURCE;

  private status: any = {
    oneAtATime: false,
    isSiteInfoGroupOpen: true,
    isSiteMediaOpen: false,
    isMetaCustodianOpen: false,
    isReceiverGroupOpen: false,
    isReceiversOpen: [],
    isAntennaGroupOpen: false,
    isAntennasOpen: [],
    isFrequencyStdGroupOpen: false,
    isEpisodicEffectGroupOpen: false,
    isFrequencyStdsOpen: [],
    isEpisodicEffectOpen: [],
    hasNewSiteContact: false,
    hasNewSiteMetadataCustodian: false,
    hasNewSiteDataCenter: false,
    hasNewSiteDataSource: false,
    hasNewAntenna: false,
    hasNewReceiver: false,
    hasNewFrequencyStd: false,
    hasNewEpisodicEffect: false,
    isHumiditySensorsGroupOpen: false,
    isHumiditySensorsOpen: [],
    hasNewHumiditySensor: false,
    isPressureSensorsGroupOpen: false,
    isPressureSensorsOpen: [],
    hasNewPressureSensor: false,
    isTemperatureSensorsGroupOpen: false,
    isTemperatureSensorsOpen: [],
    hasNewTemperatureSensor: false,
    isWaterVaporSensorsGroupOpen: false,
    isWaterVaporSensorsOpen: [],
    hasNewWaterVaporSensor: false,
    isSurveyedLocalTiesGroupOpen: false,
    isSurveyedLocalTiesOpen: [],
    hasNewSurveyedLocalTie: false
  };

  /**
   * Creates an instance of the SiteInfoComponent with the injected Router/ActivatedRoute/CorsSite Services.
   *
   * @param {Router} router - The injected Router.
   * @param {ActivatedRoute} route - The injected ActivatedRoute.
   * @param {DialogService} dialogService - The injected DialogService.
   * @param {SiteLogService} siteLogService - The injected SiteLogService.
   * @param {JsonDiffService} jsonDiffService - The injected JsonDiffService.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private siteLogService: SiteLogService,
    private jsonDiffService: JsonDiffService,
    private jsonCheckService: JsonCheckService
  ) {}

  /**
   * Initialise all data on loading the site-info page
   */
  public ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      this.siteId = id;
    });

    this.siteLogModelXXX = {
      gnssReceivers: [],
      gnssAntennas: [],
      surveyedLocalTies: [],
      frequencyStandards: [],
      localEpisodicEventsSet: [],
      humiditySensors: [],
      pressureSensors: [],
      temperatureSensors: [],
      waterVaporSensors: []
    };

    this.siteLogOrigin = {
      gnssReceivers: [],
      gnssAntennas: [],
      surveyedLocalTies: [],
      frequencyStandards: [],
      localEpisodicEventsSet: [],
      humiditySensors: [],
      pressureSensors: [],
      temperatureSensors: [],
      waterVaporSensors: []
    };

    this.loadSiteInfoData();
  }

  /**
   * Retrieve relevant site/setup/log information from DB based on given Site Id
   */
  public loadSiteInfoData() {
    // Do not allow direct access to site-info page
    if (!this.siteId) {
      this.goBack();
    }

    this.isLoading =  true;
    this.submitted = false;
    this.status.hasNewAntenna = false;
    this.status.hasNewReceiver = false;
    this.status.hasNewFrequencyStd = false;
    this.status.hasNewEpisodicEffect = false;
    this.status.isReceiversOpen.length = 0;
    this.status.isAntennasOpen.length = 0;
    this.status.isFrequencyStdsOpen.length = 0;
    this.status.isEpisodicEffectOpen.length = 0;
    this.receivers.length = 0;
    this.antennas.length = 0;
    this.surveyedLocalTies.length = 0;
    this.frequencyStandards.length = 0;
    this.episodicEffects.length = 0;
    this.humiditySensors.length = 0;
    this.pressureSensors.length = 0;
    this.temperatureSensors.length = 0;
    this.waterVaporSensors.length = 0;

    this.siteInfoTab = this.route.params.subscribe(() => {
      this.siteLogService.getSiteLogByFourCharacterIdUsingGeodesyML(this.siteId).subscribe(
        (responseJson: any) => {
          this.siteLogModel = this.jsonCheckService.getValidSiteLog(responseJson.siteLog);//['geo:siteLog']);
          this.siteIdentification = this.siteLogModel.siteIdentification;
          this.siteLocation = this.jsonCheckService.getValidSiteLocation(this.siteLogModel.siteLocation);
          this.siteContacts = [];
          for (let contact of this.siteLogModel.siteContact) {
            this.siteContacts.push(this.jsonCheckService.getValidResponsibleParty(contact.ciResponsibleParty));
          }
          this.siteMetadataCustodian = this.jsonCheckService
                  .getValidResponsibleParty(this.siteLogModel.siteMetadataCustodian.ciResponsibleParty);
          this.siteDataCenters = [];
          for (let siteDataCenter of this.siteLogModel.siteDataCenter) {
            this.siteDataCenters.push(this.jsonCheckService.getValidResponsibleParty(siteDataCenter.ciResponsibleParty));
          }
          this.siteDataSource = !this.siteLogModel.siteDataSource.ciResponsibleParty ? null : this.jsonCheckService
                  .getValidResponsibleParty(this.siteLogModel.siteDataSource.ciResponsibleParty);

          this.setGnssReceivers(this.siteLogModel.gnssReceivers);
          this.setGnssAntennas(this.siteLogModel.gnssAntennas);
          this.setSurveyedLocalTies(this.siteLogModel.surveyedLocalTies);
          this.setFrequencyStandards(this.siteLogModel.frequencyStandards);
          this.setEpisodicEffects(this.siteLogModel.localEpisodicEventsSet);
          this.setPressureSensors(this.siteLogModel.pressureSensors);
          this.setTemperatureSensors(this.siteLogModel.temperatureSensors);
          this.setWaterVaporSensors(this.siteLogModel.waterVaporSensors);
          this.backupSiteLogJson();
          this.isLoading = false;
          this.dialogService.showSuccessMessage('Site log info loaded successfully for ' + this.siteId);
        },
        (error: Error) =>  {
          this.errorMessage = <any>error;
          this.isLoading = false;
          this.siteLogModel = {
            gnssReceivers: [],
            gnssAntennas: [],
            surveyedLocalTies: [],
            frequencyStandards: [],
            localEpisodicEventsSet: [],
            humiditySensors: [],
            pressureSensors: [],
            temperatureSensors: [],
            waterVaporSensors: []
          };
          this.dialogService.showErrorMessage('No site log info found for ' + this.siteId);
        }
      );
    });
  }

  /**
   * Clear all variables/arrays
   */
  public ngOnDestroy() {
    this.isLoading =  false;
    this.siteLogModel = null;
    this.siteIdentification = null;
    this.siteLocation = null;
    this.siteContacts.length = 0;
    this.siteMetadataCustodian = null;
    this.siteDataCenters.length = 0;
    this.siteDataSource = null;
    this.status = null;
    this.receivers.length = 0;
    this.antennas.length = 0;
    this.surveyedLocalTies.length = 0;
    this.frequencyStandards.length = 0;
    this.episodicEffects.length = 0;
    this.humiditySensors.length = 0;
    this.pressureSensors.length = 0;
    this.temperatureSensors.length = 0;
    this.waterVaporSensors.length = 0;
    this.errorMessage = '';
    // It seems that ngOnDestroy is called when the object is destroyed, but ngOnInit isn't called every time an
    // object is created.  Hence this field might not have been created.
    if (this.siteInfoTab !== undefined && this.siteInfoTab !== null) {
      this.siteInfoTab.unsubscribe();
    }
  }

  /**
   * Save changes made back to siteLog XML
   */
  public save(form: any) {
    let diffMsg: string = this.jsonDiffService.getJsonDiffHtml(this.siteLogOrigin, this.siteLogModel);
    if ( diffMsg === null || diffMsg.trim() === '') {
      this.dialogService.showLogMessage('No changes have been made for ' + this.siteId + '.');
      return;
    }

    let that: any = this;

    this.dialogService.confirmSaveDialog(diffMsg,
      function() {
        that.isLoading = true;
        that.submitted = true;
        that.status.hasNewSiteContact = false;
        that.status.hasNewSiteMetadataCustodian = false;
        that.status.hasNewSiteDataCenter = false;
        that.status.hasNewSiteDataSource = false;
        that.status.hasNewAntenna = false;
        that.status.hasNewReceiver = false;
        that.status.hasNewSurveyedLocalTie = false;
        that.status.hasNewFrequencyStd = false;
        that.status.hasNewHumiditySensor = false;
        that.status.hasNewPressureSensor = false;
        that.status.hasNewTemperatureSensor = false;
        that.status.hasNewWaterVaporSensor = false;
        that.status.hasNewEpisodicEffect = false;
        let siteLogViewModel: SiteLogViewModel  = new SiteLogViewModel();
        siteLogViewModel.siteLog=that.siteLogModel;
        that.siteLogService.saveSiteLog(siteLogViewModel).subscribe(
          (responseJson: any) => {
            //if (form)form.pristine = true;  // Note: pristine has no setter method in ng2-form!
            that.isLoading = false;
            that.backupSiteLogJson();
            that.dialogService.showSuccessMessage('Done in saving SiteLog data for '+that.siteId);
          },
          (error: Error) =>  {
            that.isLoading = false;
            that.errorMessage = <any>error;
            that.dialogService.showErrorMessage('Error in saving SiteLog data for '+that.siteId);
          }
        );
      },
      function() {
        that.dialogService.showLogMessage('Cancelled in saving SiteLog data for '+that.siteId);
        that.isLoading = false;
      }
    );
  }

  /**
   * Close the site-info page and go back to the default home page (select-site tab)
   */
  public goBack() {
    this.isLoading =  false;
    this.siteId = null;
    let link = ['/'];
    this.router.navigate(link);
  }

  public backupSiteLogJson() {
    this.siteLogOrigin = MiscUtils.cloneJsonObj(this.siteLogModel);
  }

  /**
   * Set current and previous receivers, and their show/hide flags
   */
  private setGnssReceivers(gnssReceivers: any) {
    this.status.isReceiversOpen = [];
    let currentReceiver: any = null;
    for (let receiverObj of gnssReceivers) {
      let receiver = this.jsonCheckService.getValidReceiver(receiverObj.gnssReceiver);
      if ( !receiver.dateRemoved.value[0] ) {
        currentReceiver = receiver;
      } else {
        this.receivers.push(receiver);
        this.status.isReceiversOpen.push(false);
      }
    }
    // Sort by dateInstalled for all previous receivers
    this.receivers.sort(this.compareDateInstalled);

    // Current receiver (even null) are the first item in the arrays and open by default
    this.receivers.unshift(currentReceiver);
    this.status.isReceiversOpen.unshift(true);
  }

  /**
   * Set current and previous antennas, and their show/hide flags
   */
  private setGnssAntennas(gnssAntennas: any) {
    this.status.isAntennasOpen = [];
    let currentAntenna: any = null;
    for (let antennaObj of gnssAntennas) {
      let antenna = this.jsonCheckService.getValidAntenna(antennaObj.gnssAntenna);
      if (!antenna.dateRemoved.value[0]) {
        currentAntenna = antenna;
      } else {
        this.antennas.push(antenna);
        this.status.isAntennasOpen.push(false);
      }
    }
    // Sort by dateInstalled for all previous antennas
    this.antennas.sort(this.compareDateInstalled);

    // Current antenna (even null) are the first item in the arrays and open by default
    this.antennas.unshift(currentAntenna);
    this.status.isAntennasOpen.unshift(true);
  }

  /**
   * Set current and previous Surveyed Local Ties, and their show/hide flags
   */
  private setSurveyedLocalTies(surveyedLocalTies: any) {
    this.status.isSurveyedLocalTiesOpen = [];
    let currentSurveyedLocalTie: any = null;
    for (let surveyedLocalTieObj of surveyedLocalTies) {
      currentSurveyedLocalTie = this.jsonCheckService.getValidSurveyedLocalTie(surveyedLocalTieObj.surveyedLocalTies);
      this.surveyedLocalTies.push(currentSurveyedLocalTie);
      this.status.isSurveyedLocalTiesOpen.push(false);
    }
    this.surveyedLocalTies.sort(this.compareDateMeasured);

    // the first item in the array is open by default
    this.status.isSurveyedLocalTiesOpen.pop();
    this.status.isSurveyedLocalTiesOpen.unshift(true);
  }

  /**
   * Set current and previous frequency standards, and their show/hide flags
   */
  private setFrequencyStandards(frequencyStds: any) {
    this.status.isFrequencyStdsOpen = [];
    let currentFrequencyStd: any = null;
    for (let frequencyStdObj of frequencyStds) {
      let frequencyStd = this.jsonCheckService.getValidFrequencyStandard(frequencyStdObj.frequencyStandard);
      if (!frequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]) {
        currentFrequencyStd = frequencyStd;
      } else {
        this.frequencyStandards.push(frequencyStd);
        this.status.isFrequencyStdsOpen.push(false);
      }
    }
    // Sort by effective start dates for all previous frequency standards
    this.frequencyStandards.sort(this.compareEffectiveStartDates);

    // Current frequency standard (even null) are the first item in the arrays and open by default
    this.frequencyStandards.unshift(currentFrequencyStd);
    this.status.isFrequencyStdsOpen.unshift(true);
  }

  /**
   * Set current and previous pressure sensors, and their show/hide flags
   */
  private setPressureSensors(pressureSensors: any) {
    this.status.isPressureSensorsOpen = [];
    let currentPressureSensor: any = null;
    for (let pressureSensorObj of pressureSensors) {
      currentPressureSensor = this.jsonCheckService.getValidPressureSensor(pressureSensorObj.pressureSensor);
      this.pressureSensors.push(currentPressureSensor);
      this.status.isPressureSensorsOpen.push(false);
    }
    this.pressureSensors.sort(this.compareEffectiveStartDates);

    // the first item in the array is open by default
    this.status.isPressureSensorsOpen.pop();
    this.status.isPressureSensorsOpen.unshift(true);
  }

  /**
   * Set current and previous temperature sensors, and their show/hide flags
   */
  private setTemperatureSensors(temperatureSensors: any) {
    this.status.isTemperatureSensorsOpen = [];
    let currentTemperatureSensor: any = null;
    for (let temperatureSensorObj of temperatureSensors) {
      currentTemperatureSensor = this.jsonCheckService.getValidTemperatureSensor(temperatureSensorObj.temperatureSensor);
      this.temperatureSensors.push(currentTemperatureSensor);
      this.status.isTemperatureSensorsOpen.push(false);
    }
    this.temperatureSensors.sort(this.compareEffectiveStartDates);

    // the first item in the array is open by default
    this.status.isTemperatureSensorsOpen.pop();
    this.status.isTemperatureSensorsOpen.unshift(true);
  }

  /**
   * Set current and previous water vapor sensors, and their show/hide flags
   */
  private setWaterVaporSensors(waterVaporSensors: any) {
    this.status.isWaterVaporSensorsOpen = [];
    let currentWaterVaporSensor: any = null;
    for (let waterVaporSensorObj of waterVaporSensors) {
      currentWaterVaporSensor = this.jsonCheckService.getValidWaterVaporSensor(waterVaporSensorObj.waterVaporSensor);
      this.waterVaporSensors.push(currentWaterVaporSensor);
      this.status.isWaterVaporSensorsOpen.push(false);
    }
    this.waterVaporSensors.sort(this.compareEffectiveStartDates);

    // the first item in the array is open by default
    this.status.isWaterVaporSensorsOpen.pop();
    this.status.isWaterVaporSensorsOpen.unshift(true);
  }

  /**
   * Set current and previous episodic effects, and their show/hide flags
   */
  private setEpisodicEffects(episodicEffectSet: any) {
    this.status.isEpisodicEffectOpen = [];
    for (let episodicEffectWrapper of episodicEffectSet) {
      let episodicEffect = this.jsonCheckService.getValidEpisodicEffect(episodicEffectWrapper.localEpisodicEvents);
      this.episodicEffects.push(episodicEffect);
      this.status.isEpisodicEffectOpen.push(false);
    }

    // Sort by effective start dates for all previous episodic effects
    this.episodicEffects.sort(this.compareEffectiveStartDates);

    // The first episodic effect after sorting is the current one and should be open by default
    if (this.status.isEpisodicEffectOpen.length > 0) {
      this.status.isEpisodicEffectOpen[0] = true;
    }
  }

  /**
   * Sort receivers/antennas based on their Date_Installed values in ascending order
   */
  private compareDateInstalled(obj1: any, obj2: any) {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else if (obj1.dateInstalled.value[0] < obj2.dateInstalled.value[0]) {
      return 1;
    } else if (obj1.dateInstalled.value[0] > obj2.dateInstalled.value[0]) {
      return -1;
    }
    return 0;
  }

  /**
   * Sort objects based on their Date_Measured values in ascending order
   */
  private compareDateMeasured(obj1: any, obj2: any) {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else if (obj1.dateMeasured.value[0] < obj2.dateMeasured.value[0]) {
      return 1;
    } else if (obj1.dateMeasured.value[0] > obj2.dateMeasured.value[0]) {
      return -1;
    }
    return 0;
  }

  /**
   * Sort frequency standards and sensors based on their effective start dates in ascending order
   */
  private compareEffectiveStartDates(obj1: any, obj2: any) {
    if (obj1 === null || obj2 === null ) {
      return 0;
    } else if (obj1.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]
      < obj2.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]) {
      return 1;
    }else if (obj1.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]
      > obj2.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]) {
      return -1;
    }
    return 0;
  }
}
