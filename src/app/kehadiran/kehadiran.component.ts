import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../network/network.service';
import { PresensiDataSource, RekapItem } from './kehadiran-source';

@Component({
  selector: 'app-kehadiran',
  templateUrl: './kehadiran.component.html',
  styleUrls: ['./kehadiran.component.css']
})
export class KehadiranComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RekapItem>;
  dataSources: PresensiDataSource;

  displayedColumns = ['seq', 'tanggal', 'hari', 'jam_masuk', 'terlambat', 'fotoMasuk', 'jamPulang', 'fotoPulang', 'status'];
  dataRekapHariIni: any = [];

  constructor(private service: NetworkService) {
    this.dataSources = new PresensiDataSource(this.service)
    this.dataSources.loadPresensi(0, 10);
    this.rekapHariIni();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.loadMore())
    ).subscribe()
  }

  loadMore() {
    this.dataSources.loadPresensi(this.paginator.pageIndex, 10);
  }

  rekapHariIni(){
    const urlHariIni = environment.baseUrlDebug + "rekap-hari-ini?nip=1606022502940003";
    this.service.getData(urlHariIni)
    .subscribe(
      res=>{
        this.dataRekapHariIni = res.data;
      },
      err=>{
        console.error(err);
      }
    )
  }
}
