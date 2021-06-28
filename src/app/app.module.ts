import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { KehadiranComponent } from './kehadiran/kehadiran.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './profile/profile.component';
import { PresensiComponent } from './presensi/presensi.component';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    KehadiranComponent,
    ProfileComponent,
    PresensiComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatExpansionModule,
    HttpClientModule,
    MatFormFieldModule,
    WebcamModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatRadioModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    // NgxFaceApiJsModule.forRoot({
    //   modelsUrl: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights',
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
