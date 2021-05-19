import './App.css';
import './styles/Navbar.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Customers from './components/pages/Customers';
import ManageCustomers from './components/pages/ManageCustomers';
import HistoryLogs from './components/pages/HistoryLogs';
import SignIn from './components/pages/SignIn';
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/customers" component={Customers} />
        <Route path="/manage-customers" component={ManageCustomers} />
        <Route path="/history-logs" component={HistoryLogs} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
