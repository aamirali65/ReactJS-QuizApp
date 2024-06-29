import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectCat, setSelectCat] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://the-trivia-api.com/v2/categories')
      .then(response => response.json())
      .then(data => setCategories(Object.keys(data)))
      .catch(error => setError('Error fetching categories.'));
  }, []);

  useEffect(() => {
    if (selectCat) {
      setLoading(true);
      // Use the encoded category name in the API URL
      fetch(`https://the-trivia-api.com/v2/questions?categories=${selectCat}&limit=5`)
        .then(response => response.json())
        .then(data => {
          setQuestions(data);
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching questions.');
          setLoading(false);
        });
    }
  }, [selectCat]);

  const handleCategoryClick = (category) => {
    // Encode category name to ensure it's properly formatted in the URL
    const encodedCategory = encodeURIComponent(category);
  
    setSelectCat(encodedCategory);
    setQuestions([]);
  };

  const handleNextClick = () => {
    if (questions.length > 0) {
      navigate('/home', { state: { questions } });
    } else {
      setError('No questions available for the selected category.');
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="card bg-white rounded-lg w-1/3 p-8">
        <div className="border-b-2 pb-3">
          <h1 className='font-body text-[20px]'>Quiz App - Aamir Almani</h1>
        </div>
        <h1 className='font-body text-2xl text-center mt-5'>Choose Category</h1>
        <div className="contetx text-center flex flex-wrap justify-center items-center my-5 gap-2">
        {categories.map(category => (
  <div
    key={category}
    className={`answer w-[200px] border border-[#573E9B] p-3 cursor-pointer mb-4 ${selectCat === encodeURIComponent(category) ? 'bg-purple-300' : ''}`}
    onClick={() => handleCategoryClick(category)}
  >
    <span>{category}</span>
  </div>
))}

        </div>
        <div className="footer flex justify-center items-center">
          <button className='px-20 py-3 text-white bg-[#573E9B]' disabled={!selectCat || loading} onClick={handleNextClick}>
            {loading ? 'Loading...' : 'Next'}
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
}

export default IndexPage;
