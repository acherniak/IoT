import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { Message } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	bypass = { headers: new HttpHeaders({'ngsw-bypass':'true'}) }; 
	start = [40.8554, -74.1000]; update = this.swUpdate.isEnabled && environment.production;
  constructor(private http: HttpClient, private swUpdate: SwUpdate, private snackBar: MatSnackBar) { }

	toast(message: string, duration = 5, act?: string) { return this.snackBar.open(message, act, {duration: duration*1000}); }
	wasItUpdated() {
		if (this.update) this.swUpdate.available.subscribe(()=> { 
			this.toast('Application has been updated', 30, 'Reload Now').onAction().subscribe(() => window.location.reload())
		});
	}
	chkUpdate() { if (this.update) { this.toast('Checking...', 2); this.swUpdate.checkForUpdate(); }}
	fetch() { return this.http.get<Message[]>('api') }
	reset() { return this.http.delete('api') }
	put(msg: Message) { this.http.put('api', msg).subscribe(()=>{}) }
}
