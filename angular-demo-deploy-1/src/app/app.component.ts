import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'naveen-angular-demo-deployment-1';

  status: string = '';
  isLoading = false;

  runTest() {
    this.isLoading = true;
    this.status = '';

    setTimeout(() => {
      this.status = '✅ Deployment is successful!';
      this.isLoading = false;
    }, 2000);
  }
}
