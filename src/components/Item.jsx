import React, {Component} from 'react';
import '@/stylesheets/item.scss';

export class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.loadTime);
    }

    render() {
        const item = this.props.item;
        const itemType = item.type === 'Directory' ? 'folder' : 'file';
        if (this.state.hidden) {
            return '';
        }
        return (
            <li className="item">
                <img src={`http://localhost:5000/static/img/icon-${itemType}.png`}/>
                <span data-link={item.link}>{ item.name }</span>
            </li>
        );
    }
}
