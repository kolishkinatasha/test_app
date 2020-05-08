//компонент текущего вопроса

import React from 'react';
import './active-quiz.css';
import AnswersList from '../answers-list/answers-list.js'

const ActiveQuiz = props => (
    <div className='activeQuiz'>
        <p className='question'>
            <span>
                <strong>{props.answerNumber}.</strong> &nbsp;
                {props.question}
            </span>
            <small> {props.answerNumber} из {props.quizLength}</small>
        </p>
        <ul>
           <AnswersList 
                answerState={props.answerState}
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
           />
        </ul>
    </div>
)

export default ActiveQuiz;