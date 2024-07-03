import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HelpTextInfoDialogComponent} from '../help-text-info-dialog/help-text-info-dialog.component';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-genetic-algorithm-configuration',
  templateUrl: './genetic-algorithm-configuration.component.html',
  styleUrls: ['./genetic-algorithm-configuration.component.css']
})
export class GeneticAlgorithmConfigurationComponent implements OnInit {

  geneticObjectives = [
    {text: 'Total Residents', id:'Total Residents'},
    {text: 'Workers', id: 'Workers'},
    {text: 'Residents under 16', id: 'Residents under 16'},
    {text: 'Residents over 65', id: 'Residents over 65'}
    // {text: 'Traffic', id: 'traffic'}
  ];
  selectedObjectives: any[];
  sensorNumbersAvailable = [10, 20, 30, 40, 50, 60, 70,  80, 90, 100];
  sensorNumber: number;
  thetaNumbersAvailable = [100, 250, 500];
  theta: number;

  // error message flag for objectives
  objectiveNotChosen: boolean ;

  @Output() queryDataToSubmit = new EventEmitter();

  // use view child to access expansion panel open and close methods
  @ViewChild('expansionPanel') expansionPanel: MatExpansionPanel;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.sensorNumber = 50;
    this.theta = 250;
    this.selectedObjectives = [];

  }

  // mark objective card as selected/unselected and add/remove id to list ready to submit
  toggleGeneticObjective(id: string) {
    if (this.selectedObjectives.includes(id)) {
      // card is already selected so turn off and update styling
      this.selectedObjectives = this.selectedObjectives.filter((item: any) => item !== id);
      document.getElementById(id).classList.remove('objectiveCardSelected');
    } else {
      // card is not already selected so turn on and update styling
      this.selectedObjectives.push(id);
      document.getElementById(id).classList.add('objectiveCardSelected');

      // turn off error message if showing
      this.objectiveNotChosen = false;
    }
    
  }

  // check is objective is selected
  objIsSelected(id: any) {
    return this.selectedObjectives.includes(id);
  }


  submitGeneticQuery() {
    console.log(this.sensorNumber)
    console.log(this.theta)
    if (this.selectedObjectives.length === 0) {
      // error as have to select at least one objective
      this.objectiveNotChosen  = true;
    } else {
      // send selections back to parent map component

      this.queryDataToSubmit.emit({sensorNumber: this.sensorNumber, objectives: this.selectedObjectives, acceptableCoverage: this.theta})
    }

  }

  // help dialog
 openInfo(topic: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '450px';
    dialogConfig.data = {
      topic
    };

    const dialogRef = this.matDialog.open(HelpTextInfoDialogComponent, dialogConfig);
  }

  closeExpansionPanel() {
    this.expansionPanel.close();
  }
  openExpansionPanel() {
    this.expansionPanel.open();
  }


}
