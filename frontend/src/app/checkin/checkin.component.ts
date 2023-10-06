import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import {CheckinService} from '../checkin.service';
import { Observable } from 'rxjs';
import { User, Checkin} from '../user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkin-details',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})

export class CheckinComponent{
 
  constructor(
    private formBuilder: FormBuilder,
    private listService: RegistrationService,
    private checkinService: CheckinService,
    private http: HttpClient
  ){}
  items = this.listService.getUsers();
  checkInForm = this.formBuilder.group({
  pid: [''],
  });

  
  formSubmit = false;
  filteredItems: any[] | undefined;
  submissionDateTime: Date | null = null;

  
  onSubmit(): void {
    let form = this.checkInForm.value;
    let pid = parseInt(form.pid ?? "");
    

    this.checkinService
      .checkinUser(pid)
      .subscribe({
        next: (user) => this.onSuccess(user),
        error: (err) => this.onError(err)
      });
  }

  private onSuccess(checkin: Checkin): void {
    window.alert(`Thanks for checking in: ${checkin.user.first_name} ${checkin.user.last_name}`);
    this.checkInForm.reset();
  }

  private onError(err: Error) {
    if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }
  
  
  
}