import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { GalleriaModule } from 'primeng/galleria';
import { GMapModule } from 'primeng/gmap';
import { DropdownModule } from 'primeng/dropdown';

import { GetIPAddressService}  from "./services/get-ipaddress.service";
import { USStateService}  from "./services/usstate.service";
import { USGSEarthquakeService } from "./services/usgsearthquake.service";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    HttpClientModule,
    PanelModule,
    TabViewModule,
    ChartModule,
    SidebarModule,
    ButtonModule,
    CalendarModule,
    OverlayPanelModule,
    TooltipModule,
    GalleriaModule,
    GMapModule,
    DropdownModule
  ],
  providers: [
    GetIPAddressService, 
    USStateService,
    USGSEarthquakeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
