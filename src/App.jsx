import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/status')
    .then(resp => resp.json())
    .then(resp => console.log('Fetch Response:', resp))
    .catch(err => console.log('Fetch Error:', err));
  }, []);

  return (
    <>
      <h1>My React APP</h1>
    </>
  )
}

export default App
