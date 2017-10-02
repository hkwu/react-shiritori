import React from 'react';
import FaIcon from './FaIcon';

export default function ChallengerDisplay({ gameStarted, challengerWord }) {
  return (
    <div className="columns has-text-centered">
      <div className="column">
        <FaIcon icon="quote-left" size={3} />
      </div>
      <div className="column is-narrow">
        <p className="is-size-1 is-inline">
          {gameStarted ? challengerWord.slice(0, -1) : 'Shiritori'}
          {
            challengerWord &&
            <span className="has-text-weight-bold">{challengerWord.slice(-1)}</span>
          }
        </p>
      </div>
      <div className="column">
        <FaIcon icon="quote-right" size={3} />
      </div>
    </div>
  );
}
