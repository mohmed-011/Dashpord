import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  template: `
    <div
      class="drop-box"
      (dragover)="onDragOver($event)"
      (drop)="onDrop($event)"
      (click)="fileInput.click()">
      <p *ngIf="!imageUrl">اسحب الصورة هنا أو اضغط للرفع</p>
      <img *ngIf="imageUrl" [src]="imageUrl" alt="Uploaded Image" />
    </div>
    <input type="file" #fileInput (change)="onFileSelected($event)" hidden />
  `,
  styles: [
    `
      .drop-box {
        width: 300px;
        height: 200px;
        border: 2px dashed #007bff;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        background-color: #f9f9f9;
        position: relative;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    `
  ]
})
export class ImageUploaderComponent {
  imageUrl: string | ArrayBuffer | null = null;

  @Output() imageSelected = new EventEmitter<File>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  private handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => this.imageUrl = e.target?.result || null;;
    reader.readAsDataURL(file);
    this.imageSelected.emit(file);
  }
}

