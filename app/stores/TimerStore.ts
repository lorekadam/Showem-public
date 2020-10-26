// import dayjs from 'dayjs';
import { action, computed, observable } from "mobx";
import { RootStore } from "./RootStore";

const padZero = (n: number) => {
  if (n >= 10) {
    return n;
  }

  return `0${n}`;
};

export class TimerStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // @observable startTime = dayjs();
  timeout = null;
  @observable isRunning = false;
  @observable seconds = 0;
  @observable max = 0;

  @action measure() {
    if (!this.isRunning) return;
    if (this.seconds > 0) {
      clearTimeout(this.timeout);
      this.seconds = this.seconds - 1;
      this.timeout = setTimeout(() => this.measure(), 1000);
    }
  }

  @action startTimer(max?: number) {
    this.isRunning = true;
    // this.startTime = dayjs();
    if (max) {
      this.seconds = max;
    }
    this.measure();
  }

  @action stopTimer() {
    this.isRunning = false;
    this.seconds = 0;
  }

  @action pauseTimer() {
    clearTimeout(this.timeout);
  }

  @computed get percent() {
    return `${Math.min(100, (this.seconds / 180) * 100)}%`;
  }

  @computed get display() {
    const minutes = Math.floor(this.seconds / 60);
    const seconds = this.seconds % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
  }
}
