<template>
    <section class="input-wrapper">
        <input class="input" type="text" v-model="searchQuery" @input="inputHandler"
            placeholder="Введите название города..." />
        <button class="reset_button" @click="resetSearch" v-if="searchQuery.length > 0">
            Сбросить
        </button>
        <ul v-if="searchResults && searchQuery.length > 0" class="results">
            <li v-for="city in searchResults.geonames" :key="city.name" @click="selectCity(city)">
                {{ city.name }}
            </li>
        </ul>
    </section>
    <Popup v-if="error" :color="PopupColor.red" :timeout="5000" :text="loadError" />
</template>
<script setup lang="ts">
import Popup from '@/components/UI/Popup.vue';
import { PopupColor } from '@/constants/popup-color.enum';
import { ApiService, type CitySearchResult, type Geonames, type UserCity } from '@/services/ApiService';
import { Helpers } from '@/services/Helpers';
import { ref, type Ref } from 'vue';
import { loadError } from '@/constants/user-message'

const emit = defineEmits(['citySelected'])
const apiService = new ApiService()
const searchQuery = ref('')
const searchResults: Ref<null | CitySearchResult> = ref(null)
const error = ref(false)
const helpers = new Helpers()

const inputHandler = async (): Promise<void> => {
    const result = await helpers.throttle(getSearchResults, 400)
    result()
}

const getSearchResults = async (): Promise<void> => {
    const cityInfo = await apiService.getCityInfo(searchQuery.value)
    if (cityInfo) {
        searchResults.value = cityInfo
    } else {
        error.value = true
    }
}

const selectCity = (city: Geonames): void => {
    resetSearch()
    emit('citySelected', convertCity(city))
}

const convertCity = (city: Geonames): UserCity => {
    return {
        name: city.name,
        coord: {
            lon: city.lng,
            lat: city.lat
        }
    }
}

const resetSearch = (): void => {
    searchResults.value = null
    searchQuery.value = ''
}

</script>
<style scoped>
.input-wrapper {
    height: fit-content;
    width: 300px;
    position: relative;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    border-radius: 8px;
    padding: 8px;

}

.input {
    flex: 1;
    border: none;
    background-color: transparent;
    font-size: 16px;
    color: #333;
    outline: none;
}

.input:focus {
    box-shadow: 0 0 0 2px #6495ED;
}

.reset-button {
    background-color: #6495ED;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
}

.reset-button:hover {
    background-color: #256aea;
}
</style>