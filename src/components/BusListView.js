import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Bus from "./Bus";

@observer
export default class BusListView extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div>
        {store.busList.map(bus => (
          <React.Fragment>
            <Bus
              bus={bus}
              key={bus.id}
              children={
                <React.Fragment>
                  <button onClick={() => store.removeBus(bus.id)}>X</button>
                  <select onClick={event => bus.changeDest(event.target.value)}>
                    <option value="CAC">CAC</option>
                    <option value="Busch">Busch</option>
                    <option value="Livingston">Livingston</option>
                    <option value="Douglas">Douglas</option>
                  </select>
                  <button
                    onClick={() => {
                      //value is changing but not listened
                      bus.changeMeta("something", !bus.meta.get("something"));
                    }}
                  >
                    Toggle Status
                  </button>
                </React.Fragment>
              }
            />
          </React.Fragment>
        ))}
        <button onClick={() => store.addBus(store.busNumber)}>
          Create Route
        </button>
        <button onClick={() => store.fetchBuses()}>Fetch Buses</button>
      </div>
    );
  }
}
