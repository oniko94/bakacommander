import React from 'react';

export default function ItemList(props) {
    const items = props.index.map((item) => {
        let i = props.index.indexOf(item);
        return (
            <li key={i.toString()}>
                <span data-link={item.link}>{ item.name }</span>
            </li>
        );
    });
    return <ul>{items}</ul>;
}