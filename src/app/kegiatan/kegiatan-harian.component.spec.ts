import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegiatanHarianComponent } from './kegiatan-harian.component';

describe('KegiatanHarianComponent', () => {
  let component: KegiatanHarianComponent;
  let fixture: ComponentFixture<KegiatanHarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KegiatanHarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegiatanHarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
