import React from 'react'
import Flag from './Flag'
import Word from './Word'
import request from '../requests/countries'

export default class GuessGame extends React.Component {
   
   
    state = {
        countries:[],
        filteredCountries:[],
        country:{},
        correctGuesses:0,
        incorrectGuesses:0
    }

    handleCorrectGuesses = () => {
        this.setState((prevState)=>{
            return {
                correctGuesses: prevState.correctGuesses + 1
            }
        })
    }

    handleIncorrectGuesses = () => {
        this.setState((prevState)=>{
            return {
                incorrectGuesses: prevState.incorrectGuesses + 1
            }
        })
    }


    pickRandomNum(countries){
        return Math.floor(Math.random() * countries.length)
    }

    componentDidMount(){

        // Request for all countries and update the state
        const response = request()
        response.then((countries)=>{
            const country = countries[this.pickRandomNum(countries)]
            this.setState(()=>({countries,country}))
        }).catch((e)=>{
            console.log("Error",e)
        })
    }

    onNextWord = () => {
        const { filteredCountries, countries } = this.state
        let country 
        if(filteredCountries.length !== 0){
            country = filteredCountries[this.pickRandomNum(filteredCountries)]
        } else {
            country = countries[this.pickRandomNum(countries)]
        }
        this.setState(()=>({country}))
    }

    onResetGame = () => {
       this.setState(()=>({ incorrectGuesses:0,correctGuesses:0 }))
       this.onNextWord()
    }

    onFilterCountries = (e) => {
        const continent = e.target.value
        const filteredCountries = this.state.countries.filter((country)=>{
            return country.region === continent
        })
        const country = filteredCountries[this.pickRandomNum(filteredCountries)]
        this.setState(()=>({ filteredCountries, country }))
    }

    render(){
        return (
            <div>
                <Flag flag={this.state.country.flag} />
                { this.state.country.name !== undefined &&
                    <Word 
                        word={this.state.country.name.toLowerCase()}
                        handleCorrectGuesses={this.handleCorrectGuesses}
                        handleIncorrectGuesses={this.handleIncorrectGuesses}
                    /> 
                }
                <p>Correct Guesses: { this.state.correctGuesses }</p>
                <p>Incorrect Guesses: { this.state.incorrectGuesses }</p>
                <button onClick={this.onNextWord} >Next</button>
                <button 
                    onClick={this.onResetGame}
                    disabled={this.state.incorrectGuesses === 0 && this.state.correctGuesses === 0}
                >Reset</button>
                <select name="continent" onChange={this.onFilterCountries } >
                    <option value="Africa" >Africa</option>
                    <option value="Americas" >Americas</option>
                    <option value="Asia" >Asia</option>
                    <option value="Europe" >Europe</option>
                    <option value="Oceania" >Oceania</option>
                </select>
            </div>
        )
    }
}

