import { defineStore } from 'pinia'
import axios from 'axios'

export enum LS {
  userProfile = 'userProfile',
  authToken = 'authToken'
}

axios.defaults.baseURL = 'http://localhost:3000'

export const userAuth = defineStore({
  id: 'Auth',
  state: () => ({
    myName: 'Jawad Ali',
  }),
  getters: {

  },
  actions: {
    async signup(userCreds: {userName: string, password: string, name: string}, cb: (succes: boolean, msg: string) => any){
      try {
        const {data} = await axios.post("/auth/register", userCreds)
        if (data) { 
          localStorage.setItem(LS.authToken, data.token)
          localStorage.setItem(LS.userProfile, data.user)
          cb(true, "Registered successfully")
        }
      } catch (error) {
        cb(false, error.response.data.errors[0])
      }
    },
    async login(userCreds: {userName: string, password: string}, cb: (succes: boolean, msg: string) => any){
      try {
        const { data } = await axios.post('/auth/login', userCreds)
        localStorage.setItem(LS.authToken, data.token)
        localStorage.setItem(LS.userProfile, JSON.stringify(data.user))
        if (data) { 
          localStorage.setItem(LS.authToken, data.token)
          localStorage.setItem(LS.userProfile, data.user)
          cb(true, "Login successfully")
        }
      }
      catch (error) {
        cb(false, error.response.data.errors[0])
      }
    },
  },
})
