import React, { useState } from 'react';
import Flashcard from './components/Flashcard';
import Scoreboard from './components/Scoreboard';
import { Input } from './components/ui';
import { extractTextFromImage } from './utils/ocrHelper';

function App() {
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const words = await extractTextFromImage(file);
    const generatedQuestions = words.map(word => ({
      question: `What is the meaning of "${word}"?`,
      answer: word
    }));

    setQuestions(shuffleArray(generatedQuestions));
    setCurrentIndex(0);
    setScore({ correct: 0, wrong: 0 });
  };

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  return (
    <div className="App">
      <h1>Flashcard App</h1>
      <Input type="file" accept="image/*" onChange={handleImageUpload} />
      <Scoreboard score={score} />
      {questions.length > 0 && (
        <Flashcard
          questions={questions}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setShowAnswer={() => {}}
          setScore={setScore}
        />
      )}
    </div>
  );
}

export default App;