import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patent } from '../../dtos/patent.dto';

@Injectable({
  providedIn: 'root'
})
export class PatentService {
  constructor(private httpService: HttpClient) {}

  get() {
    return this.httpService.get<Patent[]>('http://localhost:3000/patent', {
      params: {
        startDate: '2021-03-01',
        endDate: '2021-09-09'
      }
    });
  }

  test() {
    console.log('?');
    return this.httpService.get<Patent[]>('http://localhost:3000/');
  }
}
