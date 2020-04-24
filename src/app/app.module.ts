import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherIconComponent,
    WeatherCardComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule /*Expone un servicio http cliente para realizar peticiones ajax*/
    /*Ejecutar comando "ng g service CurrentWeather" para crear servicios */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
