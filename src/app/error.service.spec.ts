import { TestBed } from '@angular/core/testing';
import * as Sentry from '@sentry/browser';
import { ErrorService } from './error.service';
import {environment} from '../environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        BrowserAnimationsModule
      ]
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init sentry if running in production mode', () => {
  // spy on sentry init function
    const initFunction = spyOn(service, 'initSentry');

    environment.production = true;
    service.handleError('error');

    expect(initFunction).toHaveBeenCalled();
  });

  it('should not init sentry if running in development mode', () => {
    // spy on sentry init function
    const initFunction = spyOn(service, 'initSentry');

    environment.production = false;
    service.handleError('error');

    expect(initFunction).not.toHaveBeenCalled();
  });

  it('should show snack bar error in production mode', () => {
    spyOn(service.snackBar, 'open');

    environment.production = true;
    service.handleError('error');

    expect(service.snackBar.open).toHaveBeenCalled();
    expect(service.snackBar.open).toHaveBeenCalledWith('An error occurred', 'Close', {
      duration: 3000
    });
  });

  it('should show snack bar error in development mode', () => {
    spyOn(service.snackBar, 'open');

    environment.production = false;
    service.handleError('error');

    expect(service.snackBar.open).toHaveBeenCalled();
    expect(service.snackBar.open).toHaveBeenCalledWith('An error occurred', 'Close', {
      duration: 3000
    });
  });

});



