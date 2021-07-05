import { Component, Input } from '@angular/core';
import detector from '../utils/faceDetector';
import funcs from '../utils/helper';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  image: any;
  /** Based on the screen size, switch from standard to one column per row */
  constructor() {
    this.image = document.getElementById("imgUpload");

    // contoh pemanggilan deteksi wajah
    // funcs.showLoadingData();
    // detector.detectWajah("imgUpload", ['199402252017071001']).then(x => {
    //   funcs.hideLoadingData();
    //   console.log(x);
    // });
  }


}
