<script setup lang="ts">
import { Action, DoggoState, UploadedDoggoImage } from "@/store";
import { computed, ComputedRef, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore<DoggoState>();
const uploadedImages: ComputedRef<UploadedDoggoImage[]> = computed(
  () => store.state.uploadedImages
);

const isLoading: ComputedRef<boolean> = computed(() => store.state.loading);

const deleteImage = (imageId) => {
  store.dispatch(Action.DELETE_IMAGE, imageId);
};

const fileInputRef = ref();
const fileRef = ref();
const uploadFile = ($event) => {
  fileRef.value = $event.target.files[0];
};

const upload = () => {
  store.dispatch(Action.UPLOAD_IMAGE, fileRef.value);
  fileInputRef.value.value = null;
};

onMounted(() => {
  store.dispatch(Action.GET_UPLOADED_IMAGES);
});
</script>
<template>
  <div class="upload">
    <h5>Upload your image here</h5>
    <input
      type="file"
      @change="uploadFile($event)"
      ref="fileInputRef"
      accept="image/png, image/gif, image/jpeg"
    />
    <button @click="upload()" :disabled="isLoading">Upload</button>
  </div>
  <div class="uploaded-images">
    <div class="uploaded-image" v-for="image in uploadedImages" :key="image.id">
      <img :src="image.url" />
      <div>
        <button @click="deleteImage(image.id)" class="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.uploaded-images {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.uploaded-image {
  border: 1px solid darkgray;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
}
.uploaded-image img {
  width: 250px;
  height: 250px;
}
</style>
