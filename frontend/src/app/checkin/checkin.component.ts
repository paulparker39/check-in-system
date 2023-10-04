import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import {CheckinService} from '../checkin.service';
import { Observable } from 'rxjs';
import { User } from '../user';
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

  onSubmit():void{
    const pidValue = this.checkInForm.get('pid')?.value;
    let items = this.listService.getUsers();

    if (pidValue!.length != 9){
      window.alert("PID is not 9 digits. Please reenter.")
    }
    else{
      const subscription = items.subscribe(
      (users: User[]) => {
        users.forEach(user => {

        if ((user.pid) && (user.pid.toString() == pidValue)){
          window.alert("User " + user.first_name + " " + user.last_name + " is registered and checked in.")
          const curDate = new Date()
          this.http.post("/api/checkin", {user,curDate}); 
          this.checkInForm.reset()
          return
        }
      window.alert("PID: " + user + " could not be found.")
    })
  })
}

      }
    
  

    }
  