import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { NetworkService } from "../network/network.service";

export interface KegiatanItem {
  seq: number,
  hari: string,
  tanggal: string,
  nama: string,
  progress_harian: string,
  koordinat_pulang: string,
}
export interface RekapKegiatanItems {
  rows: KegiatanItem[],
  message: string,
  code: number,
  count: number,
  total: number,
}

export class KegiatanDataSource implements DataSource<RekapKegiatanItems>{
  rows: KegiatanItem[] = [];
  count: number = 0;
  private kegiatanSubject = new BehaviorSubject<RekapKegiatanItems[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  constructor(private service: NetworkService){

  }

  connect(collectionViewer: CollectionViewer): Observable<readonly RekapKegiatanItems[]> {
    return this.kegiatanSubject.asObservable();

  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.kegiatanSubject.complete();
    this.loadingSubject.complete();
  }

  loadPresensi(pageIndex: number, pageSize: number, nip: any) {
    this.loadingSubject.next(true);
    const urlPage = environment.baseUrlDebug + `rekap-kegiatan-by-user?nip=${nip}&page=${pageIndex}&length=${pageSize}`;
    this.service.getData(urlPage)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(
        res => {
          this.kegiatanSubject.next(res)
          this.rows = res.rows;
          this.count = res.count;
        }
      )

  }

}
