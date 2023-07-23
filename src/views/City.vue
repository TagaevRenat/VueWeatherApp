<template>
    <main class="main" v-if="!isLoading">
        <div class="weather-info">
            <div class="weather-info__summary">{{ WeatherStatus[convertedCurrentWeather?.weathercode ?? 0] }}</div>
            <img :src="iconPath(convertedCurrentWeather?.weathercode)" alt="weather icon" class="weather-info__icon">
            <h2 class="weather-info__city">{{ city.name }}</h2>
            <h2 class="weather-info__temp">{{ convertedCurrentWeather?.temperature_2m }} °C</h2>
            <p class="weather-info__wind">Скорость ветра: {{ convertedCurrentWeather?.wind_speed }} м/с</p>
        </div>
        <table class="forecast-table">
            <tr>
                <td class="forecast-table__date">Дата</td>
                <td class="forecast-table__icon">Погода</td>
                <td class="forecast-table__temperature">Мин / Макс</td>
            </tr>
            <tr v-for="day in  weatherForecast " :key="day.data">
                <td class="forecast-table__date">{{ day.data }}</td>
                <td class="forecast-table__icon">
                    <img :src="iconPath(day.weathercode)" alt="weather icon" class="forecast-table__icon-img" />
                </td>
                <td class="forecast-table__temperature">{{ day.temperature_2m_min }}° / {{ day.temperature_2m_max }}°</td>
            </tr>
        </table>
        <div class="weather-info__button">
            <button class="back-button">
                <router-link to="/">К выбору города</router-link>
            </button>
        </div>
    </main>
    <main class="main-loader" v-else>
        <div class="lds-dual-ring"></div>
    </main>
</template>
<script setup lang="ts">
import { WeatherStatus } from '@/components/weatherStatus';
import { WeatherStatusIcons } from '@/components/weatherStatusIcon';
import { ApiService } from '@/services/ApiService';
import { ForecastConverter, type CurrentWeather, type ConvertedForecast } from '@/services/ForecastConverter';
import { IconPathSetter } from '@/services/IconPathSetter';
import { useCityStore } from '@/store/cityStore';
import { onBeforeMount, ref, type Ref } from 'vue';

const apiService = new ApiService()
const forecastConverter = new ForecastConverter()
const iconPathSetter = new IconPathSetter()
const isLoading = ref(true)
const cityStore = useCityStore()
const forecastRange = 3
const currentHour = new Date().getHours()
const dayNight = currentHour > 6 && currentHour < 18 ? 0 : 1
const iconPath = (weatherCode: number) => iconPathSetter.setIconPath(weatherCode, dayNight)

const city = cityStore.getSelectedCity()
const weatherForecast: Ref<ConvertedForecast[]> = ref([])
const convertedCurrentWeather: Ref<CurrentWeather | null> = ref(null)
const loadWeatherData = async (): Promise<void> => {
    const weatherForecastResponse = await apiService.getWeatherForecast(city)
    if (weatherForecastResponse) {
        convertedCurrentWeather.value = forecastConverter.getCurrentWeather(weatherForecastResponse)
        weatherForecast.value = forecastConverter.convertForecast(weatherForecastResponse, forecastRange)
        isLoading.value = false
    }
}

onBeforeMount(async () => {
    await loadWeatherData()
})
</script>
<style scoped>
.main {
    padding: 20px;
    width: 430px;
    height: 100vh;
    justify-content: center;
}

.main-loader {
    height: 100vh;
    width: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.weather-info {
    text-align: center;
    margin-bottom: 20px;
}

.weather-info__icon {
    background-color: #f2f2f2;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.weather-info__city {
    font-size: 24px;
    margin: 10px 0;
}

.weather-info__temp {
    font-size: 30px;
    margin: 10px 0;
}

.weather-info__wind {
    font-size: 16px;
    margin: 0;
}

.weather-info__button {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.forecast-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.forecast-table__icon {
    width: 40px;
    height: 40px;
    background-color: #f2f2f2;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.forecast-table__date,
.forecast-table__temperature {
    font-size: 16px;
    padding: 10px;
    text-align: center;
    vertical-align: middle;
}

.back-button {
    margin: 0 auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #6495ED;
    border: none;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
}

.back-button:hover {
    background-color: #256aea;
}
</style>