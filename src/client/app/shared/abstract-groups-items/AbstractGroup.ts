import {GeodesyEvent, EventNames} from '../events-messages/Event';
import {AbstractViewModel} from '../json-data-view-model/view-model/AbstractViewModel';
export abstract class AbstractGroup {
  isGroupOpen: boolean = false;
  hasGroupANewItem: boolean = false;

  /**
   * Event mechanism to communicate with children.  Simply change the value of this and the children detect the change.
   * @type {{name: EventNames}}
   */
  private geodesyEvent: GeodesyEvent = {name: EventNames.none};

  /**
   * All the items (eg. HumiditySensors)
   */
  private itemProperties: any[];

  /**
   * A backup of the original list of items.  Used to diff against upon Save.
   */
  private itemOriginalProperties: any[];


  /**
   * Retrieve the obj.dateInstalled.value[0] or '' if no parts of the path exists.
   * @param obj
   * @returns {any}
   *
   * TODO - replace by inline Dottie call
   */
  public static getDateInstalled(obj: any) {
    if (obj && obj.dateInstalled
      && obj.dateInstalled.value
      && obj.dateInstalled.length > 0) {
      return obj.dateInstalled.value[0];
    } else {
      return '';
    }
  }

  /**
   * Retrieve the obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] or '' if no parts of
   * the path exists.
   * @param obj
   * @returns {any}
   *
   * TODO - no longer needed (confirm)
   */
  public static getBeginPositionDate(obj: any) {
    if (obj && obj.validTime && obj.validTime.abstractTimePrimitive && obj.validTime.abstractTimePrimitive['gml:TimePeriod']
      && obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition
      && obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value
      && obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value.length > 0) {
      return obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0];
    }
  }

  // TODO - no longer needed (confirm)
  public static getEndPositionDate(obj: any) {
    if (obj && obj.validTime && obj.validTime.abstractTimePrimitive && obj.validTime.abstractTimePrimitive['gml:TimePeriod']
      && obj.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition
      && obj.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value
      && obj.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value.length > 0) {
      return obj.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0];
    }
  }


  /**
   * This is used in comparators but isn't a comparator - just a helper function.  In the comparator, extract the dates
   * (using getDateInstalled(), getBeginPositionDate(), ...) and return compareDates(date1, date2)
   * @param date1
   * @param date2
   * @return -1: date1 < date2; 1: date1 > date2; 0: date1 == date2
   */
  public static compareDates(date1: string, date2: string): number {
    if (date1 < date2) {
      return 1;
    } else if (date1 > date2) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Get the item name to be used in the subclasses and displayed in the HTML.
   */
  abstract getItemName(): string;

  /**
   * Add a new item
   */
  abstract addNewItem(): void;

  /**
   * Subclasses can create a comparator relevant for their data structures.  Reduce size in these by
   * using getDateInstalled(), getBeginPositionDate.
   *
   * @param obj1
   * @param obj2
   */
  // abstract compare = (obj1: any, obj2: any): number
  abstract compare(obj1: AbstractViewModel, obj2: AbstractViewModel): number;

  /**
   * Event mechanism to communicate with children.  Simply change the value of this and the children detect the change.
   *
   * @returns {GeodesyEvent}
   */
  getGeodesyEvent(): GeodesyEvent {
    return this.geodesyEvent;
  }

  getIsGroupOpen(): boolean {
    return this.isGroupOpen;
  }

  getHasGroupANewItem(): boolean {
    return this.hasGroupANewItem;
  }

  getItemsCollection(): any {
    return this.itemProperties;
  }

  getItemsOriginalCollection(): any {
    return this.itemOriginalProperties;
  }

  setItemsCollection(itemProperties: any[]) {
    this.itemProperties = itemProperties;
    if (itemProperties && itemProperties.length > 0) {
      this.sortUsingComparator(this.itemProperties);
    }
  }

  setItemsOriginalCollection(itemProperties: any[]) {
    this.itemOriginalProperties = itemProperties;
    if (itemProperties && itemProperties.length > 0) {
      this.sortUsingComparator(this.itemOriginalProperties);
    }
  }


  /**
   * This is the event handler called by children
   * @param geodesyEvent
   */
  returnEvents(geodesyEvent: GeodesyEvent) {
    console.log('Parent - returnEvent: ', geodesyEvent);

    switch (geodesyEvent.name) {
      case EventNames.removeItem:
        this.removeItem(geodesyEvent.valueNumber);
        break;
      default:
        console.log('returnEvents - unknown event: ', EventNames[geodesyEvent.name]);
    }
  }

  addNew() {
    this.addNewItem();
    this.newItemEvent();
  }

  /**
   * After a new item is created 'EventNames.newItem' is sent so that item can init itself.
   */
  newItemEvent() {
    console.log('parent newItemEvent');
    let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
    geodesyEvent.name = EventNames.newItem;
    geodesyEvent.valueNumber = 0;
  }

  /**
   * Remove an item from the list
   */
  public removeItem(itemIndex: number) {
    console.log('parent - remove sensor item: ', itemIndex);
    this.getItemsCollection().splice(itemIndex, 1);
    this.getItemsOriginalCollection().splice(itemIndex, 1);
  }

  /** ===============================================================
   *     Comparators and other sorting
   *  ===============================================================
   */

  /**
   * Use the Geodesy object defined comparator in compare() to sort the given collection inline.
   *
   * @param collection
   */
  sortUsingComparator(collection: any[]) {
    collection.sort(this.compare);
  }

  /**
   * Comparator for sorting by object.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0].
   * @param obj1
   * @param obj2
   * @returns {number}
   */
  comparatorEffectiveStartDates(obj1: any, obj2: any) {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else {
      let date1: string = AbstractGroup.getBeginPositionDate(obj1);
      let date2: string = AbstractGroup.getBeginPositionDate(obj2);
      return AbstractGroup.compareDates(date1, date2);
    }
  }

  /**
   * Comparator for sorting by object.dateInstalled.value[0].
   * @param obj1
   * @param obj2
   * @returns {number}
   */
  comparatorDateInstalled(obj1: any, obj2: any) {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else {
      let date1: string = AbstractGroup.getDateInstalled(obj1);
      let date2: string = AbstractGroup.getDateInstalled(obj2);
      return AbstractGroup.compareDates(date1, date2);
    }
  }

}
