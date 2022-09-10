import { createStore } from 'vuex'
import axios from "axios";

export class Doggo {
  id: string;
  name: string;
  temperament: string;
  life_span: string;
  alt_names: string;
  wikipedia_url: string;
  origin: string;
  weight: any;
  country_code: string;
  height: any;
}

export interface DoggoState {
  doggoList: Doggo[];
}

export enum Action {
  GET_DOGGO_LIST = "GET_DOGGO_LIST"
}

export default createStore<DoggoState>({
  state: {
    doggoList: []
  },
  getters: {
    doggoList: (state) => state.doggoList
  },
  mutations: {
    [Action.GET_DOGGO_LIST]: (state, payload: Doggo[]) => {

      state.doggoList = payload;
      console.log(payload)
    }
  },
  actions: {
    [Action.GET_DOGGO_LIST]: async (context) => {
      await axios.get("https://api.thedogapi.com/v1/breeds").catch(e => {
        console.log(e)
      }).then((response: any) => context.commit(Action.GET_DOGGO_LIST, response.data));
    }
  },
  modules: {
  }
})
