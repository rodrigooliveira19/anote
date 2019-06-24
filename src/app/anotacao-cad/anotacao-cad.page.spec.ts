import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacaoCadPage } from './anotacao-cad.page';

describe('AnotacaoCadPage', () => {
  let component: AnotacaoCadPage;
  let fixture: ComponentFixture<AnotacaoCadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotacaoCadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotacaoCadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
