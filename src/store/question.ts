import { defineStore } from 'pinia'
import axios from 'axios'
import { LS } from "./auth"


interface IQuestion {
  _id: any
  title: string
  details: string
  views: number
  tags: any
  user: any
  answers: any
}

interface ITag {
  _id: any
  title: string
}

axios.defaults.baseURL = 'http://localhost:3000'

export const questionStore = defineStore({
  id: 'Question',
  state: () => ({
    questions: [] as IQuestion[],
    questionsFromDb: [] as IQuestion[]
  }),
  getters: {

  },
  actions: {
    // Fetch all questions
    async fetchQuestions(cb: (success: boolean, msg: string) => any) {
      try {
        const { data } = await axios.get("/question")
        if (data) {
          this.questionsFromDb = data
          this.questions = data
          cb(true, "Loaded successfully")
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

    async addQuestion(question: any, cb: (success: boolean, msg: string) => any) {
      try {
        const tags : any [] = []
        tags.push(question.tag)
        const { data } = await axios.post(`/question`, {
          title: question.title,
          tags,
          details: question.details
        }, {
          headers: { Authorization: `${localStorage.getItem(LS.authToken)}` }
        })
        if (data) {
          cb(true, "Question Added")
        }
      } catch (error) {
        cb(false, error.response.data.errors[0])
      }
    },

    removeCategoryFilter() {
      this.questions = this.questionsFromDb
    },

    applyCategoryFilter(selectedTag: string) {
      this.questions = this.questionsFromDb.filter((ques: IQuestion) => {
        if (ques.tags.find((tag: ITag) => tag._id.toString() === selectedTag)) {
          return ques
        }
      })
    },

    searchQuestion(search: string) {
      if (!search) {
        this.questions = this.questionsFromDb
        return
      }
      this.questions = this.questionsFromDb.filter((ques: IQuestion) => ques.title.includes(search))
    }
  },
})