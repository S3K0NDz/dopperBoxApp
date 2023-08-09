import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoppersComponent } from './doppers.component';

describe('DoppersComponent', () => {
  let component: DoppersComponent;
  let fixture: ComponentFixture<DoppersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoppersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoppersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
