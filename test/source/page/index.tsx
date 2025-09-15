import { createRoot } from 'react-dom/client';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import { documentReady } from 'web-utility';

import PageWithRouterFunction from './WithRouterFunction';
import { PageWithRouterDecorator } from './WithRouterDecorator';

documentReady.then(() =>
    createRoot(document.body).render(
        <HashRouter>
            <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/">Home page</Link>
                <Link to="/with/router/function/1?debug=true">
                    withRouter()
                </Link>
                <Link to="/with/router/decorator/2?debug=true">
                    @withRouter
                </Link>
            </nav>
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route
                    path="/with/router/function/:order"
                    element={<PageWithRouterFunction />}
                />
                <Route
                    path="/with/router/decorator/:order"
                    element={<PageWithRouterDecorator />}
                />
            </Routes>
        </HashRouter>
    )
);
