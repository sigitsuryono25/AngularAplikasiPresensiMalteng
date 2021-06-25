import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresensiComponent } from './presensi.component';

describe('PresensiComponent', () => {
  let component: PresensiComponent;
  let fixture: ComponentFixture<PresensiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresensiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresensiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
