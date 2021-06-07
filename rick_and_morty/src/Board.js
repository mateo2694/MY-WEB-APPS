import React from 'react';
import './Board.css';
import Cube from './Cube.js';


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.grid = React.createRef();
    }

    componentDidMount() {
        this.props.onGridMount(this.grid.current);
    }

    render() {
        const content = this.props.characters.map((character, i) => {
            return <Cube key={i} character={character} onClick={this.props.onCubeClick} />;
        });

        return (
            <section className='grid' ref={this.grid} >
                {content}
            </section>
        );
    }
}

export default Board;