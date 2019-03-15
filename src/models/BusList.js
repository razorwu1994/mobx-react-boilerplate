import {
  observable,
  computed,
  action,
  autorun,
  when,
  reaction,
  runInAction
} from "mobx";
import BusModel from "./BusModel";

export default class BusList {
  @observable busList = []; //busList = observable([])

  constructor() {
    /**#3 reactions
     * autorun,when,reaction
     */
    autorun(() => {
      console.log(`Bus Number: ${this.busList.length}`);
      //console.log(`Bus Number: ${this.busList[0]}`);//bad
    });
    when(
      // once...
      () => this.busNumber > 3,
      // ... then
      () => console.log("Too much")
    );
    reaction(
      () => this.busList.length * 100,
      (data, reaction) => {
        console.log("busList  times 100 ", data);
      },
      {}
    ); //options?
  }

  /**#1
   *
   *
   *
   *
   * #2 : produce the value based on state without mutating
   *
   */
  //The get syntax binds an object property to a function that will be called when that property is looked up.
  @computed
  get busSchedule() {
    return this.busList.find(bus => bus.route === route);
  }

  @computed
  get busNumber() {
    return this.busList.length;
  }

  /**
   * #4
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

  /**
   * #4 async
   *
   * actions only apply to the current stack !
   *  */

  @action
  async fetchBuses() {
    let result = await this.fetchHelper();
    this.busList = result;
    this.busList.push(new BusModel(3));
    this.busList.push(new BusModel(4));
    // runInAction(() => {
    //   this.busList.push(new BusModel(3));
    //   this.busList.push(new BusModel(4));
    // });
  }
  @action
  fetchHelper() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }).then(result => {
      return [new BusModel(0), new BusModel(1), new BusModel(2)];
    });
  }
  // @action.bound , only consider this if you don't use arrow function
}
