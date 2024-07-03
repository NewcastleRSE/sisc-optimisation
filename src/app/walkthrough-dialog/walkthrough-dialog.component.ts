import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({

  selector: 'app-walkthrough-dialog',
  templateUrl: './walkthrough-dialog.component.html'
  // styleUrls: ['./walkthrough-dialog.component.scss']
})

export class WalkthroughDialogComponent implements OnInit{
  positionRelativeToElement;
  stepNumber;
  instructions;

  // which side of element to use as anchor for dialog.
  anchorSide;

  // flag for final step
  final;

  // highlighted element
  elementId;

  constructor(public dialogRef: MatDialogRef<WalkthroughDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public options: { positionRelativeToElement: any, stepNumber: any, instructions: any, anchorSide: any, final: any, elementId: any }) {

    this.positionRelativeToElement = options.positionRelativeToElement;
    this.stepNumber = options.stepNumber;
    this.instructions = options.instructions;
    this.anchorSide = options.anchorSide;
    this.final = options.final;
    this.elementId = options.elementId;
  }


  // https://stackoverflow.com/questions/58757670/angular-material-how-to-position-matdialog-relative-to-element

  ngOnInit() {
    const matDialogConfig = new MatDialogConfig();

    // const rect: DOMRect = this.positionRelativeToElement.nativeElement.getBoundingClientRect();
    if (this.anchorSide === 'left') {
      matDialogConfig.position = { left: this.positionRelativeToElement.right + 3 + 'px', top: this.positionRelativeToElement.top + 'px' };
    } else {
      // for some reason, the right position for elements is strange, so calculate based on left
      matDialogConfig.position = { right: (window.innerWidth - this.positionRelativeToElement.left) + 5 + 'px',
        top: this.positionRelativeToElement.top + 'px' };
    }


    // matDialogConfig.position = { right: `10px`, top: `${this.positionRelativeToElement.bottom + 2}px` };
    this.dialogRef.updatePosition(matDialogConfig.position);

  }

  endTutorial() {
    // close dialog and pass message to map component to leave tutorial
    this.removeBorderStyle();
   this.dialogRef.close('end');
  }

  nextStep(nextStep: number) {
    // close dialog and pass message to map component to open next step
    this.removeBorderStyle();
   this.dialogRef.close(nextStep);
  }

  removeBorderStyle() {
    const el = document.getElementById(this.elementId);
    // add border temporarily to element
    el.classList.remove('currentWalkthroughButton');
  }

}
