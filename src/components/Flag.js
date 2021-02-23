import React from 'react'

export default class Flag extends React.Component {

   
    render(){
        return (
            <div>
                <img src={this.props.flag} width="500px" height="800px" />
            </div>
        )
    }
}