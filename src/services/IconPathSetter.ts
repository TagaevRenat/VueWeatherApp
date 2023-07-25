import { WeatherStatusIcons } from '@/constants/weatherStatusIcon'

export class IconPathSetter {
  public setIconPath(weatherCode: number, dayNight: number): string {
    const path = WeatherStatusIcons[weatherCode] ?? WeatherStatusIcons[0]
    if (Array.isArray(path)) {
      return '/src/assets/icons/' + path[dayNight]
    } else {
      return '/src/assets/icons/' + path
    }
  }
}
