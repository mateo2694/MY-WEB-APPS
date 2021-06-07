import React from 'react';
import './Cube.css';
import loading from './assets/loading.gif';
import heartbeat from './assets/icon-heartbeat.png';
import question from './assets/icon-question.png';
import skull from './assets/icon-skull.png';
import warning from './assets/icon-warning.png';


class Cube extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            glowType: null
        };
        this.GLOW_TIME = 1000;
        this.character = {};
        this.altText = '';
        this.statusIcon = warning;
        this.animation = null;
    }

    render() {
        if (this.props.character === null) {
            this.character = {
                id: null,
                name: null,
                status: 'Warning',
                image: loading
            };
            this.altText = 'Loading';
            this.statusIcon = warning;
            this.animation = null;
        } else {
            this.character = this.props.character;
            this.altText = this.character.name;
            this.animation = 'scale-up-animation';

            switch (this.character.status.toLowerCase()) {
                case 'alive':
                    this.statusIcon = heartbeat;
                    break;
                case 'dead':
                    this.statusIcon = skull;
                    break;
                case 'unknown':
                    this.statusIcon = question;
                    break;
                default:
                // Do nothing
            }
        }

        return (
            <div className={`character ${this.animation} ${this.state.glowType}`} onClick={() => {
                this.setState({
                    glowType: this.props.onClick(this.character.id)
                });

                setTimeout(() => {
                    this.setState({
                        glowType: null
                    });
                }, this.GLOW_TIME);
            }}>
                <div className='cube'>
                    <img className='character__image' src={this.character.image} alt={this.altText} />
                    <div className='character__info text--small text--contrast'>
                        ID: {this.character.id}<br />{this.character.name}
                        <img className='character__status' src={this.statusIcon} alt={this.character.status} />
                    </div>
                </div>
            </div >
        );
    }

}

export default Cube;