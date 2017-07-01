/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JaxComponent } from './jax.component';

describe('JaxComponent', () => {
  let component: JaxComponent;
  let fixture: ComponentFixture<JaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
