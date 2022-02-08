import React from 'react';
import classes from './_uploadOrEditQuiz.module.scss';
export default function QuizDetails() {

  return <div className={classes.quizDetails}>
    <div className={classes.contentWrapper}>
      <div className={classes.QuizQuestion}>
      Who will win El Classico? 
      </div>
    </div>
  </div>;
}
