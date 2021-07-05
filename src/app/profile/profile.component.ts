import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../network/network.service';
import { COOKIE_NAME_GOLONGAN, COOKIE_NAME_JABATAN, COOKIE_NAME_NAMA, COOKIE_NAME_NIP, COOKIE_NAME_PANGKAT } from '../utils/constants';
import funcs from '../utils/helper';
declare var $: any;
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
  hasWajah = false;
  dataWajah = [];

  showWebcam = false;
  allowCameraSwitch = true;
  multipleWebcamAvailable = false;
  deviceId: String = "";
  videoOptions: MediaTrackConstraints = {};
  errors: WebcamInitError[] = [];
  id: any;
  hasShot = false
  path = "";
  webcamImage?: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  toggleWebcamText: any = "Aktifkan Kamera";

  constructor(private service: NetworkService) {
    this.nama = funcs.getCookie(COOKIE_NAME_NAMA);
    this.nip = funcs.getCookie(COOKIE_NAME_NIP);
    this.jabatan = funcs.getCookie(COOKIE_NAME_JABATAN);
    this.pangkat = funcs.getCookie(COOKIE_NAME_PANGKAT);
    this.golongan = funcs.getCookie(COOKIE_NAME_GOLONGAN);
  }

  ngOnInit(): void {
    this.getWajah();
  }

  getImage(id: any) {
    $("#cameraModal").appendTo("body").modal('show');
    this.id = id;
  }

  simpanWajah() {
    var d: any = [];
    $(".wajah-anda").each((that: any, oone: any) => {
      d.push(oone.src);
    });
    if (!this.hasShot) {
      alert("Silahkan foto terlebih dahulu");
      return;
    }

    funcs.showLoadingData();
    const url = environment.baseUrlDebug + "simpan-wajah";
    var data = {
      nip: funcs.getCookie(COOKIE_NAME_NIP),
      wajah: d
    }

    this.service.sendData(url, data)
      .subscribe(
        res => {
          funcs.hideLoadingData();
          if (res.code == 200) {
            alert(res.message);
            location.reload();
          } else {
            alert(res.message);
          }
        },
        err => {
          funcs.hideLoadingData();
          alert("Kesalahan saat mengirimkan request");
          console.error(err);
        }
      )

  }


  triggerSnapshot(): void {
    if (!this.showWebcam) {
      alert("Aktifkan Webcam terlebih dahulu");
      return;
    }
    this.trigger.next();
    this.hasShot = true;
  }

  getWajah() {
    const urlWajah = environment.baseUrlDebug + "get-wajah?nip=" + funcs.getCookie(COOKIE_NAME_NIP);
    this.service.getData(urlWajah)
      .subscribe(
        res => {
          if (res.code == 200) {
            this.hasWajah = true;
            this.path = res.path + funcs.getCookie(COOKIE_NAME_NIP) + "/";
            this.dataWajah = JSON.parse(res.wajah);
          }
        },
        err => {
          console.error(err);
        }
      )
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    $("#" + this.id).attr('src', this.webcamImage.imageAsDataUrl)
    $("#cameraModal").appendTo("body").modal('hide');
  }

  toggleWebcam() {
    if (this.showWebcam) {
      this.toggleWebcamText = "Aktifkan Kamera";
    } else {
      this.toggleWebcamText = "Non Aktifkan Kamera";
    }
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  cameraWasSwitched(deviceId: string) {
    console.log('active device:' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

}
