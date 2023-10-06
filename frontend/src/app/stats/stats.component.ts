import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationService } from '../registration.service';
import { Checkin, User } from '../user';
import { CheckinService } from '../checkin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeleteService } from '../delete.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  public users$: Observable<User[]>;
  public checkedInUsers$: Observable<Checkin[]>;
  public form: FormGroup; // Initialize the form property as a FormGroup

  constructor(
    private registrationService: RegistrationService,
    private checkinService: CheckinService,
    private deleteService: DeleteService,
    private formBuilder: FormBuilder
  ) {
    this.users$ = registrationService.getUsers();
    this.checkedInUsers$ = checkinService.getCheckins();
    
    // Initialize the form using FormBuilder
    this.form = this.formBuilder.group({
      pid: ''
    });
  }



  onSubmit(): void {
    let form = this.form.value;
    let pid = parseInt(form.pid ?? "");
    this.deleteService
    .deleteUser(pid)
    .subscribe({
      next: () => this.onSuccess(),
      error: (err) => this.onError(err)
    });
  }

  private onSuccess(): void {
    this.users$ = this.registrationService.getUsers();
    this.checkedInUsers$ = this.checkinService.getCheckins();
    window.alert(`User deleted successfully.`);
    this.form.reset();
  }

  private onError(err: Error) {
    if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }
}