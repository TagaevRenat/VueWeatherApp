import { WeatherStatusIcons } from "@/components/weatherStatusIcon";

export class IconPathSetter {
    public setIconPath(weatherCode: number, dayNight: number){
        const path = WeatherStatusIcons[weatherCode] ?? WeatherStatusIcons[0];
        if (Array.isArray(path)) {
            return '/src/assets/icons/' + path[dayNight];
        } else {
            return '/src/assets/icons/' + path;
        }
    }
}