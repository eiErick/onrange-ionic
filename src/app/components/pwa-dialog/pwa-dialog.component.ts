import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-pwa-dialog',
  // styleUrl: './pwa-dialog.component.css',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './pwa-dialog.component.html',
})
export class PwaDialogComponent {
  public openChrome() {
    window.location.href = "googlechrome://onrange.com.br/";
    this.copyLink();
  }

  private copyLink(): void {
    navigator.clipboard.writeText('https://onrange.com.br/');
  }
}
