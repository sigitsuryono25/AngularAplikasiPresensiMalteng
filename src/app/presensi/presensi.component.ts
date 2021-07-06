import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../network/network.service';
import { COOKIE_NAME_NIP } from '../utils/constants';
import detector from '../utils/faceDetector';
import funcs from '../utils/helper';
declare var $: any;
@Component({
  selector: 'app-presensi',
  templateUrl: './presensi.component.html',
  styleUrls: ['./presensi.component.css']
})
export class PresensiComponent implements OnInit, OnDestroy {

  showWebcam = false;
  allowCameraSwitch = true;
  multipleWebcamAvailable = false;
  deviceId: String = "";
  videoOptions: MediaTrackConstraints = {};
  isWFH = false;
  errors: WebcamInitError[] = [];
  webcamImage?: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  jarak: any;
  res: any;
  serverTime: any;
  jamMasuk: any;
  status: any;
  jarakText = "-m";
  canPresensi = false;
  position: any;
  isPresensi = -1;
  toggleWebcamText: any = "Aktifkan Kamera";
  sisaWaktu: any;
  durasi: any;
  toleranMasuk: any;
  durasi_keterlambatan: any = 0;
  durasi_terlambat: any = 0;
  private declare urls;
  myInterval: any;
  nip: any;
  isPresensiMasuk = false;
  jamPresensiMasuk: any;
  editorContent: any;

  hasWajah: any;
  constructor(private readonly geolocation$: GeolocationService,
    private service: NetworkService,
    private routes: Router
  ) {
    this.getWajah();
  }
  ngOnDestroy(): void {
    clearInterval(this.myInterval);
  }

  verifyFace() {
    funcs.showLoadingData("#hasilFoto", "MEMVERIFIKASI WAJAH ANDA");
    detector.detectWajah("hasil-foto", [funcs.getCookie(COOKIE_NAME_NIP)])
      .then(e => {
        funcs.hideLoadingData("#hasilFoto");
        // if(e != null || e != [] || e != ""){
        //   alert(e?.nip);
        // }
        var nip = e?.nip;
        if (typeof (nip) == "undefined") {
          alert("Wajah Tidak Dikenali");
        } else {
          this.sendData();
        }
        // if (nip != "" || typeof (nip) != "undefined" || nip != null) {
        //   this.sendData();
        // }else{
        //   alert("Wajah tidak dikenali");
        // }
      })
  }

  getWajah() {
    const urlWajah = environment.baseUrlDebug + "get-wajah?nip=" + funcs.getCookie(COOKIE_NAME_NIP);
    this.service.getData(urlWajah)
      .subscribe(
        res => {
          if (res.code == 200) {
            this.hasWajah = true;
            this.initFun();
          } else {
            this.hasWajah = false;
          }
        },
        err => {
          console.error(err);
        }
      )
  }

  initFun() {
    funcs.showLoadingData();
    this.nip = funcs.getCookie(COOKIE_NAME_NIP);
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
          nip: this.nip
        };
        this.service.sendData(this.urls, data).subscribe(
          res => {
            this.jarak = res.data.radius;
            this.jarakText = res.data.radius_text;
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
    const urlHariIni = environment.baseUrlDebug + "presensi-hari-ini?nip=" + this.nip;
    this.service.getData(urlHariIni)
      .subscribe(
        res => {
          this.isPresensi = res.data.is_presensi;
          if (this.isPresensi == 200) {
            alert(res.message);
            // this.showWebcam = false;
            this.routes.navigateByUrl("/kehadiran");
          } else if (this.isPresensi == 400) {
            this.isPresensiMasuk = true;
            this.jamPresensiMasuk = res.data.masuk;
          }
        },
        err => console.error(err)

      )
  }

  sendData() {
    var editor = this.editorContent;
    if (this.isPresensiMasuk) {
      if (editor == "" || editor == null || typeof (editor) == "undefined") {
        alert("Kegiatan harian harus diisi");
        return;
      }
    }
    funcs.showLoadingData("body", "MENGIRIMKAN DATA PRESENSI");
    const data = {
      foto: this.webcamImage?.imageAsDataUrl,
      nip: this.nip,
      latitude: this.position.coords.latitude,
      longitude: this.position.coords.longitude,
      keterlambatan: this.durasi_terlambat,
      progress_harian: this.editorContent
    };
    const url = environment.baseUrlDebug + "do-presensi";
    this.service.sendData(url, data)
      .subscribe(
        res => {
          funcs.hideLoadingData();
          if (res.code == 200) {
            alert(res.message)
            location.reload();
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
    this.myInterval = setInterval(function () {
      const url = environment.baseUrlDebug + "server-time";
      $this.service.getData(url)
        .subscribe(
          res => {
            $this.serverTime = res.waktu;
            $this.jamMasuk = res.jam_kerja.jam_masuk;
            $this.status = res.jam_kerja.status;
            $this.sisaWaktu = res.jam_kerja.sisa_waktu_presensi;
            $this.durasi = res.jam_kerja.durasi;
            $this.toleranMasuk = res.jam_kerja.toleransi_keterlambatan_masuk;
            $this.durasi_keterlambatan = res.jam_kerja.durasi_keterlambatan;
            $this.durasi_terlambat = res.jam_kerja.durasi_terlambat;
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
    if (!this.showWebcam) {
      alert("Aktifkan Webcam terlebih dahulu");
      return;
    }
    this.trigger.next();
    // if (this.isPresensiMasuk) {
    // $("#hasilFoto").appendTo("body").modal({
    //   backdrop: 'static',
    //   keyboard: false
    // });
    $("#hasilFoto").appendTo("body").modal('show');
    // } else {
    //   this.sendData();
    // }
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
