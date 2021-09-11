import { Component, OnInit } from '@angular/core';
import { PatentService } from '../services/patent/patent.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Patent } from '../dtos/patent.dto';
@Component({
  selector: 'td-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentPattens$: Observable<Patent[]>;

  constructor(private patentService: PatentService) {}

  ngOnInit(): void {
    // this.recentPattens$ = this.patentService.get();
    this.recentPattens$ = this.patentService.test();
  }
}
