/* @flow */

import React, { Component } from "react";
import { connect } from "react-redux";

import SearchInput from "./SearchInput";

import { MetabaseApi } from "metabase/services";

import { addRemappings } from "metabase/redux/metadata";

import Field from "metabase-lib/lib/metadata/Field";

const MAX_SEARCH_RESULTS = 100;

const mapDispatchToProps = {
    addRemappings
};

type Props = {
    className?: string,

    value: any,
    onChange: () => void,

    autoFocus?: boolean,
    placeholder?: string,
    onFocus?: () => void,
    onBlur?: () => void,

    field: ?Field,
    maxResults?: number,
};

@connect(null, mapDispatchToProps)
export default class FieldSearchInput extends Component {
    props: Props;

    static defaultProps = {
        maxResults: MAX_SEARCH_RESULTS
    };

    search = async (value: String, cancelled: Promise<void>) => {
        const { field, maxResults } = this.props;

        if (!field) {
            return;
        }

        const searchField = field.searchField();
        if (!searchField) {
            return;
        }

        let results = await MetabaseApi.field_search(
            {
                value,
                field,
                searchField,
                maxResults
            },
            { cancelled }
        );

        if (results && field !== searchField) {
            // $FlowFixMe: addRemappings provided by @connect
            this.props.addRemappings(field.id, results);
        }
        return results;
    };

    render() {
        return <SearchInput {...this.props} search={this.search} />;
    }
}
