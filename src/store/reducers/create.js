// к компоненту QuizCreator
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "../actions/action-types"

const initialState = {
    quiz: []
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item] //чтобы не мутировать создаём новый массив и добавляем новый элемент
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state, quiz: []
            }
        default:
             return state
    }
}