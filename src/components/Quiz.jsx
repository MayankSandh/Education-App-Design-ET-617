import React, { useState, useEffect } from 'react';
import trackEvent from '../utils/trackEvent';
import { useAuth } from '../contexts/AuthContext';

const Quiz = () => {
  const { currentUser } = useAuth();
  const questions = [
    {
      question: "What is game theory primarily concerned with?",
      options: [
        "The study of traditional games like chess and poker.",
        "Mathematical models of strategic interaction among rational decision-makers.",
        "The psychology of decision-making under uncertainty.",
        "The history of ancient civilizations' conflict resolution.",
      ],
      answer: "Mathematical models of strategic interaction among rational decision-makers.",
    },
    {
      question: "In the Prisoner's Dilemma, what is the dominant strategy for each prisoner, assuming they are rational?",
      options: [
        "To cooperate with the other prisoner.",
        "To remain silent.",
        "To confess (defect) against the other prisoner.",
        "To wait for the other prisoner to make a move.",
      ],
      answer: "To confess (defect) against the other prisoner.",
    },
    {
      question: "Which of the following is NOT typically an application of game theory?",
      options: [
        "Economics and business strategy.",
        "Political science and international relations.",
        "Biology and evolutionary dynamics.",
        "Solo creative writing and poetry.",
      ],
      answer: "Solo creative writing and poetry.",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    trackEvent('quiz_started', { quizName: 'Game Theory Quiz' }, currentUser?.uid);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].answer;
    trackEvent('quiz_answer', {
      quizName: 'Game Theory Quiz',
      questionIndex: currentQuestion,
      question: questions[currentQuestion].question,
      selectedAnswer: option,
      correctAnswer: questions[currentQuestion].answer,
      isCorrect,
    }, currentUser?.uid);

    if (isCorrect) {
      setFeedback('Correct!');
      setScore(score + 1);
    } else {
      setFeedback(`Incorrect. The correct answer was: ${questions[currentQuestion].answer}`);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setFeedback('');
    } else {
      setShowResults(true);
      trackEvent('quiz_completed', { quizName: 'Game Theory Quiz', finalScore: score + (selectedOption === questions[currentQuestion].answer ? 1 : 0), totalQuestions: questions.length }, currentUser?.uid);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setFeedback('');
    setShowResults(false);
    setScore(0);
    trackEvent('quiz_retake', { quizName: 'Game Theory Quiz' }, currentUser?.uid);
  };

  if (showResults) {
    return (
      <div>
        <h2>Quiz Results</h2>
        <p>You scored {score} out of {questions.length} questions correctly!</p>
        <button onClick={handleResetQuiz}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz on Game Theory</h2>
      <h3>Question {currentQuestion + 1} of {questions.length}</h3>
      <p>{questions[currentQuestion].question}</p>
      <div>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            style={{
              backgroundColor: selectedOption === option
                ? (option === questions[currentQuestion].answer ? 'lightgreen' : 'salmon')
                : '',
              margin: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
      {selectedOption !== null && (currentQuestion < questions.length - 1 ? (
        <button onClick={handleNextQuestion}>Next Question</button>
      ) : (
        <button onClick={handleNextQuestion}>Show Results</button>
      ))}
    </div>
  );
};

export default Quiz;
