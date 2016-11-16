import { ReflectiveInjector } from '@angular/core';
// import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
import { JavascriptUtilsService } from './javascript-utils.service';

export function main() {
  fdescribe('Javascript Utils Service', () => {
    let javascriptUtilsService: JavascriptUtilsService;
    let obj: any = {a: {b: {c: [1, 2]}}};

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        JavascriptUtilsService,
        // BaseRequestOptions,
        // MockBackend,
        // {
        //     provide: Http,
        //     useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
        //         return new Http(backend, defaultOptions);
        //     },
        //     deps: [MockBackend, BaseRequestOptions]
        // },
      ]);
      javascriptUtilsService = injector.get(JavascriptUtilsService);
    });

    it('should be defined', () => {
      expect(javascriptUtilsService).not.toBeUndefined();
    });

    fit('should run ensurePathExists and succeed', () => {
        let x: any = javascriptUtilsService.ensurePathExists(obj, 'a.b');
        expect(x).toBeDefined();
      });

    fit ('should run ensurePathExists and fail', () => {
        let x: any = javascriptUtilsService.ensurePathExists(obj, 'a.doestexist');
        expect(x).not.toBeDefined();
      });

    it('should run checkObjectPathCreateEmpty check', () => {
      let x: any = javascriptUtilsService.ensureCreatePath();  // todo fix
      expect(x).toEqual(false);
    });

    it('should run checkObjectPathCreateEmpty create', () => {
      let x: any = javascriptUtilsService.ensureCreatePath(obj, 'a.d');
      expect(x).toEqual(true);
    });
  });
}

// a.b.c.d
// a : {b: {c: { d: {}}}}

