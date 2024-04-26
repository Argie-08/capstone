import Explore from "./view/Explore";
import Home from "./view/Home";
import Shop from "./view/Shop";
import Register from "./view/Register";
import LogIn from "./view/LogIn";
import CheckOut from "./view/CheckOut";
import { Route, Routes } from "react-router-dom";

const routes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/shop" exact>
          <Shop />
        </Route>
        <Route path="/explore" exact>
          <Explore />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/log-in" exact>
          <LogIn />
        </Route>
        <Route path="/checkout" exact>
          <CheckOut />
        </Route>
      </Routes>
    </div>
  );
};

// const routes = [
//   {
//     name: "HOME",
//     path: "/",
//     element: <Home />,
//   },
//   {
//     name: "SHOP",
//     path: "/shop",
//     element: <Shop />,
//   },
//   {
//     name: "EXPLORE",
//     path: "/explore",
//     element: <Explore />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/log-in",
//     element: <LogIn />,
//   },
//   {
//     path: "/checkout",
//     element: <CheckOut />,
//   },
// ];
export default routes;
