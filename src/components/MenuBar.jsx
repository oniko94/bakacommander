import React, {Component} from 'react';
import '@/stylesheets/menubar.scss';

export class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
    }

    handleClickBack() {
        const { linkBack, fetchData } = this.props;
        fetchData(linkBack);
    }

    render() {
        return (
            <nav className="menubar">
                <img src="http://localhost:5000/static/img/icon-back.png" onClick={this.handleClickBack}/>
            </nav>
        );
    }
}
