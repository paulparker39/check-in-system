import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationService } from '../registration.service';
import { Checkin, User } from '../user';
import { CheckinService } from '../checkin.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  public users$: Observable<User[]>;
  public checkedInUsers$: Observable<Checkin[]>

  constructor(registrationService: RegistrationService, checkinService: CheckinService) {
    this.users$ = registrationService.getUsers();
    this.checkedInUsers$ = checkinService.getCheckins();
    this.checkedInUsers$.subscribe(data => {
      console.log(data); // Log the data received from the API
    });
  }

}