import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<'light-theme' | 'dark-theme'>(
    (localStorage.getItem('theme') as 'light-theme' | 'dark-theme') ||
      'light-theme'
  );

  readonly theme = this._theme.asReadonly();

  toggleTheme(): void {
    const newTheme =
      this._theme() === 'light-theme' ? 'dark-theme' : 'light-theme';
    this._theme.set(newTheme);
    localStorage.setItem('theme', newTheme);
  }
}
