import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkService } from '../network/network.service';
import { COOKIE_NAME_GOLONGAN, COOKIE_NAME_JABATAN, COOKIE_NAME_NAMA, COOKIE_NAME_NIP, COOKIE_NAME_PANGKAT, EXPIRED_COOKIE } from '../utils/constants';
import funcs from '../utils/helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addressForm = this.fb.group({
    nip: [null, Validators.required],
    password: [null, Validators.required],
  });



  constructor(private fb: FormBuilder, private router: Router, private networkService: NetworkService) {
    // var checkCookie = funcs.getCookie(COOKIE_NAME);
    // if (checkCookie != '' || checkCookie != null || typeof (checkCookie) != 'undefined') {
    //   // this.router.navigateByUrl("/dashboard");
    // }
  }

  onSubmit(): void {
    // console.log(this.addressForm.get("nip")?.value);
    funcs.showLoadingData();
    var nip = this.addressForm.get("nip")?.value;
    var password = this.addressForm.get("password")?.value;
    var loggedInAs = "pegawai";
    var d = {
      nip: nip,
      password: password,
      login_as: loggedInAs
    };
    var url = "https://e-ukpbj.server4111.com/index.php/login-api";
    this.networkService.sendData(url, d)
      .subscribe(
        res => {
          funcs.hideLoadingData();
          funcs.setCookie(COOKIE_NAME_NIP, nip, EXPIRED_COOKIE);
          funcs.setCookie(COOKIE_NAME_NAMA, res.nama, EXPIRED_COOKIE);
          funcs.setCookie(COOKIE_NAME_JABATAN, res.jabatan, EXPIRED_COOKIE);
          funcs.setCookie(COOKIE_NAME_GOLONGAN, res.golongan, EXPIRED_COOKIE);
          funcs.setCookie(COOKIE_NAME_PANGKAT, res.pangkat, EXPIRED_COOKIE);
          location.assign("/");
        },
        error => {
          funcs.hideLoadingData()
          console.error(error);
        }
      )
    // if (nip != null) {
    //   funcs.setCookie(COOKIE_NAME_NIP, nip, EXPIRED_COOKIE);
    //   location.assign("/");
    // }

  }
}
