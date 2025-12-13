import { Component, ReactNode } from 'react';

import { RouteComponentProps, withRouter } from '../../../source';

class PageWithRouterFunction extends Component<
    RouteComponentProps & {
        children: ReactNode;
        string: string;
        node: ReactNode;
    }
> {
    render() {
        const { location, match, query, children, string, node } = this.props;

        return (
            <>
                <h1>withRouter()</h1>
                <ul>
                    <li>Location: {location.pathname + location.search}</li>
                    <li>Match: {JSON.stringify(match)}</li>
                    <li>Query: {JSON.stringify(query)}</li>
                    <li>string: {string}</li>
                    <li>node: {node}</li>
                    {children}
                </ul>
            </>
        );
    }
}
export default withRouter(PageWithRouterFunction);
