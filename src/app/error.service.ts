import {ErrorHandler, Injectable} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler{

  constructor(public snackBar: MatSnackBar) { }

  handleError(error: any) {
    // if (environment.production) {
    //   this.initSentry();
    // }
    console.log(error);

    // show snack bar to user
    if (error) {
      this.openSnackBar('An error occurred');
    }

  }

  // initSentry() {
  //   Sentry.init({
  //     dsn: "https://b2a81dbd8e814f5fa75ec88dfebc9182@o1080315.ingest.sentry.io/6102346",
  //     // @ts-ignore
  //     environment: 'production'
  //   });
  // }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }
}
