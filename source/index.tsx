import { Constructor, parseURLData } from 'web-utility';
import { Location } from 'history';
import { Component, ComponentClass, ErrorInfo, FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Types come from https://cdn.jsdelivr.net/npm/@types/react-router/index.d.ts

export interface StaticContext {
    statusCode?: number | undefined;
}

export interface match<
    Params extends Partial<Record<keyof Params, string>> = {}
> {
    url: string;
    path: string;
    params: Params;
}

export interface RouteComponentProps<
    Params extends Partial<Record<keyof Params, string>> = {},
    Context extends StaticContext = StaticContext,
    Query extends Record<string, any> = {}
> {
    location?: Location;
    match?: match<Params>;
    query?: Query;
    staticContext?: Context;
}

const HooksWrapper: FC<{ ClassComponent: ComponentClass }> = ({
    ClassComponent
}) => {
    const location = useLocation(),
        params = useParams();

    const { pathname = '/', search = '', hash = '' } = location;

    const path = pathname + search + hash;

    const match = {
            url: globalThis.location.origin + path,
            path,
            params
        },
        query = parseURLData(search);

    return <ClassComponent {...{ location, match, query }} />;
};

/**
 * @see https://v5.reactrouter.com/web/api/withRouter
 *
 * @example
 * ```tsx
 * import { Component } from 'react';
 * import { RouteComponentProps, withRouter } from 'react-router-class-tools';
 *
 * @withRouter
 * export class PageWithRouterDecorator extends Component<RouteComponentProps> {
 *     render() {
 *         const { location, match, query } = this.props;
 *
 *         return (
 *             <pre>{JSON.stringify({ location, match, query }, null, 4)}</pre>
 *         );
 *     }
 * }
 * ```
 *
 * @example
 * ```tsx
 * import { Component } from 'react';
 * import { RouteComponentProps, withRouter } from 'react-router-class-tools';
 *
 * export default withRouter(class PageWithRouterFunction extends Component<RouteComponentProps> {
 *     render() {
 *         const { location, match, query } = this.props;
 *
 *         return (
 *             <pre>{JSON.stringify({ location, match, query }, null, 4)}</pre>
 *         );
 *     }
 * }
 * ```
 */
export const withRouter = <
    P extends RouteComponentProps,
    C extends ComponentClass<P>
>(
    Class: C,
    context?: ClassDecoratorContext<C>
) =>
    class ComponentWithRouter extends (Class as Constructor<Component<P>>) {
        static WrappedComponent = Class;
        static displayName = `withRouter(${Class.displayName || Class.name})`;

        static getDerivedStateFromProps(
            nextProps: Readonly<P>,
            prevState: Readonly<{}>
        ) {
            return {};
        }

        static getDerivedStateFromError(error: Error) {}

        state: Readonly<{}> = {};

        componentDidMount() {}

        getSnapshotBeforeUpdate(
            prevProps: Readonly<P>,
            prevState: Readonly<{}>
        ) {}

        shouldComponentUpdate(
            nextProps: Readonly<P>,
            nextState: Readonly<{}>,
            nextContext: any
        ) {
            return true;
        }

        componentDidUpdate(
            prevProps: Readonly<P>,
            prevState: Readonly<{}>,
            snapshot?: any
        ) {}

        componentDidCatch(error: Error, errorInfo: ErrorInfo) {}

        componentWillUnmount() {}

        render() {
            return <HooksWrapper ClassComponent={Class} />;
        }
    };
