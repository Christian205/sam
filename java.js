import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const Flashcard = ({ questions, currentIndex, setCurrentIndex, setShowAnswer, setScore }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswerState] = useState(false);

  const handleCheckAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === questions[currentIndex].answer.toLowerCase();
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (!correct ? 1 : 0)
    }));
    setUserAnswer('');
    setShowAnswerState(false);
    setCurrentIndex((currentIndex + 1) % questions.length);
  };

  const handleReveal = () => setShowAnswerState(true);
  const handleSkip = () => {
    setShowAnswerState(false);
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