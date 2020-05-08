//компонент отрисовки одного предлагаемого ответа из списка
import React from 'react';
import './answer-item.css';

const AnswerItem = props => {
    // console.log(props.answer);
    // console.log(props.answerState);
    let classTrueFalse = "answerItem "

    if(props.answerState) {
        classTrueFalse += [props.answerState];
    } 

    return (
        <li className={classTrueFalse}
            onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    )
}

export default AnswerItem;