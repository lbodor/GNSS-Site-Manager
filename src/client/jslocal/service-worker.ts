importScripts('node_modules/sw-toolbox/sw-toolbox.js');

declare let toolbox: any;
declare let Response: any;

toolbox.debug = true;

toolbox.router.get('/(.*)', (request: any, response: any) => {
    console.log('sw get ' + request.url);
    return toolbox.cacheFirst(request, response);
}, {origin: 'https://dev.geodesy.ga.gov.au'});

toolbox.router.get('/clearCache', (request: any, response: any) => {
    console.log('sw clear cache');
    toolbox.helper.renameCache('foo', toolbox.cache.name);
    return new Response('');
});

toolbox.router.get('/(.*)', (request: any, response: any) => {
    console.log('sw get ' + request.url);
    return toolbox.cacheFirst(request, response);
});
