import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatbotService } from '../../core/services/chatbot.service';


@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
private readonly _ChatbotService =inject(ChatbotService)
messages: { from: 'user' | 'bot', text: string }[] = [];

  MassageForm:FormGroup = new FormGroup({
        message: new FormControl(null , [Validators.required])
        });

SendMassage() {
  if (this.MassageForm.valid) {
    const userMessage = this.MassageForm.value.message;

    this.messages.push({ from: 'user', text: userMessage });
    this.MassageForm.reset();

    this._ChatbotService.sendToChatbot({ message: userMessage }).subscribe({
      next: (res: any) => {
        // ✅ استخدم المفتاح الصحيح من الـ API
        this.messages.push({ from: 'bot', text: res.reply || 'No response' });
      },
      error: (err) => {
        console.error('API Error:', err);
        this.messages.push({ from: 'bot', text: 'حدث خطأ.. حاول مرة أخرى' });
      }
    });
  } else {
    this.MassageForm.markAllAsTouched();
  }
}



}
