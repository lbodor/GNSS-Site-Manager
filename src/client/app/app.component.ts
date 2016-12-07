import { Component, ViewContainerRef } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Config, CorsSiteService, CorsSetupService, SiteLogService, DialogService, MiscUtilsService,
          JsonDiffService, JsonCheckService, JsonPointerService, NameListService, ServiceWorkerService,
          JsonixService } from './shared/index';
import { SiteInfoComponent } from './site-info/site-info.component';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, SelectSiteComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [
    CorsSiteService,
    CorsSetupService,
    DialogService,
    MiscUtilsService,
    JsonixService,
    NameListService,
    ServiceWorkerService,
    SiteLogService,
    SiteInfoComponent,
    JsonDiffService,
    JsonCheckService,
    JsonPointerService,
  ],
  templateUrl: 'app.component.html',
})

export class AppComponent {

  public toastNotificationsOptions: any = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'scale',
    position: ['right', 'bottom']
  };

constructor(private siteInfo: SiteInfoComponent,
		  private viewContainerRef: ViewContainerRef,
		  private notificationsService: NotificationsService) {
    console.log('Environment config', Config);

  }

  /**
   * Invoke the save() method of SiteInfo component triggered by the "Save" button on Toolbar component
   *
   * @event: boolean - true if the selected siteId is not null
   */
  onSave(event: any) {
    if (event) {
      this.siteInfo.save(null);
    }
  }

  /**
   * Invoke the loadSiteInfoData() method of SiteInfo c triggered by the "Revert" button on Toolbar component
   *
   * @event: boolean - true if the selected siteId is not null
   */
  onRevert(event: any) {
    if (event) {
      this.siteInfo.loadSiteInfoData();
    }
  }

  /**
   * Invoke the goBack() method of SiteInfo component triggered by the "Close" button on Toolbar component
   *
   * @event: boolean - true if the selected siteId is not null
   */
  onClose(event: any) {
    if (event) {
      this.siteInfo.goBack();
    }
  }

  onActivate(event: any) {
    this.siteInfo = event;
  }
}
