import {ReflectiveInjector} from '@angular/core';
import {BaseRequestOptions, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

// import {JsonixService} from '../jsonix/jsonix.service';
// import {HttpUtilsService} from '../global/http-utils.service';
// import {ConstantsService} from '../global/constants.service';
import {JsonViewModelService} from './json-view-model.service';
import {SiteLogModel} from './SiteLogDataModel';
import {JsonViewModelServiceSpecData} from './json-view-model.service.spec.data';

export function main() {
  let backend: MockBackend = null;
  let jsonViewModelService: JsonViewModelService;
  let completeValidSitelog: any = JsonViewModelServiceSpecData.data();

  describe('JsonViewModelService', () => {

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        JsonViewModelService,
        // JsonixService,
        // ConstantsService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function (backend: MockBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      jsonViewModelService = injector.get(JsonViewModelService);
      backend = injector.get(MockBackend);
    });

    it('should be defined', () => {
      expect(jsonViewModelService).toBeDefined();
      expect(completeValidSitelog).toBeDefined();
    });

    it('should return parts', () => {

      let siteLogDataModel: SiteLogModel = jsonViewModelService.breakIntoParts(completeValidSitelog);
      expect(siteLogDataModel).toBeDefined();
      expect(siteLogDataModel.siteIdentification).toBeDefined();
      expect(siteLogDataModel.siteLocation).toBeDefined();
      expect(siteLogDataModel.gnssReceivers).toBeDefined();
      expect(siteLogDataModel.gnssReceivers.length).not.toBe(0);
      expect(siteLogDataModel.gnssAntennas).toBeDefined();
      expect(siteLogDataModel.gnssAntennas.length).not.toBe(0);
      expect(siteLogDataModel.surveyedLocalTies).toBeDefined();
      expect(siteLogDataModel.surveyedLocalTies.length).not.toBe(0);
      expect(siteLogDataModel.frequencyStandards).toBeDefined();
      expect(siteLogDataModel.frequencyStandards.length).not.toBe(0);
      expect(siteLogDataModel.humiditySensors).toBeDefined();
      expect(siteLogDataModel.humiditySensors.length).not.toBe(0);
      expect(siteLogDataModel.pressureSensors).toBeDefined();
      expect(siteLogDataModel.pressureSensors.length).not.toBe(0);
      expect(siteLogDataModel.temperatureSensors).toBeDefined();
      expect(siteLogDataModel.temperatureSensors.length).not.toBe(0);
      expect(siteLogDataModel.waterVaporSensors).toBeDefined();
      expect(siteLogDataModel.waterVaporSensors.length).not.toBe(0);
      expect(siteLogDataModel.siteOwner).toBeDefined();
      expect(siteLogDataModel.siteOwner.length).not.toBe(0);
      expect(siteLogDataModel.siteContact).toBeDefined();
      expect(siteLogDataModel.siteMetadataCustodian).toBeDefined();
      expect(siteLogDataModel.siteDataSource).toBeDefined();
      expect(siteLogDataModel.moreInformation).toBeDefined();
      expect(siteLogDataModel.dataStreamsSet).toBeDefined();
    });

    it('should translate parts', () => {
      jsonViewModelService.dataViewToModelViewJson(completeValidSitelog).subscribe(
        (response: any) => {
          let siteLogViewModel: SiteLogModel = <SiteLogModel>response;
          expect(siteLogViewModel).toBeDefined();
          console.debug('should translate parts - view model: ', siteLogViewModel.siteIdentification);
          expect(siteLogViewModel.siteIdentification).toBeDefined();
          expect(siteLogViewModel.siteIdentification.fourCharacterID).toEqual('ADE1');
          expect(siteLogViewModel.siteLocation).toBeDefined();
          expect(siteLogViewModel.siteLocation.city).toEqual('Salisbury');
          // expect(siteLogViewModel.gnssReceivers).toBeDefined();
          // expect(siteLogViewModel.gnssReceivers.length).not.toBe(0);
          // expect(siteLogViewModel.gnssAntennas).toBeDefined();
          // expect(siteLogViewModel.gnssAntennas.length).not.toBe(0);
          // expect(siteLogViewModel.surveyedLocalTies).toBeDefined();
          // expect(siteLogViewModel.surveyedLocalTies.length).not.toBe(0);
          // expect(siteLogViewModel.frequencyStandards).toBeDefined();
          // expect(siteLogViewModel.frequencyStandards.length).not.toBe(0);
          // expect(siteLogViewModel.humiditySensors).toBeDefined();
          // expect(siteLogViewModel.humiditySensors.length).not.toBe(0);
          // expect(siteLogViewModel.pressureSensors).toBeDefined();
          // expect(siteLogViewModel.pressureSensors.length).not.toBe(0);
          // expect(siteLogViewModel.temperatureSensors).toBeDefined();
          // expect(siteLogViewModel.temperatureSensors.length).not.toBe(0);
          // expect(siteLogViewModel.waterVaporSensors).toBeDefined();
          // expect(siteLogViewModel.waterVaporSensors.length).not.toBe(0);
          // expect(siteLogViewModel.siteOwner).toBeDefined();
          // expect(siteLogViewModel.siteOwner.length).not.toBe(0);
          // expect(siteLogViewModel.siteContact).toBeDefined();
          // expect(siteLogViewModel.siteMetadataCustodian).toBeDefined();
          // expect(siteLogViewModel.siteDataSource).toBeDefined();
          // expect(siteLogViewModel.moreInformation).toBeDefined();
          // expect(siteLogViewModel.dataStreamsSet).toBeDefined();

        });
    });
  });
}
