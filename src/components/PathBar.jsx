import React, { Component } from 'react';
import '@/stylesheets/menubar.scss';

export class PathBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { currentPath } = this.props;
        if (currentPath.startsWith('C:/')) {
            currentPath = currentPath.split('/').join('\\');
        }
        return (
            <div className="menubar__inner lower">
                <input type="text" value={currentPath} disabled/>
            </div>
        );
    }
}

