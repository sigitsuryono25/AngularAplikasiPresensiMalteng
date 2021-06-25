import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import funcs from '../utils/helper';

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
  videoOptions: MediaTrackConstraints = {

  };
  errors: WebcamInitError[] = [];
  webcamImage: any;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  position: any;
  jarak: any
  constructor(private readonly geolocation$: GeolocationService) {
    this.geolocation$.subscribe(
      position => {
        this.position = position;
        this.jarak =
          funcs.haversineFormula(
            position.coords.latitude, position.coords.longitude,
            -7.757910279534354, 110.41234062089868
          );
      }
    )
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamAvailable = mediaDevices && mediaDevices.length > 1
      })
  }

  triggerSnapshot(): void {
    console.log("fired");
    console.log(this.webcamImage);

    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  toggleWebcam() {
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
