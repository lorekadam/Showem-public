import { observable, action } from "mobx";
import { RootStore } from "./RootStore";
import { AvaliableCategories, SingleOption, UserTurn } from "../types";
import { persist } from "mobx-persist";
import { ONE_PER_ROUND } from "../globals";
import { Word } from "../generated/graphql";

export class GameStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @persist @observable gameStarted: boolean = false;

  @persist @observable teamsAmount: number = 2;

  @persist @observable time: number = 0.5;

  @persist("list") @observable players: SingleOption[] = [];

  @persist("object")
  @observable
  avaliableCategories: AvaliableCategories = {};

  @persist("object")
  @observable
  activeAvaliableCategories: { [id: string]: boolean } = {};

  @persist("list")
  @observable
  gameWords: Word[] = [];

  @persist("list")
  @observable
  usedGameWords: Word[] = [];

  @persist("object")
  @observable
  randomWord: Word = null;

  @persist("list") @observable teams: SingleOption[][] = [];

  @persist("object") @observable userTurn: UserTurn = {
    team: 0,
    user: 0,
  };

  @persist("list") @observable score: number[] = [];

  @persist @observable numberOfWords: number = 0;

  @persist @observable round: number = 1;

  @persist @observable countType: string = ONE_PER_ROUND;

  @persist @observable whenWin: number = 10;

  @persist @observable reroll: boolean = true;

  @observable winners: number[] = [];

  @action resetGameSettings() {
    this.teamsAmount = 2;
    this.time = 0.5;
    this.players = [];
    this.activeAvaliableCategories = {};
    this.numberOfWords = 0;
    this.userTurn = {
      team: 0,
      user: 0,
    };
    this.countType = ONE_PER_ROUND;
    this.gameWords = [];
    this.usedGameWords = [];
    this.randomWord = null;
    this.gameStarted = false;
    this.whenWin = 10;
    this.reroll = true;
  }

  @action startGame() {
    this.userTurn = {
      team: 0,
      user: 0,
    };
    this.score = new Array(this.teams.length).fill(0);
    this.round = 1;
    this.gameStarted = true;
    this.usedGameWords = [];
    this.randomWord = null;
    let words:Word[] = [];
    Object.keys(this.activeAvaliableCategories).forEach((categoryId) => {
      if(this.activeAvaliableCategories[categoryId]){
        words = [...words, ...this.avaliableCategories[categoryId].words];
      }
    })
    this.gameWords = words;
  }

  @action endGame() {
    this.gameStarted = false;
    this.teams = [];
  }

  @action reset() {
    this.resetGameSettings();
    this.avaliableCategories = {};
  }
}
