//компонент отрисовки списка предлагаемых ответов
import React from 'react';
import './answers-list.css';
import AnswerItem from '../answer-item/answer-item.js';


const AnswersList = props => {
    return(
        <ul className='answersList'>
            {props.answers.map((answer, index) => {
                return (
                    <AnswerItem 
                    key={index}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    answerState={props.answerState ? props.answerState[answer.id] : null } /> //если не null тогда передаем то что нужно иначе null и передаём
                )
            })}
        </ul>
)}

export default AnswersList;
