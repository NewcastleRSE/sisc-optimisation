import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneticAlgorithmResultsComponent} from './genetic-algorithm-results.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HighchartsChartModule} from 'highcharts-angular';
import {FormsModule} from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';


describe('GeneticAlgorithmResultsComponent', () => {
  let component: GeneticAlgorithmResultsComponent;
  let fixture: ComponentFixture<GeneticAlgorithmResultsComponent>;

  const query = {
    sensorNumber : 50,
    objective : ['Workers'],
    theta : 500,
    localAuthority : 'ncl',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneticAlgorithmResultsComponent ],
      imports: [
        MatExpansionModule,
        MatGridListModule,
        MatFormFieldModule,
        MatIconModule,
        HighchartsChartModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatInputModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MatDialog]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneticAlgorithmResultsComponent);
    component = fixture.componentInstance;

    // mock the query supplied by the parent
    // simulate the parent setting the input property with that query
    component.queryChoices = {
      sensorNumber: 30,
      objectives: ['Workers', 'Total Residents', 'Residents under 16', 'Residents over 65'],
      theta: 100,
      localAuthority: 'ncl'
    };

    // mock saved networks - 2 sensors, 4 output areas, 3 networks
    component.savedNetworks = {
      lad20cd: 'E08000021',
      objectives: ['pop_elderly', 'pop_children', 'pop_total', 'workplace'],
      theta: 100,
      n_sensors: 2,
      oa11cd: [
        'oa1', 'oa2', 'oa3', 'oa4'
      ],
      obj_coverage: [
        [0.0406389116464106, 0.017079542577855475, 0.020148076175111003, 0.012448594128341126],
        [0.012475145726175751, 0.010471754743422457, 0.025374390450538454, 0.30036682860444774],
        [0.03532085218035397, 0.0362633628833132, 0.026445686544701717, 0.009449665674120294]
      ],
      sensors: [
        [1, 2],
        [2, 3],
        [3, 1]
      ],
      oa_coverage: [
        [5.867749228794667e-05, 2.660011969271324e-05, 8.413728017956854e-11,  3.413728017956854e-11],
        [2.7842948994097768e-12, 4.6611338420146715e-05, 7.129266982567401e-08,  4.413728017956854e-11],
        [7.056637776643835e-09, 2.423693311021694e-08, 0.0007078496445894894,  5.413728017956854e-11],
        [2.448516893459125e-20, 1.1203976158246066e-09, 8.666956289952069e-07,  6.413728017956854e-11]
      ]
    };

    component.objectivesWithIndexes = [
      {text: 'obj1', objectiveIndex: 0, xAxisPosition: 0},
      {text: 'obj2', objectiveIndex: 1, xAxisPosition: 1},
      {text: 'obj3', objectiveIndex: 2, xAxisPosition: 2},
      {text: 'obj4', objectiveIndex: 3, xAxisPosition: 3}
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate filename correctly from input', () => {
  component.queryChoices = query;

  expect(component.generateFilenameFromQuery()).toBe('Newcastle/theta_500_nsensors_50.json');
  });

  it('should find index from array correctly', () => {

    expect(component.caseInsensitiveFindIndex(['pop_total', 'pop_children'], 'Total Residents')).toBe(0);
  });

  it('should correctly get OA Indices for a network', () => {
    expect(component.getOAIndicesForNetwork(1)).toEqual([2, 3]);
  });

  it('should correctly convert oa index to oa code', () => {
    expect(component.convertOAIndicesListToOACodeList([2,3], 1)).toEqual([{oa11cd: 'oa3', oaIndex: 2}, {oa11cd: 'oa4', oaIndex: 3}]);
  });

  it('should correctly create list of coverage and code for each OA in network', () => {
    expect(component.createOACoverageForNetwork( 1)).toEqual([{code: 'oa1', coverage: 2.7842948994097768e-12}, {code: 'oa2', coverage: 4.6611338420146715e-05}, {code: 'oa3', coverage: 7.129266982567401e-08}, {code: 'oa4', coverage: 4.413728017956854e-11}]);
  });
  // oa11cd: [
  //   'oa1', 'oa2', 'oa3', 'oa4'
  // ],
  //   obj_coverage: [
  //   [0.0406389116464106, 0.017079542577855475, 0.020148076175111003, 0.012448594128341126],
  //   [0.012475145726175751, 0.010471754743422457, 0.025374390450538454, 0.30036682860444774],
  //   [0.03532085218035397, 0.0362633628833132, 0.026445686544701717, 0.009449665674120294]
  // ],
  //   sensors: [
  //   [1, 2],
  //   [2, 3],
  //   [3, 4]
  // ],
  //   oa_coverage: [
  //   [5.867749228794667e-05, 2.660011969271324e-05, 8.413728017956854e-11,  3.413728017956854e-11],
  //   [2.7842948994097768e-12, 4.6611338420146715e-05, 7.129266982567401e-08,  4.413728017956854e-11],
  //   [7.056637776643835e-09, 2.423693311021694e-08, 0.0007078496445894894,  5.413728017956854e-11],
  //   [2.448516893459125e-20, 1.1203976158246066e-09, 8.666956289952069e-07,  6.413728017956854e-11]
  // ]

  it('should correctly create a series for each objective', () => {
    // objective 0
    // ylist = [0.0406389116464106, 0.012475145726175751, 0.03532085218035397]
    // data = [{x:1, y:0.0406389116464106, network: 0},{x:1, y: 0.012475145726175751, network: 1}, {x:1, y: 0.03532085218035397, network: 2}]
    //
    // objective 1
    // ylist = [0.017079542577855475, 0.010471754743422457, 0.0362633628833132]
    // objective 2
    // ylist = [0.020148076175111003, 0.025374390450538454,  0.026445686544701717]
    // objective 3
    // ylist = [ 0.012448594128341126, 0.30036682860444774, 0.009449665674120294]
    //

    const seriesList = [
      {
        type: 'scatter',
        name: 'obj1',
        data: [{x:0, y:0.0406389116464106, network: 0},{x:0, y: 0.012475145726175751, network: 1}, {x:0, y: 0.03532085218035397, network: 2}],
        color: 'rgb(47,126,216, 0.5)'
      },
      {
        type: 'scatter',
        name: 'obj2',
        data: [{x:1, y:0.017079542577855475, network: 0},{x:1, y: 0.010471754743422457, network: 1}, {x:1, y: 0.0362633628833132, network: 2}],
        color: 'rgb(47,126,216, 0.5)'
      },
      {
        type: 'scatter',
        name: 'obj3',
        data: [{x:2, y:0.020148076175111003, network: 0},{x:2, y: 0.025374390450538454, network: 1}, {x:2, y: 0.026445686544701717, network: 2}],
        color: 'rgb(47,126,216, 0.5)'
      },
      {
        type: 'scatter',
        name: 'obj4',
        data: [{x:3, y:0.012448594128341126, network: 0},{x:3, y: 0.30036682860444774, network: 1}, {x:3, y: 0.009449665674120294, network: 2}],
        color: 'rgb(47,126,216, 0.5)'
      },

    ]
    expect(component.createSeriesForChartOptions()).toEqual(seriesList);

  });

  it('should correctly get the series index for an objective', () => {
    expect(component.getSeriesIndexOfSeries('obj2')).toEqual(1);
  });

  it('should form message correctly when emitting network to view to parent component', () => {
    // watch emitting function
    spyOn(component.outputAreasToPlot, 'emit');

    // set the point a user has selected
    component.selectedPointId = 1;

    const outputAreas = [{oa11cd: 'oa3', oaIndex: 2}, {oa11cd: 'oa4', oaIndex: 3}];
    const coverage = [{code: 'oa1', coverage: 2.7842948994097768e-12}, {
      code: 'oa2',
      coverage: 4.6611338420146715e-05
    }, {code: 'oa3', coverage: 7.129266982567401e-08}, {code: 'oa4', coverage: 4.413728017956854e-11}]

    // mock user selected to view network by calling function
    component.viewNetworkOnMap();

    expect(component.outputAreasToPlot.emit).toHaveBeenCalledWith({
      theta: component.queryChoices.theta,
      outputAreas,
      coverage,
      localAuthority: 'ncl'
    });
  });

  it('should send message to parent to hide network when network is on', () => {
    spyOn(component.toggleNetwork, 'emit');

    // set current state as on
    component.networkToggleState = true;

    //mock user clicking toggle
    component.toggleNetworkFromMap({checked: false});

    expect(component.toggleNetwork.emit).toHaveBeenCalledWith('hide');
  });

  it('should send message to parent to show network when network is off', () => {
    spyOn(component.toggleNetwork, 'emit');

    // set current state as on
    component.networkToggleState = false;

    //mock user clicking toggle
    component.toggleNetworkFromMap({checked: true});

    expect(component.toggleNetwork.emit).toHaveBeenCalledWith('show');
  });

});


// return true if can load json
// return false if cannot load json



