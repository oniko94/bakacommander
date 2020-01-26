import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPayload, getPayloadPending, getPayloadError } from "@/reducers";
import ItemList from '@/components/ItemList';
import fetchIndexAction from '@/requests/fetchIndex';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this)
    }

    componentDidMount() {
        const { fetchIndex } = this.props;
        fetchIndex();
    }

    shouldComponentRender() {
        let dataFetched = Object.entries(this.props.payload).length > 0;
        return !this.props.pending && dataFetched;
    }

    render() {
        const {payload, error, pending} = this.props;

        if (!this.shouldComponentRender()) {
            return <h1>Loading data...</h1>;
        }
        if (error) {
            console.error(error);
            return <h1 style="color: red">{error}</h1>;
        }
        return <ItemList index={payload.content}/>
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
