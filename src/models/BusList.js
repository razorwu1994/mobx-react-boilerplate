import { observable, computed, action, autorun, when } from "mobx";
import BusModel from "./BusModel";

export default class BusList {
  @observable busList = [];

  constructor() {
    autorun(() => {
      console.log(`Bus Number: ${this.busList.length}`);
    });
    when(
      // once...
      () => this.busNumber > 3,
      // ... then
      () => console.log("Too much")
    );
  }

  @computed
  get busSchedule() {
    return this.busList.find(bus => bus.route === route);
  }

  @computed
  get busNumber() {
    return this.busList.length;
  }
  /**
   *
   * @param {Object} params
   * @param {String} params.route - bus route name
   * @param {String} params.meta -bus meta data, such as schedule,coordinate
   * @param {String} params.id -bus id data
   */
  @action
  addBus(params) {
    this.busList.push(new BusModel(params));
  }

  @action
  removeBus(id) {
    return this.busList.splice(this.busList.findIndex(bus => bus.id === id), 1);
  }

  //actions only apply to the current stack !
  @action
  fetchBuses() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }).then(result => {
      this.busList = [new BusModel(0), new BusModel(1), new BusModel(2)];
    });
  }

  // @action.bound
}
