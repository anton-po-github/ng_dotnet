import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public theme: 'light-theme' | 'dark-theme' = 'dark-theme';

  private globalColors = { light: '#D7E3FF', dark: '#810081' };
  private theme$ = new BehaviorSubject<string>('');

  constructor() {
    this.bootstrap();
  }

  public get currentGlobalColors(): string {
    return this.theme === 'dark-theme'
      ? this.globalColors.dark
      : this.globalColors.light;
  }

  public toggleTheme(): void {
    this.theme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme();
  }

  public setDocumentBodyTheme(oldTheme: string): void {
    document.body.className = document.body.className.replace(oldTheme, '');

    document.body.classList.add(this.theme);
  }

  private setTheme(): void {
    const oldTheme =
      this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';

    if (this.theme === 'light-theme') {
      localStorage.setItem('chart-theme', 'gridLight');
    } else {
      localStorage.setItem('chart-theme', 'darkUnica');
    }

    this.setDocumentBodyTheme(oldTheme);

    localStorage.setItem('preferred-theme', this.theme);

    if (!localStorage.getItem('chart-theme')) {
      localStorage.setItem('chart-theme', 'darkUnica');
    }

    this.theme$.next(this.theme);
  }

  private bootstrap(): void {
    const current = localStorage.getItem('preferred-theme');

    if (current === 'light-theme' || current === 'dark-theme') {
      this.theme = current;
    } else {
      this.theme = 'dark-theme';
    }

    this.setTheme();
  }
}
