<template>
    <div class="search_bar">
        <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Введите название города..." />
        <button class="reset_button" @click="resetSearch" v-if="searchQuery.length > 0">
            Сбросить
        </button>
        <ul v-if="searchResults && searchQuery.length > 0" class="results">
            <li v-for="city in searchResults.geonames" :key="city.name" @click="selectCity(city)">
                {{ city.name }}
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { ApiService, type CitySearchResult, type Geonames, type UserCity } from '@/services/ApiService';
import { ref, type Ref } from 'vue';

const emit = defineEmits(['citySelected'])
const apiService = new ApiService()
const searchQuery = ref('')
const searchResults: Ref<null | CitySearchResult> = ref(null)

const getSearchResults = async (): Promise<void> => {
    searchResults.value = await apiService.getCityInfo(searchQuery.value)
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
<style></style>