import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { trackEvent } from '../utils/trackEvent';

function Content() {
  const videoId = 'iSNsgj1OCLA'; // Veritasium video ID
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  const quizQuestions = [
    {
      question: "What is Game Theory primarily concerned with?",
      options: [
        "Predicting the future",
        "Strategic decision-making in interactive situations",
        "Analyzing past events",
        "Random outcomes"
      ],
      answer: "Strategic decision-making in interactive situations"
    },
    {
      question: "Which of the following is NOT a common element of a game in Game Theory?",
      options: [
        "Players",
        "Strategies",
        "Payoffs",
        "Chance (unless specified as a game of chance)"
      ],
      answer: "Chance (unless specified as a game of chance)"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
      trackEvent('quiz_answer', { question: quizQuestions[currentQuestion].question, selectedOption, correct: true });
    } else {
      trackEvent('quiz_answer', { question: quizQuestions[currentQuestion].question, selectedOption, correct: false });
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      trackEvent('quiz_completed', { score, totalQuestions: quizQuestions.length });
    }
  };

  const onVideoPlay = (event) => {
    trackEvent('video_play', { videoId: videoId, currentTime: event.target.getCurrentTime() });
  };

  const onVideoPause = (event) => {
    trackEvent('video_pause', { videoId: videoId, currentTime: event.target.getCurrentTime() });
  };

  const onVideoEnd = (event) => {
    trackEvent('video_end', { videoId: videoId });
  };

  return (
    <div>
      <h2>Game Theory: An Introduction</h2>
      <p>
        Game theory is the study of mathematical models of strategic interaction among rational decision-makers.
        It has applications in all fields of social science, as well as in logic, systems science and computer science.
        Originally, it addressed zero-sum games, where one person's gains result in losses for the other participants.
        Today, game theory applies to a wide range of behavioral relations, and is now an umbrella term for the science
        of logical decision making in humans, animals, and computers.
      </p>

      <h3>Featured Video: The Prisoner's Dilemma by Veritasium</h3>
      <YouTube videoId={videoId} opts={opts} onPlay={onVideoPlay} onPause={onVideoPause} onEnd={onVideoEnd} />

      <h3>Quick Quiz</h3>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {quizQuestions.length}
        </div>
      ) : (
        <div className='quiz-section'>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{quizQuestions.length}
            </div>
            <div className='question-text'>
              {quizQuestions[currentQuestion].question}
            </div>
          </div>
          <div className='answer-section'>
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
