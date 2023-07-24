import type { WeatherForecastResponse } from "./ApiService";

export interface CurrentWeather{
    time: string;
    temperature_2m: number | string;
    weathercode: number;
    wind_speed: number | string;
}

export interface ConvertedForecast{
    data: string;
    weathercode: number;
    temperature_2m_max: number;
    temperature_2m_min: number;
}

export class ForecastConverter {
    public getCurrentWeather(forecast: WeatherForecastResponse): CurrentWeather{
        const timeIndex = this.findIndexByCurrentTime(forecast.hourly.time)
        return {
            time: forecast.hourly.time[timeIndex],
            temperature_2m: forecast.hourly.temperature_2m[timeIndex],
            weathercode: forecast.hourly.weathercode[timeIndex],
            wind_speed: forecast.hourly.windspeed_10m[timeIndex],
        }
    }

    private findIndexByCurrentTime(timeArray: string[]): number {
        const currentTime = new Date().getHours()
        return timeArray.findIndex((time) => time.includes(String(currentTime)));
    }

    public convertForecast(forecast: WeatherForecastResponse, days: number): ConvertedForecast[]{
        const convertedForecast: ConvertedForecast[] = []
        for(let i = 0; i < days; i++){
            convertedForecast.push({
                data: forecast.daily.time[i + 1],
                weathercode: forecast.daily.weathercode[i + 1],
                temperature_2m_max: forecast.daily.temperature_2m_max[i + 1],
                temperature_2m_min: forecast.daily.temperature_2m_min[i + 1],
            })
        }
        return convertedForecast
    } 
}


