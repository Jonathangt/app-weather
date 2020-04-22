import { Weather } from './../../structures/weather.structure';
import { Coords } from '../../structures/coords.structure';
import { Injectable,isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any> = this.weatherSubject.asObservable();

  endpoint: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {
    this.weather$ = this.weatherSubject.asObservable().pipe(
      map((data: any)=>{
          let mainWeather = data.weather[0];

          let weather: Weather = {
            name: data.name, 
            cod: data.cod,
            temp: data.main.temp,
            ...mainWeather 
          };
          return weather;
        }
    ));


    this.get({
      lat: -2.170998,
      lon: -79.922356
    });
   }

  /*retornara un observable*/
  get(coords: Coords){
    /*Enviando como argumento la latitud, longitud y la key  */
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    let url =  this.endpoint + args;

    if(isDevMode()){
      url = 'assets/weather.json';
    }
    
    this.http.get(url).subscribe(this.weatherSubject);

  
  } 
}