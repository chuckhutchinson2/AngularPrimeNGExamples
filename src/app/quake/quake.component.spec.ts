import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuakeComponent } from './quake.component';

describe('QuakeComponent', () => {
  let component: QuakeComponent;
  let fixture: ComponentFixture<QuakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
