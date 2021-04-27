import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { latLng, marker, tileLayer } from 'leaflet';
import { ApiService } from '../api.service';
import { Message } from '../utils';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styles: ['table {width:100%}','.alert td {font-weight: bold; color:red}']
})
export class MonitorComponent implements OnInit {
	mapOpts = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        minZoom: 4, maxZoom: 19, attribution: 'Tenna' })
    ],
    zoom: 13, center: latLng(this.api.start[0], this.api.start[1])
  };
	layers: any[] = []; colsToDisplay = ['dt', 'lat', 'lng', 'temp']; track: Message[] = [];
	minTemp = 76;
	dataSource: any;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
	constructor(public api: ApiService, private swPush: SwPush, private http: HttpClient) { }

  ngOnInit(): void { this.fetch();
		this.http.get<Message[]>('init', this.api.bypass).subscribe((res: any) =>
			this.swPush.requestSubscription({ serverPublicKey: res.pushKey })
				.then(sub => this.http.post('/push/subscr', sub, this.api.bypass)
					.subscribe(() => this.swPush.messages.subscribe((res: any) => this.fetch()))
				)
		)
  }

	fetch() {
		this.api.fetch().subscribe(track => { this.layers = []; this.track = track;
			this.dataSource = new MatTableDataSource(this.track);
			this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort;
			for (let p of track) this.layers.push(marker(latLng(p.lat, p.lng),
				{title: `${new Date(p.dt).toLocaleString('us')}\n${p.temp.toFixed(2)}°F`}));
		})
	}

	truck() { window.open('#/truck') }
	
	setAlert(trg: any) { this.minTemp = trg.value	}
}
