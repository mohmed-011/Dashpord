import { Component } from '@angular/core';
import { FilterOptionComponent } from "../filter-option/filter-option.component";

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [FilterOptionComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {

}
