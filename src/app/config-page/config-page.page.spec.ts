import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPagePage } from './config-page.page';

describe('ConfigPagePage', () => {
  let component: ConfigPagePage;
  let fixture: ComponentFixture<ConfigPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
