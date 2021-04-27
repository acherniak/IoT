import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
	constructor(private api: ApiService) {}
	ngOnInit() { this.api.wasItUpdated(); }
	reload() { window.location.reload() }
}
