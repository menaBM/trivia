import React from 'react';
import { decodeHTML } from '../lib';

class AnswerButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.correct)
  }

  render() {
    {console.log(this.props.guess, this.props.answer, this.props.correct)}
    return (
      <button
        onClick={this.props.handleGuess}
        className={`btn btn-outline-primary ' ${this.props.guess === this.props.answer?(this.props.correct === true?'btn-success':'btn-danger'):""}` }
      >
        {decodeHTML(this.props.answer)}
      </button>
    );
  }
}

export { AnswerButton };
