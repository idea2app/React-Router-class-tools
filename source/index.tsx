import { Constructor, parseURLData } from 'web-utility';
import { Location } from 'history';
import React, { Component, PureComponent } from 'react';
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
    location: Location;
    match: match<Params>;
    query: Query;
    staticContext?: Context;
}

/**
 * @see https://v5.reactrouter.com/web/api/withRouter
 *
 * Can be used as either:
 * 1. HOC: const Enhanced = withRouter(MyComponent)
 * 2. Decorator: @withRouter class MyComponent extends Component {...}
 */
export function withRouter<
    T extends Constructor<
        Component<RouteComponentProps> | PureComponent<RouteComponentProps>
    >
>(Class: T): T {
    // Create enhanced class constructor that injects router props
    const EnhancedClass = class extends (Class as any) {
        static displayName = `withRouter(${Class.name || 'Component'})`;

        render() {
            // Create a functional wrapper to use hooks
            const RouterHooksWrapper = () => {
                const location = useLocation();
                const params = useParams();

                const { pathname = '/', search = '', hash = '' } = location;
                const path = pathname + search + hash;

                const match = {
                    url: globalThis.location.origin + path,
                    path,
                    params
                };
                const query = parseURLData(search);

                const routerProps = { location, match, query };

                // Create original component with enhanced props
                return React.createElement(Class, {
                    ...this.props,
                    ...routerProps
                });
            };

            return React.createElement(RouterHooksWrapper);
        }
    };

    // Copy static properties from original class
    Object.getOwnPropertyNames(Class).forEach(key => {
        if (key !== 'length' && key !== 'name' && key !== 'prototype') {
            (EnhancedClass as any)[key] = (Class as any)[key];
        }
    });

    return EnhancedClass as unknown as T;
}
