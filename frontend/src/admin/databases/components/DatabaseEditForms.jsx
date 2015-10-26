import React, { Component, PropTypes } from "react";

import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper.jsx";
import DatabaseDetailsForm from "metabase/components/database/DatabaseDetailsForm.jsx";

import cx from "classnames";

export default class DatabaseEditForms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formError: null
        };
    }

    static propTypes = {};
    static defaultProps = {};

    async detailsCaptured(database) {
        this.setState({ formError: null })
        try {
            await this.props.save(database, database.details);
        } catch (error) {
            this.setState({ formError: error })
        }
    }

    render() {
        let { database, details, hiddenFields, ENGINES } = this.props;
        let { formError } = this.state;
        let errors = {};
        return (
            <LoadingAndErrorWrapper loading={!database} error={null}>
                {() =>
                    <div>
                        <div className={cx("Form-field", { "Form--fieldError": errors["engine"] })}>
                            <label className="Form-label Form-offset">Database type: <span>{errors["engine"]}</span></label>
                            <label className="Select Form-offset mt1">
                                <select className="Select" value={database.engine} onChange={(e) => this.props.selectEngine(e.target.value)}>
                                    <option value="" disabled>Select a database type</option>
                                    {Object.keys(ENGINES).map(engine =>
                                        <option value={engine}>{ENGINES[engine].name}</option>
                                    )}
                                </select>
                            </label>
                        </div>

                        { database.engine ?
                            <DatabaseDetailsForm
                                details={{ ...details, name: database.name }}
                                engine={database.engine}
                                formError={formError}
                                hiddenFields={hiddenFields}
                                submitFn={this.detailsCaptured.bind(this)}
                                submitButtonText={'Save'}>
                            </DatabaseDetailsForm>
                        : null }
                    </div>
                }
            </LoadingAndErrorWrapper>
        );
    }
}
