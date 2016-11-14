import { ReflectiveInjector } from '@angular/core';
// import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
import { JavascriptUtilsService } from './javascript-utils.service';

export function main() {
    describe('Javascript Utils Service', () => {
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

        it('should run checkObjectPathCreateEmpty check', () => {
            let x: any = javascriptUtilsService.checkObjectPathCreateEmpty(obj, 'a');
            expect(x).toEqual(false);
        });

        it('should run checkObjectPathCreateEmpty create', () => {
            let x: any = javascriptUtilsService.checkObjectPathCreateEmpty(obj, 'a.d');
            expect(x).toEqual(true);
        });
    });
}
