import React, { Component } from 'react';
import Dictionary from '../utils/Dictionary';
import FaIcon from './FaIcon';

export default class Body extends Component {
  constructor(props) {
    super(props);

    this.handleWordChange = this.handleWordChange.bind(this);
    this.state = {
      inputErrors: {
        length: false,
        startingLetter: false,
        exists: false,
      },
      gameStarted: false,
      challengerWord: '',
      usedWords: new Set(),
      score: 0,
    };
  }

  handleWordChange({ key, target: { value } }) {
    const {
      gameStarted,
      usedWords,
    } = this.state;

    if (key === 'Enter') {
      if (!gameStarted) {
        this.setState({
          gameStarted: true,
        });
      }

      const normalized = value.trim().toLowerCase();

      if (normalized.length < 4) {
        return this.setState({
          inputErrors: {
            length: true,
          },
        });
      } else if (usedWords.has(normalized)) {
        return this.setState({
          inputErrors: {
            exists: true,
          },
        });
      }

      const leadingChar = normalized.charAt(0);
      const endingChar = normalized.slice(-1);

      if (
        (this.state.challengerWord && this.state.challengerWord.slice(-1) !== leadingChar) ||
        (!Dictionary[leadingChar].some(word => word === normalized))
      ) {
        return this.setState({
          inputErrors: {
            exists: true,
          },
        });
      }

      let challengerWord;

      do {
        challengerWord = Dictionary[endingChar][Math.floor(Math.random() * Dictionary[endingChar].length)];
      } while (usedWords.has(challengerWord));

      usedWords.add(normalized);
      usedWords.add(challengerWord);
      this.setState(prevState => ({
        inputErrors: {
          length: false,
          exists: false,
        },
        challengerWord,
        score: prevState.score + 1,
      }));
      this.textInput.value = '';
    }
  }

  render() {
    const {
      inputErrors,
      gameStarted,
      challengerWord,
      usedWords,
    } = this.state;

    return (
      <div className="container">
        <div className="columns has-text-centered">
          <div className="column">
            <FaIcon icon="android" size={3} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="columns has-text-centered">
              <div className="column">
                <FaIcon icon="quote-left" size={3} />
              </div>
              <div className="column is-narrow">
                <p className="is-size-1 is-inline">
                  {gameStarted ? challengerWord.slice(0, -1) : 'Shiritori'}
                  {challengerWord && <span className="has-text-weight-bold">{challengerWord.slice(-1)}</span>}
                </p>
              </div>
              <div className="column">
                <FaIcon icon="quote-right" size={3} />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className="field">
              <div className="control">
                <input
                  className="input is-large"
                  type="text"
                  placeholder={gameStarted ? `${challengerWord.slice(-1)}...` : 'Enter a word to start the game.'}
                  onKeyPress={this.handleWordChange}
                  ref={input => { this.textInput = input; }}
                />
              </div>
              {inputErrors.length && <p className="help is-danger">Word must be at least 4 letters.</p>}
              {inputErrors.exists && <p className="help is-danger">Word is invalid.</p>}
            </div>
          </div>
        </div>
        <div className="columns has-text-centered">
          <div className="column">
            <FaIcon icon="user" size={3} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <p className="is-size-3">Used Words</p>
            <p className="is-size-5">{[...usedWords].sort().join(', ')}</p>
          </div>
        </div>
      </div>
    );
  }
}
