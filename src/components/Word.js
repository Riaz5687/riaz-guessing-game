import React from 'react'

export default class Word extends React.Component {

    
    state = {
        word :[] ,
        guessedWord : [],
        limit: 0,
        status: ''
    }

    componentDidMount = () => {
        window.addEventListener('keypress',this.handleKeyPress)
    }

    componentWillUnmount = () => {
        window.removeEventListener()
    }

    handleKeyPress = (e) => {
       const latter = e.key.toLowerCase()
       this.makeGuess(latter)
    }

    static getDerivedStateFromProps = (props,state) => {
       
        if(props.word !== state.word.join('')){
            const limit = Math.floor(props.word.split('').length * 0.3) 
            const status = `${limit} guesses are remianing`
           return {
               word : props.word.split(''),
               guessedWord: [],
               limit,
               status
           } 
        } else {
            return null
        } 
       
    } 
    


    
    makeGuess = (latter) => {
        if(this.state.limit === 0 || this.state.status === 'Excelent! you have guessed the word'){
            return 
        }
        const {word,guessedWord} = this.state
        const isUnique = !guessedWord.includes(latter)
        const isBadGuess = !word.includes(latter)
        if(isUnique){
            this.setState((prevState)=>({ guessedWord: prevState.guessedWord.concat(latter) }))
        }
        if(isUnique && isBadGuess){
            this.setState((prevState) => {
                return {
                    limit: prevState.limit - 1
                }
            })
        }

        this.calucMessage()
    }

    calucMessage = () => {
        let status = ''
        const isMatched = this.state.word.every((letter)=>{
            return this.state.guessedWord.includes(letter) || letter === ' '
        })

        if(isMatched){
            status = `Excelent! you have guessed the word`
            this.props.handleCorrectGuesses()
        } else if(this.state.limit === 0) {
            status = `Nice try! the word was ${this.state.word.join('')} `
            this.props.handleIncorrectGuesses()
        } else {
            status = `${this.state.limit} guess remianing`
        }
        this.setState(()=>({ status }))
    }



    getPuzzle = (word,guessedWord) => {
        let puzzle = ''
        word.forEach((letter)=>{
            if(guessedWord.includes(letter) || letter === ' '){
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
        return puzzle
    }

    

    render(){
        return (
            <div>
                <p>{ this.getPuzzle(this.state.word,this.state.guessedWord) }</p>
                <p>{ this.state.status }</p>
            </div>
        )
    }
}

