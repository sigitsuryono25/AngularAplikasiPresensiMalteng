import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../network/network.service';
import funcs from '../utils/helper';
declare var $: any;
@Component({
  selector: 'app-presensi',
  templateUrl: './presensi.component.html',
  styleUrls: ['./presensi.component.css']
})
export class PresensiComponent implements OnInit {

  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamAvailable = false;
  deviceId: String = "";
  videoOptions: MediaTrackConstraints = {};
  isWFH = false;
  errors: WebcamInitError[] = [];
  webcamImage: any;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  jarak: any;
  res: any;
  serverTime: any;
  jamMasuk: any;
  status: any;
  canPresensi = false;
  position: any;
  isPresensi = -1;
  toggleWebcamText: any = "Non Aktfikan Kamera";
  private declare urls;

  constructor(private readonly geolocation$: GeolocationService, private service: NetworkService) {
    funcs.showLoadingData();
    this.urls = environment.baseUrlDebug + "presensi";
    this.getPositionNow();
    this.presensiHariIni();
    this.getServerTime();
  }


  getPositionNow() {
    funcs.hideLoadingData();
    this.geolocation$.subscribe(
      position => {
        this.position = position;
        var data = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          nip: "1606022502940003"
        };
        this.service.sendData(this.urls, data).subscribe(
          res => {
            this.jarak = res.data.radius;
            this.canPresensi = res.data.can_presensi;

          },
          error => {
            console.error(error);

          }
        )
      }
    )
  }

  presensiHariIni() {
    const urlHariIni = environment.baseUrlDebug + "presensi-hari-ini?nip=1606022502940003";
    this.service.getData(urlHariIni)
      .subscribe(
        res => {
          this.isPresensi = res.data.is_presensi;
          if (this.isPresensi == 200) {
            alert(res.message)
          }
        },
        err => console.error(err)

      )
  }

  sendData() {
    funcs.showLoadingData();
    const data = {
      foto: this.webcamImage.imageAsDataUrl,
      nip: "1606022502940003",
      latitude: this.position.coords.latitude,
      longitude: this.position.coords.longitude,
    };
    const url = environment.baseUrlDebug + "do-presensi";
    this.service.sendData(url, data)
      .subscribe(
        res => {
          funcs.hideLoadingData();
          if (res.code == 200) {
            alert(res.message)
          } else {
            alert(res.message)
          }
        },
        err => {
          funcs.hideLoadingData();
          console.error(err)
        }
      )
  }



  getServerTime() {
    var $this = this;
    setInterval(function () {
      const url = environment.baseUrlDebug + "server-time";
      $this.service.getData(url)
        .subscribe(
          res => {
            $this.serverTime = res.waktu;
            $this.jamMasuk = res.jam_kerja.jam_masuk;
            $this.status = res.jam_kerja.status;
          },
          error => {
            console.error(error);
          }
        )
    }, 1000);
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamAvailable = mediaDevices && mediaDevices.length > 1
      })
  }

  triggerSnapshot(): void {
    this.trigger.next();
    // $("#hasilFoto").appendTo("body").modal({
    //   backdrop: 'static',
    //   keyboard: false
    // });
    this.sendData();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
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
