import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import UOSensorsNO2 from '../assets/uoSensorsNO2.json';
import UOSensorsPM10 from '../assets/uoSensorPM10.json';
import UOSensorsPM25 from '../assets/uoSensors25.json';

@Injectable({
  providedIn: 'root'
})
export class UrbanObservatoryService {

  // general API parameters
  theme = 'Air Quality';
  sensorTypes = ['NO2', 'PM 2.5', 'PM10'];

  // newcastle API parameters
bbox_p1_xncl = -2.4163;
bbox_p1_yncl = 54.7373;
bbox_p2_xncl = -0.8356;
bbox_p2_yncl = 55.2079;


  constructor(private http: HttpClient) { }

  // if Urban Observatory data does not load, return saved data instead
  private handleNO2Error(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.resolve(UOSensorsNO2.sensors);
  }
  private handlePM10Error(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.resolve(UOSensorsPM10.sensors);
  }
  private handlePM25Error(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.resolve(UOSensorsPM25.sensors);
  }

  async getNO2ncl() {
    return Promise.resolve(UOSensorsNO2.sensors);
  }

  async getPM25ncl() {
    return Promise.resolve(UOSensorsPM25.sensors);
  }

  async getPM10ncl() {
    return Promise.resolve(UOSensorsPM10.sensors);
  }
}
