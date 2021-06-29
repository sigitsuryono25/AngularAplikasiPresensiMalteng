import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { NetworkService } from "../network/network.service";

export interface PresensiItem {
  jam_masuk: string,
  terlambat: string,
  fotoMasuk: string,
  jamPulang: string,
  fotoPulang: string,
  status: string,
  hari: string,
  tanggal: string,
  seq: number
}

export interface RekapItem {
  data: PresensiItem[],
  message: string,
  code: number,
  count: number,
}
export class PresensiDataSource implements DataSource<RekapItem>{
  data: PresensiItem[] = [];
  count: number = 0;
  private presensiSubject = new BehaviorSubject<RekapItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  constructor(private service: NetworkService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<readonly RekapItem[]> {
    return this.presensiSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.presensiSubject.complete();
    this.loadingSubject.complete();
  }

  loadPresensi(pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);
    const urlPage = environment.baseUrlDebug + `rekap-kehadiran?nip=1606022502940003&page=${pageIndex}&length=${pageSize}`;
    this.service.getData(urlPage)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(
        res => {
          this.presensiSubject.next(res)
          this.data = res.data;
          this.count = res.count;
        }
      )

  }

}
