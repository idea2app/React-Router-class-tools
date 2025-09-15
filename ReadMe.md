# React Router class tools

**Class Component** utilities for [React Router][1] 6+

[![CI & CD](https://github.com/idea2app/React-Router-class-tools/actions/workflows/main.yml/badge.svg)][2]

[![NPM](https://nodei.co/npm/react-router-class-tools.png?downloads=true&downloadRank=true&stars=true)][3]

[![Demo](https://codesandbox.io/static/img/play-codesandbox.svg)][4]

## Preview

https://idea2app.github.io/React-Router-class-tools/preview/

## Feature

- [x] `withRouter()` function
- [x] `withRouter()` decorator
- [x] `RouteComponentProps`
- [ ] `this.props.history`
- [x] `this.props.location`
- [x] `this.props.match`
- [ ] Static Context
- [x] `this.props.query`: the missing **Query object**

## Usage

```tsx
import { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-class-tools';

type RoutePageProps = RouteComponentProps<
    { id: string },
    {},
    { extra: number }
>;

@withRouter
export class RoutePage extends PureComponent<RoutePageProps> {
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
```

## Reference

1. https://github.com/remix-run/react-router/issues/8146
2. https://segmentfault.com/a/1190000041700003

## User case

1. https://github.com/idea2app/React-MobX-Bootstrap-ts
2. https://github.com/idea2app/React-MobX-Ant-Design-ts

[1]: https://reactrouter.com/
[2]: https://github.com/idea2app/React-Router-class-tools/actions/workflows/main.yml
[3]: https://nodei.co/npm/react-router-class-tools/
[4]: https://codesandbox.io/s/react-class-router-1y99mv
