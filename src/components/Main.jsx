import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPayload, getPayloadPending, getPayloadError } from "@/reducers";
import {Item} from '@/components/Item';
import {MenuBar} from '@/components/MenuBar';
import fetchIndexAction from '@/requests/fetchIndex';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentDidMount() {
        const { fetchIndex } = this.props;
        fetchIndex();
    }

    shouldComponentRender() {
        const dataFetched = Object.entries(this.props.payload).length > 0;
        return !this.props.pending && dataFetched;
    }

    render() {
        const {payload, error, pending} = this.props;
        let content;

        if (!this.shouldComponentRender()) {
            return <h1>Loading data...</h1>;
        }

        if (error) {
            console.error(error);
            return <h1 style="color: red">{error}</h1>;
        }

        if (Array.isArray(payload.content)) {
            content = payload.content.map((item) => {
                let i = payload.content.indexOf(item);
                return <Item key={i.toString()} item={item} loadTime={i * 50} fetchData={this.props.fetchIndex}/>
            });
        } else {
            content = <pre>{payload.content}</pre>;
        }

        return (
            <div>
                <MenuBar payload={this.props.payload} fetchData={this.props.fetchIndex}/>
                <section className="item--container" id="tree">{content}</section>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: getPayloadError(state),
    payload: getPayload(state),
    pending: getPayloadPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchIndex: fetchIndexAction
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
