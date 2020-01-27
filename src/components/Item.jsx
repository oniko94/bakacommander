import React, {Component} from 'react';
import '@/stylesheets/item.scss';

export class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.loadTime);
    }

    handleClick(ev) {
        const { fetchData } = this.props;
        const link = ev.target.dataset.link;
        fetchData(link);
    }

    render() {
        const item = this.props.item;
        const itemType = item.type === 'Directory' ? 'folder' : 'file';
        if (this.state.hidden) {
            return '';
        }
        return (
            <div className="item">
                <img src={`http://localhost:5000/static/img/icon-${itemType}.png`}/>
                <span data-link={item.link} onClick={this.handleClick}>{ item.name }</span>
            </div>
        );
    }
}
