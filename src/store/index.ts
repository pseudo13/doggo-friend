import { createStore } from 'vuex'
import axios from "axios";

export class Weight {
  imperial: string;
  metric: string;
}

export class DoggoImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

export class Doggo {
  id: string;
  name: string;
  temperament: string;
  life_span: string;
  alt_names: string;
  wikipedia_url: string;
  origin: string;
  weight: Weight;
  country_code: string;
  height: Weight;
  image: DoggoImage;
  bred_for: string;
  breed_group: string;
}

export interface DoggoState {
  doggoList: Doggo[];
  breedFilter: string;
  randomImages: string[];
}

export enum Action {
  GET_DOGGO_LIST = "GET_DOGGO_LIST",
  GET_DOGGO_DETAILS = "GET_DOGGO_DETAILS",
  SET_DOGGO_FILTER = "SET_DOGGO_FILTER",
  GET_RANDOM_IMAGES = "GET_RANDOM_IMAGES"
}

const getRandomImages = (doggoWithImages: string[]) => {
  if (!doggoWithImages?.length) return [];
  const images = []
  for (let i = 0; i < 20; i++) {
    debugger
    let a = true,
      n;
    while (a) {
      n = Math.floor(Math.random() * doggoWithImages.length) + 1;
      a = images.includes(n);
    }
    images.push(n);
  }
  return images.map(id => doggoWithImages[id]);
}

export default createStore<DoggoState>({
  state: {
    doggoList: [],
    breedFilter: null,
    randomImages: []
  },
  getters: {
    doggoList: (state) => {
      if (state.breedFilter) {
        const lowercaseFilter = state.breedFilter?.toLowerCase()
        return state.doggoList?.filter(doggo => doggo.name?.toLowerCase().includes(lowercaseFilter)
          || doggo.bred_for?.toLowerCase().includes(lowercaseFilter)
          || doggo.breed_group?.toLowerCase().includes(lowercaseFilter))
      }
      return state.doggoList;
    },
    doggoDetails: (state) => (id) => state.doggoList.find(doggo => doggo.id == id),
    breeds: (state) => state.doggoList?.map(doggo => doggo.bred_for),
  },
  mutations: {
    [Action.GET_DOGGO_LIST]: (state, payload: Doggo[]) => {

      state.doggoList = payload;
      console.log(payload)
    },
    [Action.SET_DOGGO_FILTER]: (state, payload: string) => {
      state.breedFilter = payload;
    },
    [Action.GET_RANDOM_IMAGES]: (state) => {
      state.randomImages = getRandomImages(state.doggoList?.filter(doggo => doggo.image?.url).map(doggo => doggo.image.url))
    }
  },
  actions: {
    [Action.GET_DOGGO_LIST]: async (context) => {
      await axios.get("https://api.thedogapi.com/v1/breeds").catch(e => {
        console.log(e)
      }).then((response: any) => {
        context.commit(Action.GET_DOGGO_LIST, response.data)
        context.commit(Action.GET_RANDOM_IMAGES);
      });
    }
  },
  modules: {
  }
})
