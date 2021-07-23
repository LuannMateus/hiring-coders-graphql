import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';

const Router = () => {
  return (
    <Switch>
      <Route exact path={['', '/']} component={Home} />
      <Route exact path="/sign-in" component={SignIn} />
    </Switch>
  );
};

export default Router;
