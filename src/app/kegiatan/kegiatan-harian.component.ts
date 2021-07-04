import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../network/network.service';
import { COOKIE_NAME_NIP } from '../utils/constants';
import funcs from '../utils/helper';
import { KegiatanDataSource, RekapKegiatanItems } from './kegiatan-source';

@Component({
  selector: 'app-kegiatan-harian',
  templateUrl: './kegiatan-harian.component.html',
  styleUrls: ['./kegiatan-harian.component.css']
})
export class KegiatanHarianComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RekapKegiatanItems>;
  dataSources: KegiatanDataSource;

  displayedColumns = ['seq', 'tanggal', 'hari', 'nama', 'progress_harian', 'koordinat_pulang'];
  dataRekapHariIni: any = [];
  nip: any;
  length = 20;
  constructor(private service: NetworkService) {
    this.nip = funcs.getCookie(COOKIE_NAME_NIP);
    this.dataSources = new KegiatanDataSource(this.service)
    this.dataSources.loadPresensi(0, this.length, this.nip);
    this.rekapKegiatan();
  }
  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => {
        this.loadMore(); funcs.scrolltoid("rekap-harian");
      })
    ).subscribe()
  }
  loadMore(): void {
    this.dataSources.loadPresensi(this.paginator.pageIndex,
      this.length, this.nip);
  }
  rekapKegiatan() {
    const urlHariIni = environment.baseUrlDebug + "rekap-kegiatan-by-user?nip=" + this.nip;
    this.service.getData(urlHariIni)
      .subscribe(
        res => {
          console.log(res.rows);

          this.dataRekapHariIni = res.rows;
        },
        err => {
          console.error(err);
        }
      )
  }

  ngOnInit(): void {
  }

}
