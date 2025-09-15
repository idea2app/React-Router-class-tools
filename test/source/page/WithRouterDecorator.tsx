import { Component } from 'react';

import { RouteComponentProps, withRouter } from '../../../source';

@withRouter
export class PageWithRouterDecorator extends Component<RouteComponentProps> {
    someMethod() {}

    render() {
        const { location, match, query } = this.props;

        return (
            <>
                <h1>@withRouter</h1>
                <ul>
                    <li>Location: {location.pathname + location.search}</li>
                    <li>Match: {JSON.stringify(match)}</li>
                    <li>Query: {JSON.stringify(query)}</li>
                </ul>
            </>
        );
    }
}
