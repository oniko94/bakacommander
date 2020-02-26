import React, {Component} from 'react';
import '@/stylesheets/item.scss';

export class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { loadTime } = this.props;
        setTimeout(() => {
            this.setState({hidden: false});
        }, loadTime);
    }

    handleClick(ev) {
        const { fetchData, item } = this.props;
        const link = item.link;
        fetchData(link);
    }

    render() {
        const { item } = this.props;
        const itemType = item.type === 'Directory' ? 'folder' : 'file';
        if (this.state.hidden) {
            return '';
        }
        return (
            <div className="item" onClick={this.handleClick}>
                <img src={`http://localhost:5000/static/img/icon-${itemType}.png`}/>
                <span>{ item.name }</span>
            </div>
        );
    }
}
