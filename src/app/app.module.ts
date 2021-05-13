import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import "leaflet/dist/images/marker-shadow.png";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TruckComponent } from './truck/truck.component';
import { MonitorComponent } from './monitor/monitor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FixedPipe, DateTimePipe } from './utils';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    TruckComponent,
    MonitorComponent,
		FixedPipe, DateTimePipe
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule,
    BrowserAnimationsModule, HttpClientModule,
		MatToolbarModule, MatIconModule, MatButtonModule,
		MatTableModule, MatPaginatorModule, MatSortModule,
		MatMenuModule, MatDividerModule, MatFormFieldModule,
		MatRippleModule, LeafletModule, MatInputModule, MatSnackBarModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
