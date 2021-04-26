import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styles: []
})
export class TruckComponent implements OnInit {
	@ViewChild(MatRipple) ripple!: MatRipple;
	lat: number = 0; lng: number = 0; temp: number;
  constructor(public api: ApiService) { }
  ngOnInit(): void {
		this.reset();
		setInterval(() => { this.ripple.launch({}); this.tick(true); }, 15000);
  }
	tick(nxt: boolean = false) {
		if (nxt) { this.lat += Math.random()*0.01; this.lng += Math.random()*0.01; this.temp -= (Math.random()-0.3)*0.05; }
		this.api.put({ lat: this.lat, lng: this.lng, temp: this.temp, dt: new Date().getTime() })
	}
	reset() {
		[this.lat, this.lng] = [...this.api.start]; this.temp = 77; this.api.reset().subscribe(() => this.tick());
	}
}
