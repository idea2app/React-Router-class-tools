import { Component, ReactNode } from 'react';

import { RouteComponentProps, withRouter } from '../../../source';

interface State {
    count: number;
}

@withRouter
export class PageWithRouterDecorator extends Component<
    RouteComponentProps<{}, {}, {}> & {
        children: ReactNode;
        string: string;
        node: ReactNode;
    },
    State
> {
    state: Readonly<State> = { count: 0 };

    componentDidMount() {
        this.setState({ count: this.state.count + 1 });
    }

    countUp = () => this.setState({ count: this.state.count + 1 });
    countDown = () => this.setState({ count: this.state.count - 1 });

    render() {
        const { location, match, query, children, string, node } = this.props;

        return (
            <>
                <h1>@withRouter</h1>
                <ul>
                    <li>Location: {location.pathname + location.search}</li>
                    <li>Match: {JSON.stringify(match)}</li>
                    <li>Query: {JSON.stringify(query)}</li>
                    <li>string: {string}</li>
                    <li>node: {node}</li>
                    <li>count: {this.state.count}</li>
                </ul>
                {children}
                <button onClick={this.countUp}>count up</button>
                <button onClick={this.countDown}>count down</button>
            </>
        );
    }
}
