importScripts('node_modules/sw-toolbox/sw-toolbox.js');

declare let toolbox: any;
declare let renameCache: any;
declare let Response: any;

toolbox.debug = true;

toolbox.router.get('/(.*)', (request: any) => {
    console.log('sw get ' + request.url);
    return toolbox.cacheFirst(request);
}, {origin: 'https://dev.geodesy.ga.gov.au'});

toolbox.router.get('/serviceWorker/clearCache', (request: any) => {
    console.log('sw clear cache');
    toolbox.renameCache('released', toolbox.cache.name);
    return new Response('xx');
});

toolbox.router.get('/(.*)', (request: any) => {
    console.log('sw get ' + request.url);
    return toolbox.cacheFirst(request);
});

