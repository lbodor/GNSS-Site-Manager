import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


declare let XLink_1_0: any;
declare let GML_3_2_1: any;
declare let ISO19139_GMD_20070417: any;
declare let ISO19139_GCO_20070417: any;
declare let ISO19139_GSR_20070417: any;
declare let ISO19139_GTS_20070417: any;
declare let ISO19139_GSS_20070417: any;
declare let OM_2_0: any;
// declare let Filter_1_1_0: any;
declare let GEODESYML_0_3: any;
declare let Jsonix: any;
declare let Filter_2_0: any;
declare let OWS_1_1_0: any;
declare let WFS_2_0: any;

let jsonIxMappings: any = [ XLink_1_0, GML_3_2_1, GEODESYML_0_3, ISO19139_GMD_20070417, ISO19139_GCO_20070417,
                            OM_2_0, ISO19139_GSR_20070417, ISO19139_GTS_20070417, ISO19139_GSS_20070417, Filter_2_0, OWS_1_1_0, WFS_2_0,  ];

let jsonIxOptions: any = {
  mappingStyle: 'simplified',
  namespacePrefixes: {
    'http://www.opengis.net/cat/csw/2.0.2': 'csw',
    'urn:xml-gov-au:icsm:egeodesy:0.3': 'geo',
    'http://www.opengis.net/gml/3.2': 'gml',
    'http://www.w3.org/1999/xlink': 'ns9',
    'http://www.isotc211.org/2005/gmd': 'gmd',
    'http://www.isotc211.org/2005/gmx': 'gmx',
    'http://www.opengis.net/om/2.0': 'om',
    'http://www.isotc211.org/2005/gco': 'gco',
    'http://www.w3.org/2001/XMLSchema-instance': 'xsi',
    'http://www.opengis.net/wfs/2.0': 'wfs',
    'http://www.opengis.net/fes/2.0': 'fes'
  }
};
let context: any = new Jsonix.Context(jsonIxMappings, jsonIxOptions);
let unmarshaller: any = context.createUnmarshaller();
let marshaller: any = context.createMarshaller();

/**
 * This class provides the service to transfer data in GeodesyML format to and from the back end services, and translate to
 * work with JSON on the client side.
 */
@Injectable()
export class JsonixService {
  /**
   * Given valid GeodesyML instatnce, translate to JSON.
   *
   * @param geodesyMl valid input to translate
   * @return The  JSON representation of the given geodesyMl
   */
  geodesyMLToJson(geodesyMl: string): string {
    console.debug('JsonixService - geodesyMLToJson - geodesyMl (length): ', geodesyMl.length);
    // console.debug('JsonixService - geodesyMLToJson - geodesyMl: ', geodesyMl);

    let json: string = unmarshaller.unmarshalString(geodesyMl);
    // console.debug('JsonixService - geodesyMLToJson - translated JSON: ', json);
    console.debug('JsonixService - geodesyMLToJson - translated JSON (length): ', JSON.stringify(json).length);
    return json;
  };

  /**
   * Given 'valid' JSON insance, translate to valid GeodesyMl.  The json input can either be a string or an object.
   * @param json that is 'valid' to translate
   * @returns {string} the valid GeodesyMl
   */
  jsonToGeodesyML(json: string): string {
      let jsonSObj: string = '';

      // Ensure JSON is an object
      if (json !== null && typeof json === 'object') {
          jsonSObj = json;
      } else {
          jsonSObj = JSON.parse(json);
      }
      // console.debug('JsonixService - jsonToGeodesyML - json (length): ', jsonSObj.length);
      console.debug('JsonixService - jsonToGeodesyML - json: ', jsonSObj);

      let geodesyMl: string = marshaller.marshalString(jsonSObj);
      // console.log('JsonixService - jsonToGeodesyML - translated geodesyMl: ', geodesyMl);
      console.log('JsonixService - jsonToGeodesyML - translated geodesyMl (length): ', geodesyMl.length);
      return geodesyMl;
  }
}
