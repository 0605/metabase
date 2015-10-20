import React, { Component, PropTypes } from "react";

import LoadingSpinner from "metabase/components/LoadingSpinner.jsx";

import cx from "classnames";

export default class DatabaseList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        databases: PropTypes.array,
        hasSampleDataset: PropTypes.bool,
        ENGINES: PropTypes.object
    };

    render() {
        let { databases, hasSampleDataset, ENGINES } = this.props;

        return (
            <div className="wrapper">
                <section className="PageHeader clearfix">
                    <a className="Button Button--primary float-right" href="/admin/databases/create">Add database</a>
                    <h2 className="PageTitle">Databases</h2>
                </section>
                <section>
                    <table className="ContentTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Engine</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { databases ?
                                databases.map(database =>
                                    <tr>
                                        <td>
                                            <a className="text-bold link" href={"/admin/databases/"+database.id}>{database.name}</a>
                                        </td>
                                        <td>
                                            {ENGINES[database.engine].name}
                                        </td>
                                        <td className="Table-actions">
                                            <button className="Button Button--danger" onClick={() => confirm("Are you sure?") && this.props.delete(database.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            :
                                <tr>
                                    <td colspan={4}>
                                        <LoadingSpinner />
                                        <h3>Loading ...</h3>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    { !hasSampleDataset ?
                        <div className="pt4">
                            <span className={cx("p2 text-italic", {"border-top": databases && databases.length > 0})}>
                                <a className="text-grey-2 text-brand-hover no-decoration" href="" onClick={this.props.addSampleDataset}>Bring the sample dataset back</a>
                            </span>
                        </div>
                    : null }
                </section>
            </div>
        );
    }
}
