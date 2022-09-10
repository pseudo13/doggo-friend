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

export class UploadedDoggoImage {
  url: string;
  id: string;
}

export interface DoggoState {
  doggoList: Doggo[];
  breedFilter: string;
  randomImages: string[];
  uploadedImages: UploadedDoggoImage[];
  loading: boolean;
}

export enum Action {
  GET_DOGGO_LIST = "GET_DOGGO_LIST",
  GET_DOGGO_DETAILS = "GET_DOGGO_DETAILS",
  SET_DOGGO_FILTER = "SET_DOGGO_FILTER",
  GET_RANDOM_IMAGES = "GET_RANDOM_IMAGES",
  GET_UPLOADED_IMAGES = "GET_UPLOADED_IMAGES",
  SET_UPLOADED_IMAGES = "SET_UPLOADED_IMAGES",
  UPLOAD_IMAGE = "UPLOAD_IMAGE",
  DELETE_IMAGE = "DELETE_IMAGE",
  LOADING = "LOADING"
}

const getRandomImages = (doggoWithImages: string[]) => {
  if (!doggoWithImages?.length) return [];
  const images = []
  for (let i = 0; i < 20; i++) {
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
    randomImages: [],
    uploadedImages: [],
    loading: false
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
    },
    [Action.SET_DOGGO_FILTER]: (state, payload: string) => {
      state.breedFilter = payload;
    },
    [Action.GET_RANDOM_IMAGES]: (state) => {
      state.randomImages = getRandomImages(state.doggoList?.filter(doggo => doggo.image?.url).map(doggo => doggo.image.url))
    },
    [Action.SET_UPLOADED_IMAGES]: (state, payload: any) => {
      state.uploadedImages = payload;
    },
    [Action.LOADING]: (state, isLoading: boolean) => {
      state.loading = isLoading
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
    },
    [Action.GET_UPLOADED_IMAGES]: async (context) => {
      await axios.get("https://api.thedogapi.com/v1/images").catch(e => {
        console.log(e)
      }).then((response: any) => {
        context.commit(Action.SET_UPLOADED_IMAGES, response.data)
      });
    },
    [Action.DELETE_IMAGE]: async (context, imageId: string) => {
      context.commit(Action.LOADING, true)
      await axios.delete(`https://api.thedogapi.com/v1/images/${imageId}`).catch(e => {
        console.log(e)
        context.commit(Action.LOADING, false)
      }).then((response: any) => {
        context.commit(Action.SET_UPLOADED_IMAGES, context.state.uploadedImages.filter(image => image.id !== imageId))
        context.commit(Action.LOADING, false)
      });
    },
    [Action.UPLOAD_IMAGE]: async (context, file) => {
      context.commit(Action.LOADING, true)
      const formData = new FormData();
      formData.append('file', file);
      await axios.post("https://api.thedogapi.com/v1/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": `${process.env.VUE_APP_APIKEY}`
        }
      }).catch(e => {
        console.log(e)
        context.commit(Action.LOADING, false)
        alert("Failed to upload image. This isn't a doggo.")
      }).then((response: any) => {
        context.dispatch(Action.GET_UPLOADED_IMAGES)
        context.commit(Action.LOADING, false)
      });
    },
  },
  modules: {
  }
})
