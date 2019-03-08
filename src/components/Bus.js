import React from "react";
import { observer } from "mobx-react";

const Bus = observer(({ bus, children }) => (
  <li>
    Bus Route {bus.id}{" "}
    <input
      type="text"
      onChange={event => {
        bus.changeRoute(event.target.value); //Good
        // bus.route = event.target.value; //Bad
      }}
    />{" "}
    {...children}
  </li>
));

export default Bus;
