import { defineStore } from 'pinia'
import axios from 'axios'
import { LS } from "./auth"



axios.defaults.baseURL = 'http://localhost:3000'

export const questionStore = defineStore({
  id: 'Question',
  state: () => ({
  }),
  getters: {

  },
  actions: {
    // Fetch all questions
    async fetchQuestions(cb: (success: boolean, msg: string) => any) {
      try {
        const { data } = await axios.get("/question")
        if (data) {
          cb(true, JSON.stringify(data))
        }
      } catch (error) {
        cb(false, error.response.data.errors[0])
      }
    },

    async fetchSingleQuestion(_id: string, cb: (success: boolean, msg: string) => any) {
      try {
        const { data } = await axios.get(`/question/${_id}`)
        if (data) {
          cb(true, JSON.stringify(data))
        }
      } catch (error) {
        cb(false, error.response.data.errors[0])
      }
    },
    // {{baseURL}}/question/{{questionId}}/answer
    async addAnswer(details: string, questionId: string, cb: (success: boolean, msg: string) => any) {
      try {
        const { data } = await axios.post(`/question/${questionId}/answer`, {
          details
        }, {
          headers: { Authorization: `${localStorage.getItem(LS.authToken)}` }
        })
        if (data) {
          cb(true, "Answer Added")
        }
      } catch (error) {
        cb(false, error.response.data.errors[0])
      }
    },
  },
})
