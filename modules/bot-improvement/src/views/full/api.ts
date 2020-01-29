import { AxiosInstance } from 'axios'

import { FeedbackItem, MessageGroup, QnAItem } from '../../backend/typings'

export interface BotImprovementApi {
  getFeedbackItems: () => Promise<FeedbackItem[]>
  getQnaItems: () => Promise<QnAItem[]>
  fetchSession: (sessionId: string) => Promise<MessageGroup[]>
  updateFeedbackItem: (
    feedbackItem: Pick<FeedbackItem, 'eventId' | 'correctedActionType' | 'correctedObjectId' | 'state'>
  ) => Promise<void>
}

export const makeApi = (bp: { axios: AxiosInstance }): BotImprovementApi => ({
  getFeedbackItems: () => bp.axios.get(`/mod/bot-improvement/feedback-items`).then(res => res.data),
  getQnaItems: () => bp.axios.get(`/mod/qna/questions`).then(res => res.data.items),
  fetchSession: sessionId => bp.axios.get(`/mod/bot-improvement/sessions/${sessionId}`).then(res => res.data),
  updateFeedbackItem: feedbackItem =>
    bp.axios.post(`/mod/bot-improvement/feedback-items/${feedbackItem.eventId}`, feedbackItem)
})
