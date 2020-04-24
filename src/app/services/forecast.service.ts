import { Weather } from '../../structures/weather.structure';
import { Coords } from '../../structures/coords.structure';
import { Injectable,isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any> = this.weatherSubject.asObservable();

  endpoint: string = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {
    this.weather$ = this.weatherSubject.asObservable().pipe(map(this.structureDate));
    this.get({
      lat: -2.170998,
      lon: -79.922356
    });
  }

  structureDate(data: any){

    let minMaxPerDay = {};

    data.list.forEach(weatherObject =>{
      let date = new Date (weatherObject.dt * 1000);
      let hours = date.getHours();
      let month = date.getMonth();
      let day = date.getDate();
      let key = `${month}-${day}`;

      let tempPerDay: Weather = minMaxPerDay[key] ||{
        minMaxTemp : {}
      };

      /*Hora 16 = 4 de la tarde*/
      if(!tempPerDay.cod || hours == 16){
        let source = weatherObject.weather[0];
        /*Combino las propiedades de  los dos objectos */
        tempPerDay = { ...tempPerDay, ...source }; 
        tempPerDay.cod = source.id;
        tempPerDay.name = data.city.name;
      }

      /*Condiciones para obtener las temperaturas minimas y maximas */

      if (!tempPerDay.minMaxTemp.min || (weatherObject.main.temp_min < tempPerDay.minMaxTemp.min )){
        tempPerDay.minMaxTemp.min = weatherObject.main.temp_min;
      }

      if (!tempPerDay.minMaxTemp.max || (weatherObject.main.temp_max > tempPerDay.minMaxTemp.max)) {
        tempPerDay.minMaxTemp.max = weatherObject.main.temp_max;
      }

      minMaxPerDay[key] = tempPerDay;

    });
    return Object.values(minMaxPerDay);
  }

  /*retornara un observable*/
  get(coords: Coords){
    /*Enviando como argumento la latitud, longitud y la key  */
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    let url =  this.endpoint + args;

    if(isDevMode()){
      url = 'assets/forecast.json';
    }

    this.http.get(url).subscribe(this.weatherSubject);
  }

}
