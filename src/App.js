import axios from 'axios';
import {useState, useEffect} from 'react';
import './App.css';

const App = () => {

  const [chosenLevel, setChosenLevel] = useState(null)
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)
// we dont want the results to show straight away, so we put the get request in a function. We 
// want to fetch the data based on the level that we chose. Once we select a level, call the function.
  const getRandomWords = () => {
    
    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {level: chosenLevel, area: 'sat'},
      headers: {
        'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY
      }
    };
    
      axios.request(options).then((response) => {
      console.log(response.data);
      setWords(response.data)
    }).catch((error) => {
      console.error(error);
    });
  }
  console.log()

  useEffect(() => {
    if (chosenLevel) getRandomWords()
}, [chosenLevel])
  

const checkAnswer = (option, optionIndex, correctAnswer) => {
  console.log(optionIndex, correctAnswer)
  if (optionIndex === correctAnswer) {
    setCorrectAnswers([...correctAnswers, option])
    setScore((score) => score + 1)
  } else {
    setScore((score) => score - 1)
  }
  setClicked([...clicked, option])
}
console.log(correctAnswers)
  
  return (
    <div className="App">
    
      {!chosenLevel && <div className="level-selector">
      <h1>Word Association Game</h1>
      <p className='select'>Select Your Level To Start</p>
      <select 
      name="levels"
      id="levels" value={chosenLevel} 
      onChange={(e) => setChosenLevel(e.target.value)} >
        <option value={null}>Select A Level</option>
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
        <option value="4">Level 4</option>
        <option value="5">Level 5</option>
        <option value="6">Level 6</option>
        <option value="7">Level 7</option>
        <option value="8">Level 8</option>
        <option value="9">Level 9</option>
        <option value="10">Level 10</option>
      </select>

    </div>}

    {chosenLevel && words && 
    <div className="question-area">
      <h1>Welcome to Level {chosenLevel}!</h1>
      <h3 className='score-text'>Your score is: {score}</h3>
      
      <div className="questions">

    {words.quizlist.map((question, _questionIndex) => (
      <div key= {_questionIndex} className="question-box">
      {question.quiz.map((tip, _index) => (
      <p key={_index}>{tip}</p>
      ))}
      <div className="question-buttons">
        {question.option.map((option, optionIndex) => (
          <div key={optionIndex} className="question-button">
          <button
          disabled={clicked.includes(option) }
          onClick={() => checkAnswer(option, optionIndex +1, question.correct)}
          >{option}</button>
          {correctAnswers.includes(option) && <p>Correct!</p>}
          </div>
        ))}
      </div>
    </div>
    ))}
    </div>
<button onClick={() => setChosenLevel(null)}>Go Back</button>

</div>}
</div>
)
}

export default App;
