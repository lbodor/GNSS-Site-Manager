// Load our SystemJS configuration.
System.config({
  baseURL: '/base/',
  map: {
      'moment': 'moment/moment',
      'ng2-bootstrap': 'ng2-bootstrap/ng2-bootstrap',

      'angular2-notifications': 'node_modules/angular2-notifications',
      // 'angular2-notifications.js': 'component.js',



      // '/base/node_modules/node_modules/angular2-notifications.js': 'angular2-notifications/components.js',
      // 'node_modules/node_modules/angular2-notifications.js': 'angular2-notifications/components.js',
      // 'base/node_modules/angular2-notifications.js': 'angular2-notifications/components.js',
      // 'node_modules/angular2-notifications.js': 'angular2-notifications/components.js',
      // 'angular2-notifications.js': 'angular2-notifications/components.js',
  },
    packages: {
        'angular2-notifications': {
            main: 'components.js',
            defaultExtension: 'js'
        }
    }
});

