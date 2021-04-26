import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'fixed'})
export class FixedPipe implements PipeTransform {
  transform(value: number, dig?: number): string {
    return value.toFixed(dig);
  }
}

@Pipe({name: 'datetime'})
export class DateTimePipe implements PipeTransform {
  transform(value: number, dig?: number): string {
    return new Date(value).toLocaleString('us');
  }
}

export interface Message {
	dt: number;
	lat: number;
	lng: number
	temp: number;
}