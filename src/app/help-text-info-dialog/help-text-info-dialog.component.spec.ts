import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTextInfoDialogComponent } from './help-text-info-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {By} from '@angular/platform-browser';


describe('HelpTextInfoDialogComponent', () => {
  let component: HelpTextInfoDialogComponent;
  let fixture: ComponentFixture<HelpTextInfoDialogComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpTextInfoDialogComponent ],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {topic: 'dis'}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpTextInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should insert correct text in dialog when particular topic is chosen', () => {
    fixture.detectChanges();

    const text = '<h3>Disability</h3>';
  let innerTextContains = false;
    const title = fixture.debugElement.query(By.css('#dialog')).nativeElement;
    if(title.innerHTML.indexOf(text) !== -1) {
      innerTextContains = true;
    }

    expect(innerTextContains).toBeTrue();
});
});

