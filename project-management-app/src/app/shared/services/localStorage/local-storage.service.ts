import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /* eslint-disable class-methods-use-this */
  saveInLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /* eslint-disable class-methods-use-this */
  getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  /* eslint-disable class-methods-use-this */
  remoteFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  /* eslint-disable class-methods-use-this */
  clearLocalStorage() {
    localStorage.clear();
  }
}
