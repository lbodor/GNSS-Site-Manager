import {SiteLogModel} from './SiteLogDataModel';

export class SiteLocation {

  /**
   * Translate DataModel Json from the GeodesyML, to ViewModel Json as used by the UI.
   *
   * @param siteLogDataModel
   */
  public static translateDataToView(siteLogDataModel: SiteLogModel): any {
    let siteLocation: any = siteLogDataModel.siteLocation;
    console.debug('translateDataToView - SiteLocation: ', siteLocation);

    let translatedDataToView: any = {};
    translatedDataToView.city = siteLocation.city;
    return translatedDataToView;
  }
}
