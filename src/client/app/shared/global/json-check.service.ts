import { Injectable } from '@angular/core';
import { MiscUtilsService } from './misc-utils.service';


export class Value {
  value: string;

  constructor() {
    this.value = '';
  }
}

export class Values {
  value: string[];

  constructor() {
    this.value = [''];
  }
}

export class CodeValue {
  codeListValue: string;
  value: string;

  constructor() {
    this.codeListValue = '';
    this.value = '';
  }
}

export class TimePeriod {
  beginPosition: Values = new Values();
  endPosition: Values = new Values();

  constructor() {
    this.beginPosition = new Values();
    this.endPosition = new Values();
  }
}

export class AbstractTimePrimitive {
  'gml:TimePeriod': TimePeriod = new TimePeriod();
}

export class ValidTime {
  abstractTimePrimitive: AbstractTimePrimitive;

  constructor() {
    this.abstractTimePrimitive = new AbstractTimePrimitive();
  }
}

export class ApproximatePositionITRF {
  elevationMEllips: number = 0;
  xCoordinateInMeters: number = 0;
  yCoordinateInMeters: number = 0;
  zCoordinateInMeters: number = 0;
}

export class GcoCharacterString {
  'gco:CharacterString': string = '';
}

export class CharacterString {
  characterString: GcoCharacterString = new GcoCharacterString();
}

export class CiAddress {
  deliveryPoint: CharacterString[] = [ new CharacterString() ];
  electronicMailAddress: CharacterString[] = [ new CharacterString() ];
  city: CharacterString = new CharacterString();
  administrativeArea: CharacterString = new CharacterString();
  postalCode: CharacterString = new CharacterString();
  country: CharacterString = new CharacterString();
}

export class Address {
  ciAddress: CiAddress = new CiAddress();
}

export class Phone {
  ciTelephone: CiTelephone = new CiTelephone();
}

export class CiTelephone {
  voice: CharacterString[] = [ new CharacterString() ];
  facsimile: CharacterString[] = [ new CharacterString() ];
}

export class CiContact {
  address: Address = new Address();
  contactInstructions: CharacterString = new CharacterString();
  hoursOfService: CharacterString = new CharacterString();
  onlineResource: CharacterString = new CharacterString();
  phone: Phone = new Phone();
}

export class ContactInfo {
  ciContact: CiContact = new CiContact();
}

export class SiteLog {
  siteIdentification: any = {};
  siteLocation: any = {};
  siteOwner: any = {};
  siteContact: any = {};
  siteMetadataCustodian: any = {};
  dataSource: any = {};
  gnssAntennas: any = {};
  gnssReceivers: any = {};
  frequencyStandards: any = {};
  humiditySensors: any = {};
  localEpisodicEventsSet: any = {};
};

export class SiteLocation {
  approximatePositionITRF: ApproximatePositionITRF = new ApproximatePositionITRF();
  city: string = '';
  state: string = '';
  countryCodeISO: string = '';
  notes: string = '';
  tectonicPlate: Value = new Value();
};

export class Contact {
  individualName: CharacterString = new CharacterString();
  organisationName: CharacterString = new CharacterString();
  positionName: CharacterString = new CharacterString();
  contactInfo: ContactInfo = new ContactInfo();
}

export class Receiver {
  receiverType: Value;
  manufacturerSerialNumber: string;
  serialNumber: string;
  firmwareVersion: string;
  satelliteSystem: CodeValue[];
  elevationCutoffSetting: string;
  temperatureStabilization: string;
  dateInstalled: Values;
  dateRemoved: Values;
  notes: string = '';

  constructor() {
    this.receiverType = new Value();
    this.manufacturerSerialNumber = '';
    this.serialNumber = '';
    this.firmwareVersion = '';
    this.satelliteSystem = [new CodeValue()];
    this.elevationCutoffSetting = '';
    this.temperatureStabilization = '';
    this.dateInstalled = new Values();
    this.dateRemoved = new Values();
    this.notes = '';
  }
}

export class Antenna {
  antennaType: CodeValue = new CodeValue();
  serialNumber: string = '';
  antennaReferencePoint: Value = new Value();
  markerArpUpEcc: string = '';
  markerArpNorthEcc: string = '';
  markerArpEastEcc: string = '';
  alignmentFromTrueNorth: string = '';
  antennaRadomeType: Value = new Value();
  radomeSerialNumber: string = '';
  antennaCableType: string = '';
  antennaCableLength: string = '';
  dateInstalled: Values = new Values();
  dateRemoved: Values = new Values();
  notes: string = '';
};

export class FrequencyStandard {
  standardType: Value;
  inputFrequency: string;
  validTime: ValidTime;
  notes: string;

  constructor() {
    this.standardType = new Value();
    this.inputFrequency = '';
    this.validTime = new ValidTime();
    this.notes = '';
  }
}

export class HumiditySensor {
  dataSamplingInterval: number = 0;
  accuracyPercentRelativeHumidity: number = 0;
  aspiration: string = '';
  notes: string = '';
  manufacturer: string = '';
  serialNumber: string = '';
  heightDiffToAntenna: number = 0;
  calibrationDate: Values = new Values();
  validTime: ValidTime = new ValidTime();
};

export class EpisodicEffect {
  event: string = '';
  validTime: ValidTime = new ValidTime();
};

/**
 * This service class maintains the definitions of all GeodesyML elements for web UI, and provides methods to ensure
 * the existence of all required parameters/paths in the input SiteLog JSON objects.
 */
@Injectable()
export class JsonCheckService {

  constructor(private utilsService: MiscUtilsService) {}

  public getValidSiteLog(json: any): any {
    let siteLogJson: any = this.convertObjectToJson(new SiteLog());
    this.mergeJsons(json, siteLogJson);
    return json;
  }

  public getValidSiteLocation(json: any): any {
    let siteLocationJson: any = this.convertObjectToJson(new SiteLocation());
    this.mergeJsons(json, siteLocationJson);
    return json;
  }

  public getNewSiteLocation(): any {
    return this.convertObjectToJson(new SiteLocation());
  }

  /**
   * Returns a valid JSON object for SiteContact or MetadataCustodian after adding missing paths
   */
   public getValidContact(json: any): any {
    let contactJson: any = this.convertObjectToJson(new Contact());
    this.mergeJsons(json, contactJson);
    return json;
  }

  /**
   * Returns a new empty JSON object for SiteContact or MetadataCustodian
   */
  public getNewContact(): any {
    return this.convertObjectToJson(new Contact());
  }

  public getValidReceiver(json: any): any {
    let receiverJson: any = this.convertObjectToJson(new Receiver());
    this.mergeJsons(json, receiverJson);
    return json;
  }

  public getNewReceiver(): any {
    return this.convertObjectToJson(new Receiver());
  }

  public getValidAntenna(json: any): any {
  let antennaJson: any = this.convertObjectToJson(new Antenna());
    this.mergeJsons(json, antennaJson);
    return json;
  }

  public getNewAntenna(): any {
    return this.convertObjectToJson(new Antenna());
  }

  public getValidFrequencyStandard(json: any): any {
    let fsJson: any = this.convertObjectToJson(new FrequencyStandard());
    this.mergeJsons(json, fsJson);
    return json;
  }

  public getNewFrequencyStandard(): any {
    return this.convertObjectToJson(new FrequencyStandard());
  }

  public getValidHumiditySensor(json: any): any {
  let humiditySensorJson: any = this.convertObjectToJson(new HumiditySensor());
    this.mergeJsons(json, humiditySensorJson);
    return json;
  }

  public getNewHumiditySensor(): any {
    return this.convertObjectToJson(new HumiditySensor());
  }

  public getValidEpisodicEffect(json: any): any {
    let episodicEffectJson: any = this.convertObjectToJson(new EpisodicEffect());
    this.mergeJsons(json, episodicEffectJson);
    return json;
  }

  public getNewEpisodicEffect(): any {
    return this.convertObjectToJson(new EpisodicEffect());
  }

  /**
   * mergeJsons two JSON objects by copying any missing paths from json2 to json1
   *
   * @param json1: a JSON object with valid values, but some of its mandatory paths/fields may be missing
   * @param json2: a JSON object contains all mandatory paths/fields for UI, but with null/empty values
   */
  public mergeJsons(json1: any, json2: any): void {
    if (!json1) {
      return;
    }
    let objType1: any = this.utilsService.getObjectType(json1);
    let objType2: any = this.utilsService.getObjectType(json2);
    if (objType2 === 'Object') {
      for (let attrName in json2) {
        if (json1.hasOwnProperty(attrName)) {
          this.mergeJsons(json1[attrName], json2[attrName]);
        } else {
          json1[attrName] = this.utilsService.cloneJsonObj(json2[attrName]);
        }
      }
    } else if (objType2 === 'Array' && json2.length > 0) {
      if (objType1 !== 'Array') {
        json1 = [];
      }

      if (json1.length === 0) {
        json1.push(this.utilsService.cloneJsonObj(json2[0]));
      } else {
        for (let i in json2) {
          if (json1.length <= i) {
            json1.push(this.utilsService.cloneJsonObj(json2[i]));
          } else {
            this.mergeJsons(json1[i], json2[i]);
          }
        }
      }
    }
  }

  /**
   * merge two JSON objects by recursively traversing through their internal structures
   * and copying any missing paths from json2 to json1
   *
   * @param json1: a JSON object with valid values, but some of its mandatory paths/fields may be missing
   * @param json2: a JSON object contains all mandatory paths/fields for UI, but with null/empty values
   */
  public mergeTypeToJson(json1: any, json2: any): void {
    if (!json1) {
      return;
    }
    let objType1: any = this.utilsService.getObjectType(json1);
    let objType2: any = this.utilsService.getObjectType(json2);
    if (objType2 === 'Object') {
      for (let attrName in json2) {
        if (json1.hasOwnProperty(attrName)) {
          this.mergeJsons(json1[attrName], json2[attrName]);
        } else {
          json1[attrName] = this.utilsService.cloneJsonObj(json2[attrName]);
        }
      }
    } else if (objType2 === 'Array' && json2.length > 0) {
      if (objType1 !== 'Array') {
        json1 = [];
      }

      if (json1.length === 0) {
        json1.push(this.utilsService.cloneJsonObj(json2[0]));
      } else {
        for (let i in json2) {
          if (json1.length <= i) {
            json1.push(this.utilsService.cloneJsonObj(json2[i]));
          } else {
            this.mergeJsons(json1[i], json2[i]);
          }
        }
      }
    }
  }

  /**
   * Convert a Typescript object to a JSON object
   *
   * @param obj: a Typescript object
   * @return a JSON object contains all fields and values fom the input object
   */
  public convertObjectToJson(obj: any): any {
    let descriptors: any;
    descriptors = Object.keys(obj).reduce((descriptor: any, key: string) => {
      descriptor[key] = Object.getOwnPropertyDescriptor(obj, key);
      return descriptor;
    }, {});

    // by default, Object.assign copies enumerable Symbols too
    Object.getOwnPropertySymbols(obj).forEach(symbol => {
      let descriptor: any = Object.getOwnPropertyDescriptor(obj, symbol);
      if (descriptor.enumerable) {
        descriptors[symbol] = descriptor;
      }
    });

    let json: any = {};
    Object.defineProperties(json, descriptors);
    return json;
  }
}
