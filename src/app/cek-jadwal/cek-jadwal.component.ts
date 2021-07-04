import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../network/network.service';
import { COOKIE_NAME_NIP } from '../utils/constants';
import funcs from '../utils/helper';

@Component({
  selector: 'app-cek-jadwal',
  templateUrl: './cek-jadwal.component.html',
  styleUrls: ['./cek-jadwal.component.css']
})
export class CekJadwalComponent implements OnInit {

  dataJadwal: any = [];
  nip: any;

  constructor(private service: NetworkService) {
    this.nip = funcs.getCookie(COOKIE_NAME_NIP);
  }

  ngOnInit(): void {
    this.getJadwalAnda();
  }
  getJadwalAnda() {
    funcs.showLoadingData();
    const uri = environment.baseUrlDebug + "jadwal-anda?nip=" + this.nip;
    this.service.getData(uri)
      .subscribe(
        res => {
          funcs.hideLoadingData();
          this.dataJadwal = res.rows;
        },
        error => {
          alert('something wrong');
          console.error(error);
          funcs.hideLoadingData();
        }
      )
  }

}
