import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrensferContactComponent } from './trensfer-contact.component';

describe('TrensferContactComponent', () => {
  let component: TrensferContactComponent;
  let fixture: ComponentFixture<TrensferContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrensferContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrensferContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
