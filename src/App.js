import axios from 'axios';
import {useState} from 'react';
import './App.css';

const App = () => {

  const [chosenLevel, setChosenLevel] = useState(null)
//we dont want the results tp show straight away, so we put the get request in a function. We 
//want to fetch the data based on the level that we chose. Once we select a level, call the function.
  const getRandomWords = () => {
    
    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {level: '3', area: 'sat'},
      headers: {
        'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
        'x-rapidapi-key': 'd73aae75e7mshdf7403b401a4ec4p19ad3bjsn51f7c6ec7d2b'
      }
    };
    
      axios.request(options).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }
  console.log(chosenLevel)
  
  
  return (
    <div className="App">
      
      <select 
      name="levels"
      id="levels" value={''} 
      onChange={(e) => setChosenLevel(e.target.value)} >
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
      </select>

    </div>
  );
}

export default App;
