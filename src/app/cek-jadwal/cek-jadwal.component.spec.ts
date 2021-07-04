import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CekJadwalComponent } from './cek-jadwal.component';

describe('CekJadwalComponent', () => {
  let component: CekJadwalComponent;
  let fixture: ComponentFixture<CekJadwalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CekJadwalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CekJadwalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
