/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NomQuizComponent } from './nom-quiz.component';

describe('NomQuizComponent', () => {
  let component: NomQuizComponent;
  let fixture: ComponentFixture<NomQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
