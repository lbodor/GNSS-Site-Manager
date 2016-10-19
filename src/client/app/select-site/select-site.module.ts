import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SelectSiteComponent } from './select-site.component';

@NgModule({
  imports: [CommonModule, FormsModule, SimpleNotificationsModule],
  declarations: [SelectSiteComponent],
  exports: [SelectSiteComponent],
})
export class SelectSiteModule { }
