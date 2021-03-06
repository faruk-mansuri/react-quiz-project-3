import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'

function App() {
  const { waiting, loading, questions, index, correct, nextQuestion, checkAnswer } = useGlobalContext();

  if(waiting){
    return <SetupForm />
  }

  if(loading){
    return <Loading />
  }

  const {question, incorrect_answers, correct_answer} = questions[index];
  // const answers = [...incorrect_answers, correct_answer];
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * answers.length + 1)
  
  if(tempIndex === 3){
    answers.push(correct_answer)
  }else{
    answers.push(answers[tempIndex]) //here we putting item on that index and pushing  on the last index
    answers[tempIndex] = correct_answer // here we are putting correct item in that empty index 
  }

  return(
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct} / {index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {
              
              answers.map((answer, index) => {
                return (
                  <button 
                    key={index} 
                    className='answer-btn'
                    onClick={() => checkAnswer(correct_answer === answer)} //true or false
                    dangerouslySetInnerHTML={{ __html:answer }}/>
                )
              })
            }
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )

}

export default App
