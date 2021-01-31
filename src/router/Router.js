import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Navbar from "../components/Navbar/Navbar";

function AppRouter() {
  return (
    <Router>
      <Navbar/>
      <Switch>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
      </Switch>
    </Router>
  );
}

export default AppRouter;
