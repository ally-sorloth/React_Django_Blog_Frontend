import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "../pages/HomePage/MainPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Navbar from "../components/Navbar/Navbar";
import { CustomPostPage } from "../pages/CustomPostPage/CustomPostPage";
import { PostDetail } from "../pages/PostDetail/PostDetail";
import PrivateRouter from "./PrivateRouter";
import { Suspense } from "react";


function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback="">
        <Router>
          <Navbar/>
          <Switch>
              <Route path="/register" component={RegisterPage} exact/>
              <Route path="/login" component={LoginPage} exact/>
              <Route path="/" component={MainPage} exact/>
              <PrivateRouter exact path="/detail/:slug" component={PostDetail}/>
              <PrivateRouter exact path="/profile" component={ProfilePage}/>

              <Route exact path="/create" component={CustomPostPage} />
              <Route exact path="/edit/:slug" component={CustomPostPage} />
          </Switch>
        </Router>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
