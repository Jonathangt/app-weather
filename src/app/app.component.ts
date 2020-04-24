import { ForecastService } from './services/forecast.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'weather';
  constructor(private forecastService: ForecastService){

  }

  ngOnInit(){
    this.forecastService.weather$.subscribe(console.log);
  }
}
