import {DataViewTranslatorService} from './data-view-translator.service';
import {JsonViewModelServiceSpecData} from './json-view-model.service.spec.data';
import {FieldMaps} from './FieldMap';
import {SiteLogDataModel} from './data-model/SiteLogDataModel';
import {HumiditySensorViewModel} from '../../humidity-sensor/humiditySensor-view-model';
import {ReflectiveInjector} from '@angular/core';

export function main() {
  let dataViewTranslatorService: DataViewTranslatorService;
  // let jsonPointerService: JsonPointerService;
  let completeValidSitelog: SiteLogDataModel = JsonViewModelServiceSpecData.data();
  let fieldMappings: FieldMaps = new HumiditySensorViewModel().fieldMapping();

  fdescribe('Json view translator service', () => {

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        DataViewTranslatorService,
        {
          provide: FieldMaps, useValue: fieldMappings

        }
      ]);
      // dataViewTranslatorService = new DataViewTranslatorService(jsonPointerService, fieldMappings);
      dataViewTranslatorService = injector.get(DataViewTranslatorService);
      // jsonPointerService = injector.get(JsonPointerService);
    });

    it('should be defined', () => {
      expect(dataViewTranslatorService).toBeDefined();
      expect(completeValidSitelog).toBeDefined();
      expect(fieldMappings).toBeDefined();
      expect(fieldMappings.fieldMaps).toBeDefined();
      expect(fieldMappings.fieldMaps.length).toBeGreaterThan(0);
    });

    it('should translate d2v for humiditySensors', () => {
      let humiditySensorsData: any = completeValidSitelog['geo:siteLog'].humiditySensors;
      expect(humiditySensorsData).toBeDefined();
      let firstHSD: any = humiditySensorsData[0].humiditySensor;

      let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

      dataViewTranslatorService.translateD2V(firstHSD, firstHSV);

      expect(firstHSV).toBeDefined();

      expect(firstHSV.accuracyPercentRelativeHumidity).toEqual(firstHSD.accuracyPercentRelativeHumidity);
      expect(firstHSV.aspiration).toEqual(firstHSD.aspiration);
      expect(firstHSV.dataSamplingInterval).toEqual(firstHSD.dataSamplingInterval);
      expect(firstHSV.heightDiffToAntenna).toEqual(firstHSD.heightDiffToAntenna);
      expect(firstHSV.manufacturer).toEqual(firstHSD.manufacturer);
      expect(firstHSV.notes).toEqual(firstHSD.notes);
      expect(firstHSV.serialNumber).toEqual(firstHSD.serialNumber);

      expect(firstHSV.calibrationDate).toEqual(firstHSD.calibrationDate.value[0]);
      expect(firstHSV.startDate).toEqual(firstHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]);
      expect(firstHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeUndefined();
      expect(firstHSV.endDate).toEqual('');
    });

    it('should translate v2d for humiditySensors', () => {
      let humiditySensorsData: any = completeValidSitelog['geo:siteLog'].humiditySensors;
      expect(humiditySensorsData).toBeDefined();
      let firstHSD: any = humiditySensorsData[0].humiditySensor;

      let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

      dataViewTranslatorService.translateD2V(firstHSD, firstHSV);

      let newHSD: any = {};
      dataViewTranslatorService.translateV2D(firstHSV, newHSD);

      expect(newHSD).toBeDefined();

      expect(newHSD.accuracyPercentRelativeHumidity).toEqual(firstHSV.accuracyPercentRelativeHumidity);
      expect(newHSD.aspiration).toEqual(firstHSV.aspiration);
      expect(newHSD.dataSamplingInterval).toEqual(firstHSV.dataSamplingInterval);
      expect(newHSD.heightDiffToAntenna).toEqual(firstHSV.heightDiffToAntenna);
      expect(newHSD.manufacturer).toEqual(firstHSV.manufacturer);
      expect(newHSD.notes).toEqual(firstHSV.notes);
      expect(newHSD.serialNumber).toEqual(firstHSV.serialNumber);

      expect(newHSD.calibrationDate.value[0]).toEqual(firstHSV.calibrationDate);
      expect(firstHSV.startDate).toEqual(firstHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]);
      expect(firstHSV.endDate).toEqual('');
      expect(newHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toEqual('');
    });
  });
}
