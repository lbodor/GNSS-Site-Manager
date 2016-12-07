import {JsonViewModelServiceSpecData} from '../shared/json-data-view-model/json-view-model.service.spec.data';
import {HumiditySensorsViewModel} from './humiditySensor-view-model';
export function main() {
  let humiditySensorsDataView: any;
  let humiditySensorsViewModel: HumiditySensorsViewModel;

  fdescribe('HumiditySensorsViewModel', () => {

    beforeEach(() => {
      humiditySensorsDataView = JsonViewModelServiceSpecData.data().humiditySensors;
      humiditySensorsViewModel = new HumiditySensorsViewModel();
    });

    it('test soemthign', () => {
      humiditySensorsViewModel.setFromDataModel(humiditySensorsDataView);

      expect(humiditySensorsViewModel).toBeDefined();
    });
  });
}
