import { Component, OnInit } from '@angular/core';
import { COOKIE_NAME_GOLONGAN, COOKIE_NAME_JABATAN, COOKIE_NAME_NAMA, COOKIE_NAME_NIP, COOKIE_NAME_PANGKAT } from '../utils/constants';
import funcs from '../utils/helper';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nama: any;
  nip: any;
  jabatan: any;
  pangkat: any;
  golongan: any;
  constructor() {
    this.nama = funcs.getCookie(COOKIE_NAME_NAMA);
    this.nip = funcs.getCookie(COOKIE_NAME_NIP);
    this.jabatan = funcs.getCookie(COOKIE_NAME_JABATAN);
    this.pangkat = funcs.getCookie(COOKIE_NAME_PANGKAT);
    this.golongan = funcs.getCookie(COOKIE_NAME_GOLONGAN);
  }

  ngOnInit(): void {
  }

}
