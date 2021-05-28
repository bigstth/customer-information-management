import './App.css';
import './styles/Navbar.css';
import Navbar from './components/Navbar';
import { UserStoreProvider } from './context/UserContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './guard/auth';
import Register from './components/forms/Register';
import Customers from './components/pages/Customers';
import Customer from './components/pages/Customer';
import CustomerForm from './components/forms/CustomerForm';
import ManageCustomers from './components/pages/ManageCustomers';
import HistoryLogs from './components/pages/HistoryLogs';
import SignIn from './components/pages/SignIn';
import PDFReport from './report/PDFReport';
function App() {
  return (
    <UserStoreProvider>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/register" component={Register} />

          <PrivateRoute path="/customers">
            <Customers></Customers>
          </PrivateRoute>

          <PrivateRoute path="/customer/:id">
            <Customer></Customer>
          </PrivateRoute>

          <PrivateRoute path="/pdf/:id">
            <PDFReport></PDFReport>
          </PrivateRoute>

          <PrivateRoute path="/create-customer">
            <CustomerForm></CustomerForm>
          </PrivateRoute>

          <PrivateRoute path="/manage-customers">
            <ManageCustomers></ManageCustomers>
          </PrivateRoute>

          <PrivateRoute path="/history-logs">
            <HistoryLogs></HistoryLogs>
          </PrivateRoute>

          <Route path="/sign-in" component={SignIn} />
          <PrivateRoute path="/">
            <Customers></Customers>
          </PrivateRoute>
        </Switch>
      </Router>
    </UserStoreProvider>
  );
}

export default App;
