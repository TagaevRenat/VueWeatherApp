import type { UserCity } from './ApiService'

export class Helpers {
    public throttle<T extends (...args: any[]) => void>(callee: T, timeout: number): Function {
      let timer: number | undefined;
        
        return function perform(...args: Parameters<T>) {
          if (timer) return;

          timer = setTimeout(() => {
            callee(...args);
            clearTimeout(timer);
            timer = undefined;
          }, timeout);
        };
  }

  public saveCities(cities: UserCity[]): void {
    localStorage.setItem('cities', JSON.stringify(cities))
  }

  public getCities(): UserCity[] {
    const cities: string | null = localStorage.getItem('cities')
    if (cities) {
      return JSON.parse(cities)
    } else {
      return []
    }
  }
}
