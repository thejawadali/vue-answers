import { defineStore } from 'pinia'
import axios from 'axios'
import { LS } from "./auth"



axios.defaults.baseURL = 'http://localhost:3000'

export const tagsStore = defineStore({
  id: 'Tag',
  state: () => ({
  }),
  getters: {

  },
  actions: {
    // Fetch all questions
    async createTag(title: string, cb: (success: boolean, msg: string) => any) {
      try {
        const { data } = await axios.post("/tag", {
          title
        }, {
          headers: { Authorization: `${localStorage.getItem(LS.authToken)}` }
        })
        if (data) {
          cb(true, "Tag Created successfully")
        }
      } catch (error) {
        cb(false, error.response.data.errors[0])
      }
    },
    // Fetch all questions
    async fetchTags(cb: (success: boolean, msg: string) => any) {
      try {
        const { data } = await axios.get("/tag")
        if (data) {
          cb(true, JSON.stringify(data))
        }
      } catch (error) {
        cb(false, error.response.data.errors[0])
      }
    },
  },
})
