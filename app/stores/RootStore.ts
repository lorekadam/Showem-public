import { createContext } from "react";
import { create } from "mobx-persist";
import { AsyncStorage } from "react-native";
import { UserStore } from "./UserStore";
import { GameStore } from "./GameStore";
import { HistoryStore } from "./HistoryStore";
import { TimerStore } from "./TimerStore";
import { CategoryStore } from "./CategoryStore";

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

export class RootStore {
  userStore = new UserStore(this);
  gameStore = new GameStore(this);
  historyStore = new HistoryStore(this);
  timerStore = new TimerStore(this);
  categoryStore = new CategoryStore(this);

  constructor() {
    hydrate("user", this.userStore);
    hydrate("game", this.gameStore);
    hydrate("history", this.historyStore);
    hydrate("category", this.categoryStore);
  }
}

export const RootStoreInited = new RootStore();
export const RootStoreContext = createContext(RootStoreInited);
