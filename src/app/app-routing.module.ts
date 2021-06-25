import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KehadiranComponent } from './kehadiran/kehadiran.component';
import { PresensiComponent } from './presensi/presensi.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path : "", redirectTo: "dashboard", pathMatch: "full"},
  { path: "dashboard", component: DashboardComponent },
  { path: "kehadiran", component: KehadiranComponent },
  { path: "profile", component: ProfileComponent },
  { path: "presensi", component: PresensiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
