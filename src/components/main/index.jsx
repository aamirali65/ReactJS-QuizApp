import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
  // Implementing Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MainHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuestions = location.state?.questions || [];
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(initialQuestions.length).fill(null));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Shuffle answers whenever questions change or component mounts
  useEffect(() => {
    if (initialQuestions.length > 0) {
      const shuffledQuestions = initialQuestions.map(question => {
        const shuffledAnswers = shuffleArray([...question.incorrectAnswers, question.correctAnswer]);
        return { ...question, shuffledAnswers };
      });
      setQuestions(shuffledQuestions);
    }
  }, [initialQuestions]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const answerIsCorrect = answer === correctAnswer;
    setIsCorrect(answerIsCorrect);

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        navigate('/result', { state: { questions, answers: newAnswers } });
      }
    }, 1000); // 1 second delay before moving to the next question
  };

  // Render nothing if questions array is empty or undefined
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="card bg-white rounded-lg w-1/3 p-8">
        <>
          <div className="border-b-2 pb-3">
            <h1 className='font-body text-[20px]'>Quiz App - Aamir Almani</h1>
          </div>
          <div className="contentx mt-3">
            <span className='font-body'>{questions[currentQuestionIndex].question.text}</span>
            {questions[currentQuestionIndex].shuffledAnswers.map((answer, index) => (
              <div
                key={index}
                className={`answer w-full border border-black p-3 cursor-pointer my-4 ${
                  selectedAnswer !== null ? 
                    (answer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-400' :
                    answer === selectedAnswer ? 'bg-red-400' : '')
                    : ''
                }`}
                onClick={() => handleAnswerClick(answer)}
                style={{ pointerEvents: selectedAnswer !== null ? 'none' : 'auto' }}
              >
                <span>{answer}</span>
              </div>
            ))}
          </div>
          <div className="footer flex flex-col justify-center items-center gap-3 mt-6">
            <span className='font-body'>{currentQuestionIndex + 1} of {questions.length} Questions</span>
          </div>
        </>
      </div>
    </div>
  );
}

export default MainHome;
