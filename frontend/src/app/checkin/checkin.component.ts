import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import {CheckinService} from '../checkin.service';
import { Checkin} from '../user';

@Component({
  selector: 'app-checkin-details',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})

export class CheckinComponent{
 
  constructor(
    private formBuilder: FormBuilder,
    private listService: RegistrationService,
    private checkinService: CheckinService
  ){}
 
  checkInForm = this.formBuilder.group({
  pid: [''],
  });


  
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