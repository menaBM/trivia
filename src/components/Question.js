import React from 'react';
import { decodeHTML, randomizeArray } from '../lib';
import { AnswerButton } from './';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessed: false,
      guess: '',
      correct: ""
    };
    // this.handleGuess = this.handleGuess.bind(this)
    // convert all answers into a single array, and randomize the array
    this.answers = randomizeArray([
      ...props.question.incorrect_answers,
      props.question.correct_answer,
    ]);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props){
      this.answers = randomizeArray([
        ...this.props.question.incorrect_answers,
        this.props.question.correct_answer,
      ]);
      this.setState({guessed:false, guess: "", correct: ""})
    }
  }

  handleGuess = (answer) => {
    // set guessed to true, and set guess to the selected answer
    this.setState({ guessed: true, guess: answer });
    console.log(answer)
    if (answer === this.props.question.correct_answer){
      this.setState({correct: true})
    }else{
      this.setState({correct:false})
    }
    
  };

  render() {
    return (
      <div className='card p-2 mb-4'>
        <h3 className='fw-lighter fs-5 mb-4'>{this.props.question.category}</h3>
        <h4 className='fw-light fs-5 mb-4'>
          {decodeHTML(this.props.question.question)}
        </h4>

        <div>
          {this.answers.map((answer) => (
            <AnswerButton
              key={answer}
              answer={answer}
              handleGuess= {() => this.handleGuess(answer)}
              correct={this.state.correct}
              guess={this.state.guess}
            />
          ))}
        </div>
          {/* {this.state.guessed && (this.state.guess===this.props.question.correct_answer?<p>correct!</p>:<p>incorrect</p>)} */}
          {this.state.guessed && (
            <div>
          {this.state.guess === this.props.question.correct_answer? (
            <span className="text-success">Correct!</span> 
          ):
          (
            <span className="text-danger">Incorrect! the correct answer is {this.props.question.correct_answer}</span>
          )
          }
            </div>
          )}
        {/* Dynamically render correct/incorrect here! */}
      </div>
    );
  }
}

export { Question };
