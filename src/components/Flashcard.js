import React, { useState } from 'react';
import { Button, Input } from './ui';

const Flashcard = ({ questions, currentIndex, setCurrentIndex, setScore }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCheckAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === questions[currentIndex].answer.toLowerCase();
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (!correct ? 1 : 0)
    }));
    setUserAnswer('');
    setShowAnswer(false);
    setCurrentIndex((currentIndex + 1) % questions.length);
  };

  const handleReveal = () => setShowAnswer(true);
  const handleSkip = () => {
    setShowAnswer(false);
    setCurrentIndex((currentIndex + 1) % questions.length);
  };

  return (
    <div className="flashcard">
      <p className="question">{questions[currentIndex]?.question}</p>
      {!showAnswer && (
        <div className="input-area">
          <Input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer"
          />
          <Button onClick={handleCheckAnswer}>Submit</Button>
        </div>
      )}
      {showAnswer && <p className="answer">Answer: {questions[currentIndex]?.answer}</p>}
      <div className="button-group">
        {!showAnswer && <Button onClick={handleReveal}>Reveal Answer</Button>}
        <Button variant="outline" onClick={handleSkip}>Next Question</Button>
      </div>
    </div>
  );
};

export default Flashcard;