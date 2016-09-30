
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then((reg: ServiceWorkerRegistration) => {
    console.log(reg);
  }).catch(function (error) {
    console.log(error);
  });
} else {
  console.log('Service worker not supported');
}
