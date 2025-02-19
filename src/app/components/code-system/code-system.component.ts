import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-system',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './code-system.component.html',
  styleUrl: './code-system.component.scss'
})
export class CodeSystemComponent {

  public  verion: number = 3;

    setver(num:number) {
    this.verion = num
   }
}
