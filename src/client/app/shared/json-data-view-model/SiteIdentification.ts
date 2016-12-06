import {SiteLogModel} from './SiteLogDataModel';

export class SiteIdentification {

  /**
   * Translate DataModel Json from the GeodesyML, to ViewModel Json as used by the UI.
   *
   * @param siteLogDataModel
   */
  public static translateDataToView(siteLogDataModel: SiteLogModel): any {
    let siteIdentification: any = siteLogDataModel.siteIdentification;
    console.debug('translateDataToView - siteIdentification: ', siteIdentification);

    let translatedDataToView: any = {};
    translatedDataToView.fourCharacterID = siteIdentification.fourCharacterID;
    return translatedDataToView;
  }
}
