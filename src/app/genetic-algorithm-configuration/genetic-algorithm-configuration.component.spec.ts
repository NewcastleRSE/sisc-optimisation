import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import { GeneticAlgorithmConfigurationComponent } from './genetic-algorithm-configuration.component';

import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatIconModule} from '@angular/material/icon';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {By} from '@angular/platform-browser';

let loader: HarnessLoader;

describe('GeneticAlgorithmConfigurationComponent', () => {
  let component: GeneticAlgorithmConfigurationComponent;
  let fixture: ComponentFixture<GeneticAlgorithmConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneticAlgorithmConfigurationComponent ],
      imports: [MatIconModule,
      MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(GeneticAlgorithmConfigurationComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneticAlgorithmConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();



  });

  afterEach(() => {
    // clean up after selected objective
    component.selectedObjectives = [];
    fixture.debugElement.nativeElement.querySelector('#Workers').className = '';
    fixture.debugElement.nativeElement.querySelector('#Workers').classList.add('geneticObjectiveCard');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not proceed and display error and not emit message if there are no objectives selected', () => {
    // spy on component emitting
    spyOn(component.queryDataToSubmit, 'emit');

    component.selectedObjectives = [];
    component.submitGeneticQuery();


    expect(component.queryDataToSubmit.emit).not.toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('#objectiveError'))).toBeDefined();
  });

  it('should not display error and emit message if objectives are selected', () => {
    // spy on component emitting
    spyOn(component.queryDataToSubmit, 'emit');

    component.selectedObjectives = ['Total Residents'];
    component.submitGeneticQuery();

    expect(component.queryDataToSubmit.emit).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('#objectiveError'))).toBeNull();
  });

  it('should emit message with correct contents', () => {
    // spy on component emitting
    spyOn(component.queryDataToSubmit, 'emit');

    component.selectedObjectives = ['Total Residents'];
    component.sensorNumber = 60;
    component.theta = 500;
    component.submitGeneticQuery();

    expect(component.queryDataToSubmit.emit).toHaveBeenCalledWith({sensorNumber: 60, objectives: ['Total Residents'], acceptableCoverage: 500});
  });

  it('should remove objective from list and turn off background when clicking on selected objective', fakeAsync(()  => {
    // setup as if workers has already been selected
    const objective = fixture.debugElement.nativeElement.querySelector('#Workers');
    objective.click();


    objective.click();

    fixture.detectChanges();

    expect(component.selectedObjectives).toEqual([]);
    // change background of objective card by checking class has been removed
    expect(fixture.debugElement.nativeElement.querySelector('#Workers')).not.toHaveClass('objectiveCardSelected');
  }));

  it('should add objective to list and turn on background when clicking on unselected objective', fakeAsync(()  => {
    component.selectedObjectives = [];
    console.log(fixture.debugElement.nativeElement.querySelector('.geneticObjectiveCard'))
    const objective = fixture.debugElement.nativeElement.querySelector('.geneticObjectiveCard');
    fixture.detectChanges();
    console.log('before click')
    console.log(objective)
    objective.click();
    console.log('after click')
    console.log(objective)

    fixture.detectChanges();
    console.log('after changes')
    console.log(objective)


    // add id to list
    expect(component.selectedObjectives).toEqual(['Total Residents']);
    // change background of objective card by checking class has been added
    console.log('should e there')
    // console.log(fixture.debugElement.nativeElement.querySelector('#Residents over 65').classList);
     expect(objective).toHaveClass('objectiveCardSelected');
    flush();
  }));






  // when click on sensor turns on and turns others off
  // when click on theta turns on and turns others off


});
