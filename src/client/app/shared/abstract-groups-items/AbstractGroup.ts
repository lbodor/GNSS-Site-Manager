import {GeodesyEvent, EventNames} from '../events-messages/Event';
import {AbstractViewModel} from '../json-data-view-model/view-model/abstract-view-model';
import * as _ from 'lodash';

export abstract class AbstractGroup<T extends AbstractViewModel> {
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
  private itemProperties: T[];

  /**
   * A backup of the original list of items.  Used to diff against upon Save.
   */
  private itemOriginalProperties: T[];

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

  public addNewItem(): void {
    this.isGroupOpen = true;

    if (!this.getItemsCollection()) {
      this.setItemsCollection([]);
    }

    if (this.getItemsCollection().length > 0) {
      // Let the ViewModels do anything they like with the previous item
      this.getItemsCollection()[0].populateBeforeCreatingNewItemValues();
    }

    let newItem: T =  <T> this.newViewModelItem();
    let newItemCopy = _.cloneDeep(newItem);

    console.log('New View Model: ', newItem);

    // Add the new humidity sensor as current one
    this.getItemsCollection().unshift(newItem);//newSensorProperty);
    // Add the new humidity sensor (copy) into the original list so a diff of the fields can be performed
    this.getItemsOriginalCollection().unshift(newItemCopy);

    this.newItemEvent();
  }

  /**
   * The child class needs to define this to make an instance of itself.  It should call newViewModelItemCreator().
   */
  abstract newViewModelItem(): T;

  newViewModelItemCreator<T extends AbstractViewModel>(type: {new(): T ;}): T {
    return new type();
  }

  /**
   * Subclasses can create a comparator relevant for their data structures.  Reduce size in these by
   * using getDateInstalled(), getBeginPositionDate.
   *
   * @param obj1
   * @param obj2
   */
  abstract compare(obj1: AbstractViewModel, obj2: AbstractViewModel): number;

  /**
   * Use the Geodesy object defined comparator in compare() to sort the given collection inline.
   *
   * @param collection
   */
  private sortUsingComparator(collection: any[]) {
    collection.sort(this.compare);
  }

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

  getItemsCollection(): T[] {
    return this.itemProperties;
  }

  getItemsOriginalCollection(): T[] {
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
  private newItemEvent() {
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
   *     Helper methods
   *  ===============================================================
   */

  /**
   * Returns the date string (YYYY-MM-DD) from the date-time string (YYYY-MM-DDThh:mm:ssZ)
   */
  public getDate(datetime: string) {
    if (datetime === null || typeof datetime === 'undefined') {
      return '';
    } else if (datetime.length < 10) {
      return datetime;
    }
    return datetime.substring(0, 10);
  }
}
