import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";
import "babel-polyfill";
import BusList from "./models/BusList";
import BusListView from "./components/BusListView";
const store = new BusList();

render(
  <div>
    <BusListView store={store} />
    <DevTools />
  </div>,
  document.getElementById("root")
);

store.addBus(0);
store.addBus(1);

// playing around in the console
window.store = store;
