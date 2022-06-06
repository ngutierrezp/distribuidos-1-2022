import Home from "./views/Home";
import Pokemon from "./views/Pokemon";
import NotFound from "./views/NotFound";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/pokemon",
    name: "pokemon",
    component: Pokemon,
  },
  {
    path: "/pokemon/:id",
    name: "pokemon show",
    component: Pokemon,
  },
  {
    name: "not-found",
    path: "*",
    component: NotFound,
  },
];

export default routes;
