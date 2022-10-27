import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.scss']
})
export class HeaderAppComponent implements OnInit {

  constructor(private userService: UserService) { }
  Logout: string = 'Logout'
  user!: User | null;
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.Logout = !!user ? 'Logout' : 'Singin'
      this.user = user

    })
  }
  onLogout() {
    this.userService.logout()
  }
}
