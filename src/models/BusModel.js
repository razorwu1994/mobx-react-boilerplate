import { observable, action, autorun, configure } from "mobx";

const destination = observable.box("Busch");

// configure({ enforceActions: "observed" }); // don't allow state modifications outside actions

export default class BusModel {
  id = parseInt(Math.random() * 10);
  @observable route;
  @observable meta = new Map([["status", true]]);

  constructor(id) {
    this.id = id;
    autorun(() => {
      // console.log(`${this.route}, default destination: ${destination.get()} `);
      // console.log(`Key | Value:  ${this.meta}`);
    });
    // destination.observe(function(change) {
    //   console.log(change.oldValue, "->", change.newValue);
    // });
  }
  @action
  changeRoute(route) {
    this.route = route;
  }
  @action
  changeDest(dest) {
    destination.set(dest);
  }

  @action
  changeMeta(key, value) {
    this.meta.set(key, value);
  }
}
