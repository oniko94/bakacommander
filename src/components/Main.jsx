import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPayload, getPayloadPending, getPayloadError } from "@/reducers";
import {Item} from '@/components/Item';
import {MenuBar} from '@/components/MenuBar';
import {PathBar} from '@/components/PathBar';
import fetchIndexAction from '@/requests/fetchIndex';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
        this.isDirOrFile = this.isDirOrFile.bind(this);
    }

    componentDidMount() {
        const { fetchIndex } = this.props;
        fetchIndex();
    }

    shouldComponentRender() {
        const dataFetched = Object.entries(this.props.payload).length > 0;
        return !this.props.pending && dataFetched;
    }

    isDirOrFile(content) {
        if (Array.isArray(content)) {
            return content.map((item) => {
                let i = content.indexOf(item);
                return <Item key={i.toString()} item={item} loadTime={i * 50} fetchData={this.props.fetchIndex}/>
            });
        } else {
            return <pre>{content}</pre>;
        }
    }

    render() {
        const { payload, error } = this.props;
        let content, currentPath;

        if (!this.shouldComponentRender()) {
            content = <h1>Loading data...</h1>;
            currentPath = '';
        } else {
            content = this.isDirOrFile(payload.content);
            currentPath = payload.name;
        }

        if (error) {
            console.error(error);
            content = <h1 style="color: red">{error}</h1>;
            currentPath = '';
        }

        return (
            <div>
                <nav className="menubar">
                    <MenuBar payload={this.props.payload} fetchData={this.props.fetchIndex}/>
                    <PathBar currentPath={currentPath}/>
                </nav>
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
