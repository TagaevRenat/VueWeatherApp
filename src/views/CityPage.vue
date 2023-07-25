<template>
    <main class="main" v-if="!isLoading">
        <header class="weather-info">
            <div v-if="!error" class="weather-info__summary">
                {{ WeatherStatus[convertedCurrentWeather?.weathercode ?? 0] }}
            </div>
            <img v-if="!error" :src="iconPath(convertedCurrentWeather?.weathercode ?? 1)" alt="weather icon"
                class="weather-info__icon" />
            <h2 class="weather-info__city">{{ city.name }}</h2>
            <h2 class="weather-info__temp">{{ convertedCurrentWeather?.temperature_2m }} °C</h2>
            <p class="weather-info__wind">
                Скорость ветра: {{ convertedCurrentWeather?.wind_speed }} м/с
            </p>
        </header>
        <table class="forecast-table" v-if="!error">
            <tr>
                <td class="forecast-table__date">Дата</td>
                <td class="forecast-table__icon">Погода</td>
                <td class="forecast-table__temperature">Мин / Макс</td>
            </tr>
            <tr v-for="day in weatherForecast" :key="day.data">
                <td class="forecast-table__date">{{ day.data }}</td>
                <td class="forecast-table__icon">
                    <img :src="iconPath(day.weathercode)" alt="weather icon" class="forecast-table__icon-img" />
                </td>
                <td class="forecast-table__temperature">
                    {{ day.temperature_2m_min }} C° / {{ day.temperature_2m_max }} C°
                </td>
            </tr>
        </table>
        <router-link to="/">
            <button class="back-button">К выбору города</button>
        </router-link>
    </main>
    <main class="main-loader" v-if="!error && isLoading">
        <div class="lds-dual-ring"></div>
    </main>
    <Popup v-if="error && !isLoading" :color="PopupColor.red" :timeout="5000" :text="loadError" />
</template>
<script setup lang="ts">
import Popup from '@/components/UI/Popup.vue'
import { PopupColor } from '@/constants/popup-color.enum'
import { WeatherStatus } from '@/constants/weatherStatus'
import { ApiService } from '@/services/ApiService'
import {
    ForecastConverter,
    type CurrentWeather,
    type ConvertedForecast
} from '@/services/ForecastConverter'
import { IconPathSetter } from '@/services/IconPathSetter'
import { useCityStore } from '@/store/cityStore'
import { onBeforeMount, ref, type Ref } from 'vue'
import { weatherErrorMock } from '@/constants/weather'
import { loadError } from '@/constants/user-message'
import { useRouter } from 'vue-router'

const router = useRouter()
const apiService = new ApiService()
const forecastConverter = new ForecastConverter()
const iconPathSetter = new IconPathSetter()
const isLoading = ref(true)
const error = ref(false)
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
        weatherForecast.value = forecastConverter.convertForecast(
            weatherForecastResponse,
            forecastRange
        )
        isLoading.value = false
    } else {
        convertedCurrentWeather.value = weatherErrorMock
        isLoading.value = false
        error.value = true
    }
}

onBeforeMount(async () => {
    const city = cityStore.getSelectedCity()
    if (!city.name) router.push({ name: 'Home' })
    await loadWeatherData()
})
</script>
<style scoped>
.main {
    padding: 20px;
    width: 430px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #ffffff, #83cfff);
}

.main-loader {
    height: 100vh;
    width: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #ffffff, #83cfff);
}

.weather-info {
    text-align: center;
    margin-bottom: 20px;
}

.weather-info__icon {
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

.forecast-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.forecast-table__icon {
    width: 40px;
    height: 40px;
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
    background-color: #6495ed;
    border: none;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
}

.back-button:hover {
    background-color: #256aea;
}
</style>
