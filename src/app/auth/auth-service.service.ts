import { Injectable } from '@angular/core';
import { COOKIE_NAME_NIP } from '../utils/constants';
import funcs from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn = false
  constructor() {
    var nip = funcs.getCookie(COOKIE_NAME_NIP);
    if(nip == '' || nip == null || typeof(nip) == 'undefined'){
      this.isLoggedIn = false
    }else{
      this.isLoggedIn = true;
    }
  }
}
