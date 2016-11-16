import { Injectable } from '@angular/core';
@Injectable()
export class JavascriptUtilsService {
  /**
   * Given an object with maps and arrays, and a path of those maps and arrays confirm path exists or create with empty
   * object.  Return if created it (true) or it existed (false).
   *
   * @param obj with path eg. alpha = {a: {b: [fred, wilma, barney]}}
   * @param path in object structure - eg 'a.b.1' (array indices are .X)
   * @returns boolean - if created empty object (true) or it existed (false).
   */
  public ensureCreatePath(obj: any, path: string): boolean {
    if (! obj) {
      throw new Error('Object cant be empty');
    }
    if (! path || path.length() === 0) {
      throw new Error('Path cant be empty');
    }
    let accumulativePath: string = undefined;
    let lastPath: string = '';
    let anyExistingObj: any = undefined;
    let lastExistingObj: any;
    for (let p in path.split('.')) {
      if (accumulativePath) {
        accumulativePath += ',' + p;
      } else {
        accumulativePath = 'p';
      }
      let anyExistingObj = this.ensurePathExists(obj, accumulativePath);
      if (! anyExistingObj) {
        lastExistingObj[p] = {};
      } else {
        lastExistingObj = anyExistingObj;
      }
    }
    return !!!anyExistingObj;
  }

  /**
   * Given an object with maps and arrays, and a path of those maps and arrays confirm path exists and return found object
   * or undefined;

   * @param obj with path eg. alpha = {a: {b: [fred, wilma, barney]}}
   * @param path in object structure - eg 'a.b.1' (array indices are .X)
   * @returns {string} eg. 'wilma' or undefined if path doens't exist
   */
  public ensurePathExists(obj: any, path: string): any {
    let a: any = path.split('.').reduce(function (prev, curr) {
      return prev ? prev[curr] : undefined;
    }, obj || self);

    return a;
  }
}
