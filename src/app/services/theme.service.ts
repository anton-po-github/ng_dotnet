import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public theme: 'light-theme' | 'dark-theme' = 'dark-theme';

  //private globalColors = { light: '#7BC2F7', dark: '#810081' };
  private globalColors = { light: '#B1BBE7', dark: '#5B0448' };
  //private globalColors = { light: '#C4D2F0', dark: '#70085E' };
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

    this.setDocumentBodyTheme(oldTheme);

    localStorage.setItem('preferred-theme', this.theme);

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
