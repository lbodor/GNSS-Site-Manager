import { Injectable } from '@angular/core';

@Injectable()
// TODO - these should all be statics
export class MiscUtilsService {

  private _scrollIntoView: any = require('scroll-into-view');

  /**
   * Get present date and time string in format of "yyyy-mm-ddThh:mm:ss.sssZ"
   */
  public getPresentDateTime() {
    return new Date().toISOString();
  }

  /**
   * Clone a JSON object from existing one so that both have no reference
   */
  public cloneJsonObj(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Return the type of the object obj
   */
  public getObjectType(obj: any): string {
    if (typeof obj === 'undefined') {
      return 'undefined';
    } else if (obj === null) {
      return null;
    }
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
  }

  /**
   * Scroll the element clicked into full-view on the page and return a flag for switching block open/hide option.
   */
  public scrollIntoView(event: any, isBlockOpen: boolean): boolean {
    isBlockOpen = !isBlockOpen;
    if(isBlockOpen && event && event.target) {
      this.smoothScrollTo(event.target);
    }

    return isBlockOpen;
  }

  /**
   * Scroll the element clicked into full-view on the page.
   */
  public showFullView(event: any) {
    event.preventDefault();
    if(event && event.target) {
      this.smoothScrollTo(event.target);
    }
  }

  /**
   * Scroll the element defined by Id into full-view on the page.
   */
  public showElemById(id: string) {
    let elem: any = document.getElementById(id);
    if (elem !== null) {
      this.smoothScrollTo(elem);
    }
  }

  /**
   * Smoothly scroll the element elem into full-view on the page for FF, Chrome, Opera and Safari. Note that it dose not
   * work in IE at all, so we have to use scrollIntoView() function instead (not smooth).
   */
  public smoothScrollTo(elem: any): void {
    if (elem === null) {
      return;
    } else if(navigator.userAgent.indexOf('MSIE') !== -1 || !!navigator.userAgent.match(/Trident\/7\./)) {
      setTimeout(function() {
        elem.scrollIntoView( {behavior: 'smooth'} );
      }, 500);
    } else {
      let _settings: any = {time: 1000, align: {top: 0, left: 0}};
      this._scrollIntoView(elem, _settings);
    }
  }
}
