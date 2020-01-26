import React from 'react';
import {Item} from '@/components/Item';

export default function ItemList(props) {
    const items = props.index.map((item) => {
        let i = props.index.indexOf(item);
        return <Item key={i.toString()} item={item} loadTime={i * 50}/>
    });
    return <ul>{items}</ul>;
}
