import React from 'react'
import ReactDOM from 'react-dom'
import GuessGame from './components/GuesGame'
import Test from './components/Test'



 
ReactDOM.render(<GuessGame />,document.getElementById('app'))


// window.addEventListener('keypress',function(e){
//     ReactDOM.render(<GuessGame guessLetter={e.key} />,document.getElementById('app'))
//  })

