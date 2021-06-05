import React from 'react';
import './Board.css';
import Cube from './Cube.js';


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.grid = React.createRef();
        this.content = new Array(props.cubes).fill(null).map((element, i) => {
            return <Cube key={i} id={10} name='Mateo' />;
        });
    }

    componentDidMount() {
        this.props.onGridMount(this.grid.current);
    }

    render() {
        return (
            <section className='grid' ref={this.grid} >
                {this.content}
            </section>
        );
    }
}

export default Board;