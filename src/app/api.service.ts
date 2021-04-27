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
	start = [40.5254, -74.3912]; update = this.swUpdate.isEnabled && environment.production;
  constructor(private http: HttpClient, private swUpdate: SwUpdate, private snackBar: MatSnackBar) { }

	wasItUpdated() {
		if (this.update) this.swUpdate.available.subscribe(()=> { 
			this.snackBar.open('Application has been updated', 'Reload Now', {duration:30000}).onAction().subscribe(() => window.location.reload())
		});
	}
	chkUpdate() { if (this.update) { this.snackBar.open('Checking for Updates', undefined, {duration:2000}); this.swUpdate.checkForUpdate(); }}
	fetch() { return this.http.get<Message[]>('api') }
	reset() { return this.http.delete('api') }
	put(msg: Message) { this.http.put('api', msg).subscribe(()=>{}) }
}
