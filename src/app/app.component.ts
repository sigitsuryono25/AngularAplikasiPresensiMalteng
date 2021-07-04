import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { COOKIE_NAME_NIP } from './utils/constants';
import funcs from './utils/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aplikasi Presensi Maluku';
  isLoggedIn: boolean = false;
  constructor(private route: Router) {
    // funcs.setCookie("presensi-nip", "199402252017071001", 2);
    var nip = funcs.getCookie(COOKIE_NAME_NIP);
    if (nip == '' || nip == null || typeof (nip) == "undefined") {
      // location.reload();
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
    // alert(this.nip);
  }
}
