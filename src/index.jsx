import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
import { Switch, Route } from 'react-router-dom';

import './index.scss';
import { ROUTES } from './common/constants';
import EditCareerPathPage from './career_path/EditCareerPathPage';
import CareerPage from './career_path/CareerPathPageV2';
import store from './common/store';
import ProfilePage from './portfolio/views/ProfilePage';
import MainPage from './common/MainPage';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Header />
      {/* <ExamplePage /> */}
      <main>
        <Switch>
          <Route exact path={ROUTES.HOME} component={MainPage} />
          {/* <Route exact path={ROUTES.Catalog.HOME} component={CatalogPage} /> */}
          <Route exact path={ROUTES.CareerPath.HOME} component={CareerPage} />
          <Route path={ROUTES.CareerPath.EDITPAGE} component={EditCareerPathPage} />
          <Route exact path={ROUTES.Portfolio.HOME} component={ProfilePage} />
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
