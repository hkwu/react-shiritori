import React, { Component } from 'react';
import Dictionary from './Dictionary';

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
    return (
      <div className="container">
        <div className="columns has-text-centered">
          <div className="column">
            <i className="fa fa-android fa-3x" />
          </div>
        </div>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="columns has-text-centered">
              <div className="column">
                <i className="fa fa-quote-left fa-3x" />
              </div>
              <div className="column is-narrow">
                <p className="is-size-1 is-inline">
                  {
                    this.state.gameStarted
                      ? this.state.challengerWord.slice(0, -1)
                      : 'Shiritori'
                  }
                  {
                    this.state.challengerWord && <span className="has-text-weight-bold">{this.state.challengerWord.slice(-1)}</span>
                  }
                </p>
              </div>
              <div className="column">
                <i className="fa fa-quote-right fa-3x" />
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
                  placeholder={this.state.gameStarted ? `${this.state.challengerWord.slice(-1)}...` : 'Enter a word to start the game.'}
                  onKeyPress={this.handleWordChange}
                  ref={input => { this.textInput = input; }}
                />
              </div>
              {this.state.inputErrors.length && <p className="help is-danger">Word must be at least 4 letters.</p>}
              {this.state.inputErrors.exists && <p className="help is-danger">Word is invalid.</p>}
            </div>
          </div>
        </div>
        <div className="columns has-text-centered">
          <div className="column">
            <i className="fa fa-user fa-3x" />
          </div>
        </div>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <p className="is-size-3">Used Words</p>
            <p className="is-size-5">{[...this.state.usedWords].sort().join(', ')}</p>
          </div>
        </div>
      </div>
    );
  }
}
