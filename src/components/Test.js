import React from 'react'
export default class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message: ''
      };
    //   this.handleEnter = this.handleEnter.bind(this);
    //   this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    
    // Change code below this line
    componentDidMount() {
      window.addEventListener('keydown',this.handleKeyPress )
    }

    componentWillUnmount() {
      window.removeEventListener()
    }
    
   
    handleKeyPress = (event) => {
     
        this.setState((state) => ({
            message: state.message + `You pressed the ${event.key}  key! `
          }));
      
    }
    render() {
      return (
        <div>
          <h1>{this.state.message}</h1>
        </div>
      );
    }
  };