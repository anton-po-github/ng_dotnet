import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { ThemeService } from './../../services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false
})
export class ToolbarComponent {
  constructor(
    public themeService: ThemeService,
    public authService: AuthService
  ) {}
}
