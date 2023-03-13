import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  saveInLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  remoteFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
