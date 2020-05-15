import React from 'react';

class Character extends React.Component {

    render() {
        return (
            <div className="char">
                <div className="imageHolder">
                    <img src={this.props.image} alt="character">

                    </img>
                </div>
                <div className="characterData">
                    <p><b>Name: </b>{this.props.name}</p>
                    <p><b>Status: </b>{this.props.status}</p>
                    <p><b>Species: </b>{this.props.species}</p>
                    <p><b>Gender: </b>{this.props.gender}</p>
                    <p><b>No. of episodes: </b>{this.props.episode}</p>
                </div>
            </div>
        )
    }
};

export default Character;