import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from './source/index';

// NEW: Decorator usage (ES Decorator stage-3)
@withRouter
export class RoutePage extends PureComponent<
    RouteComponentProps<{ id: string }, {}, { extra: number }>
> {
    render() {
        const { id } = this.props.match.params,
            { extra } = this.props.query;

        return (
            <ul>
                <li>ID: {id}</li>
                <li>extra: {extra}</li>
            </ul>
        );
    }
}

// OLD: HOC usage (still works for backward compatibility)
class RoutePageHOC extends PureComponent<
    RouteComponentProps<{ id: string }, {}, { extra: number }>
> {
    render() {
        const { id } = this.props.match.params,
            { extra } = this.props.query;

        return (
            <ul>
                <li>ID: {id}</li>
                <li>extra: {extra}</li>
            </ul>
        );
    }
}
export default withRouter(RoutePageHOC);
