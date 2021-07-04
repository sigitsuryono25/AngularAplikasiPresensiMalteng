import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { CekJadwalComponent } from './cek-jadwal/cek-jadwal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KegiatanHarianComponent } from './kegiatan/kegiatan-harian.component';
import { KehadiranComponent } from './kehadiran/kehadiran.component';
import { LoginComponent } from './login/login.component';
import { PresensiComponent } from './presensi/presensi.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardGuard] },
  { path: "kehadiran", component: KehadiranComponent },
  { path: "profile", component: ProfileComponent },
  { path: "presensi", component: PresensiComponent, canActivate: [AuthGuardGuard] },
  { path: "login", component: LoginComponent },
  { path: "cek-jadwal", component: CekJadwalComponent },
  { path: "kegiatan-harian", component: KegiatanHarianComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
