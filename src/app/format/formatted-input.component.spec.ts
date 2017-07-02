/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JaxInputComponent } from './jax-input.component';

describe('JaxInputComponent', () => {
  let component: JaxInputComponent;
  let fixture: ComponentFixture<JaxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JaxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JaxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
