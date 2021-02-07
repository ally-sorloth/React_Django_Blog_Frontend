import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "../pages/HomePage/MainPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Navbar from "../components/Navbar/Navbar";
import { PostDetail } from "../pages/PostDetail/PostDetail"

function AppRouter() {
  return (
    <Router>
      <Navbar/>
      <Switch>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/detail/:slug" component={PostDetail}/>
          <Route path="/" component={MainPage}/>
      </Switch>
    </Router>
  );
}

export default AppRouter;
