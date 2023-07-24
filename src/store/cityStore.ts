import type { UserCity } from '@/services/ApiService'
import { defineStore } from 'pinia'

export const useCityStore = defineStore({
  id: 'cityStore',
  state: () => ({
   selectedCity: <UserCity>{} 
  }),
  actions: {
    setSelectedCity(city: UserCity){
        this.selectedCity = city
    },
    getSelectedCity(){
      return this.selectedCity ?? null
    }
  }
})