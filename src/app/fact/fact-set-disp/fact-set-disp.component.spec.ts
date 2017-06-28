/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FactSetDispComponent } from './fact-set-disp.component';

describe('FactSetDispComponent', () => {
  let component: FactSetDispComponent;
  let fixture: ComponentFixture<FactSetDispComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactSetDispComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactSetDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
