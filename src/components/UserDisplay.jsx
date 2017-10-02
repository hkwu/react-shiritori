import React, { PureComponent } from 'react';

export default class UserDisplay extends PureComponent {
  render() {
    const {
      errors,
      gameStarted,
      challengerWord,
      onWordChange,
    } = this.props;

    return (
      <div className="field">
        <div className="control">
          <input
            className="input is-large"
            type="text"
            placeholder={gameStarted ? `${challengerWord.slice(-1)}...` : 'Enter a word to start the game.'}
            onKeyPress={e => onWordChange(e, this.textInput)}
            ref={(input) => { this.textInput = input; }}
          />
        </div>
        {errors.length && <p className="help is-danger">Word must be at least 4 letters.</p>}
        {errors.exists && <p className="help is-danger">Word is invalid.</p>}
      </div>
    );
  }
}
