import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KehadiranComponent } from './kehadiran/kehadiran.component';
import { LoginComponent } from './login/login.component';
import { PresensiComponent } from './presensi/presensi.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path : "", redirectTo: "dashboard", pathMatch: "full"},
  { path: "dashboard", component: DashboardComponent },
  { path: "kehadiran", component: KehadiranComponent },
  { path: "profile", component: ProfileComponent },
  { path: "presensi", component: PresensiComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
