import axios from 'axios'

export class ApiService {
  
    private baseGeonameURL = 'http://api.geonames.org'
    private apiUser = 'renattagaev'


    public async getWeatherForecast(city: UserCity): Promise<WeatherForecastResponse | undefined>{
        const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${city.coord.lat}&longitude=${city.coord.lon}&hourly=temperature_2m,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&models=icon_seamless`
        try {
        const response = await axios({
            method: 'GET',
            url: endpoint,
        })
        if(response.status === 200 && response.data){
            return response.data as WeatherForecastResponse
        }else{
            throw new Error('Ошибка при загрузке погоды!')
        }
         } catch (error) {
        console.error(error)
        }
    }

    public async getCityInfo(query: string): Promise<CitySearchResult | undefined>{
        const endpoint = `${this.baseGeonameURL}/searchJSON?q=${query}&maxRows=3&lang=ru&username=${this.apiUser}`
        try {
            const response = await axios({
                method: 'GET',
                url: endpoint
            })
            if(response.status === 200 && response.data){
                return response.data as CitySearchResult
            }else{
                throw new Error('Ошибка загрузки поиска города!')
            }
            } catch (error) {
            console.error(error)
            }
    }
}

export interface CitySearchResult {
    totalResultsCount: number,
    geonames: Geonames[]
}

 export interface Geonames {
    adminCode1: number,
    lng: string,
    geonameId: number,
    toponymName: string
    countryId: number,
    fcl: string,
    population: number
    countryCode: string,
    name: string,
    fclName: string,
    lat: string
}

interface Coordinates {
    lon: number | string
    lat: number | string
}

export interface UserCity {
    name: string,
    coord: Coordinates
}

export interface WeatherForecastResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: {
      time: string;
      temperature_2m: string;
      weathercode: string;
      windspeed_10m: string;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
      weathercode: number[];
      windspeed_10m: number[];
    };
    daily_units: {
      time: string;
      weathercode: string;
      temperature_2m_max: string;
      temperature_2m_min: string;
    };
    daily: {
      time: string[];
      weathercode: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
    };
}