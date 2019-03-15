import { observable, action, autorun, configure, reaction } from "mobx";
// configure({ enforceActions: "observed" }); // don't allow state modifications outside actions

/**#1 */
const destination = observable.box("Busch"); //JS primitives,null,undef,boolean,string,number

export default class BusModel {
  /**#1
   *
   *
   *
   * meta=observable({status:true})
   * meta=observable(new Map([["status", true]]))
   */

  id = parseInt(Math.random() * 10);
  @observable route;
  @observable meta = new Map([["status", true]]);

  constructor(id) {
    this.id = id;
    /**#3 reactions
     * autorun
     */
    autorun(() => {
      // console.log(`${this.route}, default destination: ${destination.get()} `);
      // console.log(`Key | Value:  ${this.meta}`);
    });
    // destination.observe(function(change) {
    //   console.log(change.oldValue, "->", change.newValue);
    // });
  }

  /**
   * #4
   */
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
