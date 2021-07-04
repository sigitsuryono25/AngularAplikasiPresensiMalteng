import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDrawer } from '@angular/material/sidenav';
import funcs from '../utils/helper';
import { COOKIE_NAME_JABATAN, COOKIE_NAME_NAMA } from '../utils/constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {
  title = "Aplikasi Presensi Maluku";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  nama: any;
  jabatan: any;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.nama = funcs.getCookie(COOKIE_NAME_NAMA);
    this.jabatan = funcs.getCookie(COOKIE_NAME_JABATAN);
  }

  changeTitle(title: any, drawer: MatDrawer) {
    this.isHandset$.subscribe(
      res => {
        if (res) {
          drawer.close();
        }
      }
    )
    this.title = title;
  }
}
