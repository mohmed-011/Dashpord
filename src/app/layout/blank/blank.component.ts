import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from "../../components/aside/aside.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [RouterOutlet, AsideComponent, NavbarComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
