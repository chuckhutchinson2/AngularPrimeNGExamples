import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { USStatesComponent } from './usstates.component';

describe('USStatesComponent', () => {
  let component: USStatesComponent;
  let fixture: ComponentFixture<USStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ USStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
