import React, {Component} from 'react';
import '@/stylesheets/menubar.scss';

export class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }

    handleClickBack() {
        const { fetchData } = this.props;
        const { name, link_back, home_dir } = this.props.payload;

        if (name === home_dir) {
            return;
        }
        fetchData(link_back);
    }

    disableButton() {
        const { name, home_dir } = this.props.payload;

        if (name === home_dir) {
            return 'disabled';
        }

        return '';
    }

    render() {
        return (
            <div className="menubar__inner upper">
                <img src="http://localhost:5000/static/img/icon-back.png" onClick={this.handleClickBack} className={this.disableButton()}/>
            </div>
        );
    }
}
