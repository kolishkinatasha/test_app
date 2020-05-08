//объединяем все редьюсеры

import {combineReducers} from 'redux';
import quizReducer from './quiz';
import createReducer from './create';
import authReduser from './auth';

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReduser
})