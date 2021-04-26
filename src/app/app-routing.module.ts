import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TruckComponent } from './truck/truck.component';
import { MonitorComponent } from './monitor/monitor.component';

const routes: Routes = [{ path: 'truck', component: TruckComponent },
{ path: '**', component: MonitorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
