import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/AbstractGroup';
import {HumiditySensorViewModel} from './humiditySensor-view-model';
import {AbstractViewModel} from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-humidity-sensors-group',
  templateUrl: 'humidity-sensors-group.component.html',
})
export class HumiditySensorsGroupComponent extends AbstractGroup {
  public miscUtils: any = MiscUtils;
  @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.humiditySensors);
    console.log('HumiditySensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.humiditySensors);
    console.log('HumiditySensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

  getItemName(): string {
    return 'Humidity Sensor';
  }

  compare(obj1: HumiditySensorViewModel, obj2: HumiditySensorViewModel): number {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else {
      let date1: string = obj1.startDate;
      let date2: string = obj2.startDate;
      return AbstractGroup.compareDates(date1, date2);
    }
  }

   /* **************************************************
   * Other methods
   */
  private newItem(): AbstractViewModel {
    return new HumiditySensorViewModel();
  }

  /**
   * Add a new empty humidity sensors as current one and push the 'old' current humidity sensors into previous list
   */
  public addNewItem(): void {
    this.isGroupOpen = true;
    let presentDT = MiscUtils.getPresentDateTime();

    if (!this.getItemsCollection()) {
      this.setItemsCollection([]);
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.getItemsCollection().length > 0) {
      let currentSensor: HumiditySensorViewModel = this.getItemsCollection()[0];
      if (! currentSensor.endDate) {
        currentSensor.endDate = presentDT;
      }
      console.log('Update last current sensor: ', currentSensor);
    }

    let newSensor: HumiditySensorViewModel = <HumiditySensorViewModel> this.newItem();
    let newSensorCopy = MiscUtils.cloneJsonObj(newSensor);

    newSensor.calibrationDate = presentDT;
    newSensor.startDate = presentDT;

    console.log('New sensor: ', newSensor);

    // Add the new humidity sensor as current one
    this.getItemsCollection().unshift(newSensor);//newSensorProperty);
    // Add the new humidity sensor (copy) into the original list so a diff of the fields can be performed
    this.getItemsOriginalCollection().unshift(newSensorCopy);

    this.newItemEvent();
  }
}
