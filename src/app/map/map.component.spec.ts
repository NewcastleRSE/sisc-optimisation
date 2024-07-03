import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MapComponent} from './map.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';;
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SpinnerOverlayComponent} from '../spinner-overlay/spinner-overlay.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {By} from '@angular/platform-browser';
import {WalkthroughDialogComponent} from '../walkthrough-dialog/walkthrough-dialog.component';


// todo return to original position if move to occupied
// todo testing if move to new OA if OA is not occupied
// test findmtahcing OA
describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  // spy on child components
  const geneticResults = jasmine.createSpyObj('GeneticResults', [
    'createGraph',
    'closeExpansionPanel'
  ]);

  const geneticConfig = jasmine.createSpyObj('GeneticConfig', [
    'closeExpansionPanel'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
       MapComponent,
        SpinnerOverlayComponent,
        WalkthroughDialogComponent
      ],
      imports: [
        MatIconModule,
        MatMenuModule,
        LeafletModule,
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [SpinnerOverlayComponent, WalkthroughDialogComponent]}})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // set child component to use
    component.geneticResults = geneticResults;
    component.geneticConfig = geneticConfig;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly call function in child component when query is submitted', () => {
    // query
    const query = {sensorNumber: 5, objectives: [1,2], acceptableCoverage: 0.3, localAuthority: 'ncl'};
    component.submitGeneticQuery(query);

    expect(component.geneticResults.createGraph).toHaveBeenCalled();
    expect(component.geneticResults.createGraph).toHaveBeenCalledWith({sensorNumber: 5, objectives: [1,2], theta: 0.3, localAuthority: 'ncl'});

  });

  it('should be able to identify output area that matches code', () =>{
    // create parameters
    const data = {localAuthority: 'ncl'};
    component.centroidsNcl = [
      {oa11cd : 'a'},
      {oa11cd : 'b'},
      {oa11cd : 'c'},
    ];

    const result = component.findMatchingOA({oa11cd: 'b'});

    expect(result).toEqual({oa11cd: 'b'});
  });

  it('should correctly transform British National Grid to World Map projections', () => {
    const expected = [49.767304732605055, -7.55695976676328];

    expect(component.convertFromBNGProjection(18.5, 54.2)).toEqual(expected);
  });

  it('should be able to get OA for a given centroid', () => {
    component.centroidsNcl = [
      {
        latlng: {lat: 54.976692, lng: -1.602338},
        oa11cd: "E00042673"
      },
      {
        latlng: {lat: 54.966545, lng: -1.545497},
        oa11cd: "E00042751"
      },
      {
        latlng: {lat: 54.977311, lng: -1.554943},
        oa11cd: "E00042801"
      }
    ];

    component.centroidsGates = [
      {
        latlng: {lat: 54.976692, lng: -1.782338},
        oa11cd: "E00042677"
      },
      {
        latlng: {lat: 54.966545, lng: -1.785497},
        oa11cd: "E00042758"
      },
      {
        latlng: {lat: 54.977311, lng: -1.574943},
        oa11cd: "E00042809"
      }
    ];

    const expected = {
      latlng: {lat: 54.976692, lng: -1.602338},
      oa11cd: "E00042673"
    }

    expect(component.getOAFromCentroid([54.976692, -1.602338])).toEqual(expected);

  });

  it('should return undefined if trying to get OA from incorrect centroid', () => {
    component.centroidsNcl = [
      {
        latlng: {lat: 54.976692, lng: -1.602338},
        oa11cd: "E00042673"
      },
      {
        latlng: {lat: 54.966545, lng: -1.545497},
        oa11cd: "E00042751"
      },
      {
        latlng: {lat: 54.977311, lng: -1.554943},
        oa11cd: "E00042801"
      }
    ];

    component.centroidsGates = [
      {
        latlng: {lat: 54.976692, lng: -1.782338},
        oa11cd: "E00042677"
      },
      {
        latlng: {lat: 54.966545, lng: -1.785497},
        oa11cd: "E00042758"
      },
      {
        latlng: {lat: 54.977311, lng: -1.574943},
        oa11cd: "E00042809"
      }
    ];

    expect(component.getOAFromCentroid([54.976692, -1.602378])).toEqual(undefined);

  });

  it('should return false if centroid is not free', () => {
    component.occupiedOAs = [
      {oa11cd: "E00042809"},
      {oa11cd: "E00042810"},
      {oa11cd: "E00042811"},
      {oa11cd: "E00042812"}
    ];

    expect(component.isCentroidFree("E00042809")).toEqual(false);

  });

  it('should return true if centroid is free', () => {
    component.occupiedOAs = [
      {oa11cd: "E00042809"},
      {oa11cd: "E00042810"},
      {oa11cd: "E00042811"},
      {oa11cd: "E00042812"}
    ];

    expect(component.isCentroidFree("E00052809")).toEqual(true);

  });


});






