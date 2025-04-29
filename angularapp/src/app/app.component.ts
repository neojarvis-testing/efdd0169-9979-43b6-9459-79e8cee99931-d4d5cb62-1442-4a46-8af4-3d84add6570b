import { Component, ViewChild } from '@angular/core';
import { ErrorService } from './services/error.service';
import { ErrorComponent } from './components/error/error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
@ViewChild(ErrorComponent) errorComponent: ErrorComponent;

  constructor(public errorService: ErrorService) { }

  ngAfterViewInit() {
    this.errorService.registerErrorComponent(this.errorComponent);
  }


  title = 'angularapp';
}
