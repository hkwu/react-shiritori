import React, { Component } from 'react';
import ChallengerDisplay from './ChallengerDisplay';
import Dictionary from '../utils/Dictionary';
import FaIcon from './FaIcon';
import UserDisplay from './UserDisplay';

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

  handleWordChange({ key, target: { value } }, input) {
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
      input.value = '';
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
            <ChallengerDisplay gameStarted={gameStarted} challengerWord={challengerWord} />
          </div>
        </div>
        <hr />
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <UserDisplay
              errors={inputErrors}
              gameStarted={gameStarted}
              challengerWord={challengerWord}
              onWordChange={this.handleWordChange}
            />
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
