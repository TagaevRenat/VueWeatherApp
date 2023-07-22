import axios from 'axios'

export class ApiService {
    private baseWeatherURL = 'https://pro.openweathermap.org/data/2.5/forecast/climate'
    private baseGeonameURL = 'http://api.geonames.org'
    private apiKey = 'f024faafd6b509721df502f3c38de164'
    private apiUser = 'renattagaev'


    public async getWeatherInfo(city: UserCity): Promise<WeatherResponse>{
        const endpoint = `${this.baseWeatherURL}?lat=${city.coord.lat}&lon=${city.coord.lon}&cnt=4&units=metric&appid=${this.apiKey}`
        try {
        const response = await axios({
            method: 'GET',
            url: endpoint
        })
        if(response.status === 200 && response.data){
            return response.data as WeatherResponse
        }else{
            throw new Error('Ошибка при загрузке погоды!')
        }
         } catch (error) {
        console.error(error)
        }
    }

    public async getCityInfo(query: string): Promise<CitySearchResult>{
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

export interface WeatherResponse{
    coord: Coordinates,
    weather: Weater,
    base: string,
    main: Main,
    visibility: number,
    wind: Wind,
    clouds: Clouds,
    dt: number,
    sys: Sys,
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

interface Coordinates {
    lon: number | string
    lat: number | string
}

interface Weater {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Clouds {
    all: number
};

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface UserCity {
    name: string,
    coord: Coordinates
}