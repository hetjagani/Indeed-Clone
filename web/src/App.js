import './App.css';
import Login from './login/Login';
import Register from './login/Register'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
