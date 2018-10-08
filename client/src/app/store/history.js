import { createBrowserHistory } from "history";

export default function(store, action) {
  const history = createBrowserHistory();
  history.listen((location, action) => {
    if (location.pathname.startsWith("/set/")) {
      store.dispatch(action(location.pathname.slice(5)));
    }
    console.log("history changed", location.pathname, action);
  });
  console.log("joder", history);
}
