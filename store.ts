import { createContext, useContext } from "react";
import { makeAutoObservable, observable, configure, action } from "mobx";
import { User } from "./types";

configure({ enforceActions: "never" });

class Store {
  @observable user = null as unknown as User;

  constructor() {
    makeAutoObservable(this);
  }

  @action setUser = (user: User) => {
    this.user = user;
  };
}

// Instantiate the counter store.
const store = new Store();
// Create a React Context with the counter store instance.
export const storeContext = createContext(store);
export const useStore = () => useContext(storeContext);
