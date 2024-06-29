import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const questions = location.state?.questions || [];
  const answers = location.state?.answers || [];

  const correctAnswers = questions.filter((question, index) => question.correctAnswer === answers[index]).length;
  const totalQuestions = questions.length;

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="card bg-white rounded-lg w-1/3 p-8">
        <div className="border-b-2 pb-3">
          <h1 className='font-body text-[20px]'>Quiz App - Aamir Almani</h1>
        </div>
        <div className="contetx text-center flex flex-col justify-center items-center">
          <img src="https://static.vecteezy.com/system/resources/previews/027/286/952/original/illustration-of-golden-trophy-png.png" className='h-[200px]' alt="Trophy" />
          <h1 className='font-display text-3xl'>Congratulations</h1>
        </div>
        <div className='mt-8 mb-6 flex flex-col gap-2'>
          <div className="resultz flex justify-between text-1xl font-display">
            <span>Total Questions</span>
            <strong>{totalQuestions}</strong>
          </div>
          <div className="resultz flex justify-between text-1xl font-display">
            <span>Correct Answers</span>
            <strong>{correctAnswers}</strong>
          </div>
          <div className="resultz flex justify-between text-1xl font-display">
            <span>Wrong Answers</span>
            <strong>{totalQuestions - correctAnswers}</strong>
          </div>
        </div>
        <div className="footer flex justify-center items-center gap-5 transition-all">
          <Link to={'/'}>
            <button className='px-8 py-2 text-[#573E9B] border-[#573E9B] border bg-transparent hover:bg-[#573E9B] hover:text-white'>Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
