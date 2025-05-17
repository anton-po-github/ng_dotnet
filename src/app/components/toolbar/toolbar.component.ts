import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  standalone: false
})
export class ToolbarComponent {
  @Output() toggleTheme = new EventEmitter<void>();
}
