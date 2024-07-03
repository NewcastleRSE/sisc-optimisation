import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WalkthroughDialogComponent} from "./walkthrough-dialog/walkthrough-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class WalkthroughDialogService {


  constructor(public dialog: MatDialog) {

  }

  public openDialog({ positionRelativeToElement,
                      hasBackdrop = false, stepNumber = 1, instructions = 'test', anchorSide, final, elementId}:
                      {
                        positionRelativeToElement: any, hasBackdrop: boolean, stepNumber: any, instructions: any, anchorSide: any, final: any, elementId: any
                      }): MatDialogRef<WalkthroughDialogComponent> {

    // set max height to ensure dialog won't go off bottom of screen
    const windowHeight = window.innerHeight;
    const maxHeight = windowHeight - positionRelativeToElement.top;


    const dialog = this.dialog.open(WalkthroughDialogComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      // height,
      width: '290px',
      data: {positionRelativeToElement, stepNumber, instructions, anchorSide, final, elementId},
      panelClass: 'tutorialDialog',
      disableClose: false,
      maxHeight
    });



    return dialog;

  }


}
