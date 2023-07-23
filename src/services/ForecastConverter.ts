import type { WeatherForecastResponse } from "./ApiService";

export class ForecastConverter {
    public getCurrentWeather(forecast: WeatherForecastResponse): CurrentWeather{
        const currentTimeISO = String(new Date().toISOString().slice(0, 13)) + ':00'
        const indexInTimeArr = forecast.hourly.time.indexOf(String(currentTimeISO));
        return {
            time: forecast.hourly.time[indexInTimeArr],
            temperature_2m: forecast.hourly.temperature_2m[indexInTimeArr],
            weathercode: forecast.hourly.weathercode[indexInTimeArr],
            wind_speed: forecast.hourly.windspeed_10m[indexInTimeArr],
        }
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

export interface CurrentWeather{
    time: string;
    temperature_2m: number;
    weathercode: number;
    wind_speed: number;
}

export interface ConvertedForecast{
    data: string;
    weathercode: number;
    temperature_2m_max: number;
    temperature_2m_min: number;
}

