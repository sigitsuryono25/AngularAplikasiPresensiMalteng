import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../network/network.service';
import { COOKIE_NAME_NIP } from '../utils/constants';
import funcs from '../utils/helper';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  image: any;
  hasWajah: any;
  /** Based on the screen size, switch from standard to one column per row */
  constructor(private service: NetworkService) {
    // this.image = document.getElementById("imgUpload");
    this.getWajah();
    // contoh pemanggilan deteksi wajah
    // funcs.showLoadingData();
    // detector.detectWajah("imgUpload", ['199402252017071001']).then(x => {
    //   funcs.hideLoadingData();
    //   console.log(x);
    // });

  }

  getWajah() {
    const urlWajah = environment.baseUrlDebug + "get-wajah?nip=" + funcs.getCookie(COOKIE_NAME_NIP);
    this.service.getData(urlWajah)
      .subscribe(
        res => {
          if (res.code == 200) {
            this.hasWajah = true;
          }
        },
        err => {
          console.error(err);
        }
      )
  }
}
