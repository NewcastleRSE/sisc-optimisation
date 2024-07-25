import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { HelpTextInfoDialogComponent } from './help-text-info-dialog/help-text-info-dialog.component';
import { WalkthroughDialogComponent } from './walkthrough-dialog/walkthrough-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { ErrorService } from './error.service';
import {MatCardModule} from '@angular/material/card';
import {HighchartsChartModule} from 'highcharts-angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MapComponent } from './map/map.component';
import { GeneticAlgorithmConfigurationComponent } from './genetic-algorithm-configuration/genetic-algorithm-configuration.component';
import { GeneticAlgorithmResultsComponent } from './genetic-algorithm-results/genetic-algorithm-results.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    WalkthroughDialogComponent,
    InfoDialogComponent,
    HelpTextInfoDialogComponent,
    GeneticAlgorithmConfigurationComponent,
    GeneticAlgorithmResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    HighchartsChartModule,
    LeafletModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    LeafletModule,
    FontAwesomeModule
  ],
  providers: [MatIconRegistry,
    {provide: ErrorHandler, useClass: ErrorService}],
  bootstrap: [AppComponent],
  entryComponents: [InfoDialogComponent, HelpTextInfoDialogComponent,  WalkthroughDialogComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
  constructor(
    public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
 }
