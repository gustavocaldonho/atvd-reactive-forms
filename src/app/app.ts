import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatriculaFormComponent } from './components/matricula-form/matricula-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatriculaFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('atvd-reactive-forms');
}
