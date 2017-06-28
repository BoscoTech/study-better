/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FactDispComponent } from './fact-disp.component';

describe('FactDispComponent', () => {
  let component: FactDispComponent;
  let fixture: ComponentFixture<FactDispComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactDispComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
