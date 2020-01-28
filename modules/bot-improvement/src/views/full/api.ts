import { AxiosInstance } from 'axios'

import { FeedbackItem, MessageGroup, QnAItem } from '../../backend/typings'
import { Attribute } from '../../config'

export interface BotImprovementApi {
  getFeedbackItems: () => Promise<FeedbackItem[]>
  getQnaItems: () => Promise<QnAItem[]>
  fetchSession: (sessionId: string) => Promise<MessageGroup[]>
  getAttributes: () => Promise<Attribute[]>
  sendMessage: (sessionId: string, message: string) => Promise<any>
  setPauseState: (sessionId: string, action: string) => Promise<any>
}

export const makeApi = (bp: { axios: AxiosInstance }): BotImprovementApi => ({
  getFeedbackItems: () => bp.axios.get(`/mod/bot-improvement/feedback-items`).then(res => res.data),
  getQnaItems: () => bp.axios.get(`/mod/qna/questions`).then(res => res.data.items),
  fetchSession: sessionId => bp.axios.get(`/mod/bot-improvement/sessions/${sessionId}`).then(res => res.data),
  getAttributes: () => bp.axios.get(`/mod/hitl/config/attributes`).then(res => res.data),
  sendMessage: (sessionId, message) => bp.axios.post(`/mod/hitl/sessions/${sessionId}/message`, { message }),
  setPauseState: (sessionId, action) => bp.axios.post(`/mod/hitl/sessions/${sessionId}/${action}`)
})
