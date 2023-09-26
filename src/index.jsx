import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
// import messages from './i18n';
import { Route, Switch } from 'react-router';
// import appMessages from './i18n';
// import ExamplePage from './example/ExamplePage';

import './index.scss';
import { ROUTES } from './common/constants';
import { CatalogPage } from './catalog/CatalogPage';
// import { CareerPathPage } from './career_path/CareerPathPage';
import EditCareerPathPage from './career_path/EditCareerPathPage';
import CareerPage from './career_path/CareerPathPageV2';
import store from './common/store';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Header />
      {/* <ExamplePage /> */}
      <main>
        <Switch>
          {/* <Route exact path={ROUTES.HOME} component={ExamplePage} /> */}
          <Route exact path={ROUTES.Catalog.HOME} component={CatalogPage} />
          <Route exact path={ROUTES.HOME} component={CareerPage} />
          <Route path={ROUTES.CareerPath.EDITPAGE} component={EditCareerPathPage} />
        </Switch>
      </main>
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    // appMessages,
    headerMessages,
    footerMessages,
  ],
});
