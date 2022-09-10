This is a code challenge to show Vue 3 with composition Api skills.
Down below are done features:

- As a user, I want to see a list of dog breeds taken from this link.
- As a user, I want to be able to select a breed and see a detailed page displaying
  important information about the breed (description, image, ...).
- As a user, I want to pick my favourite breeds and filter them at will.
- As a user, I want to have a page to see a list of 20 random dog images and
  refresh it.
- As a user, I want to upload a valid new image of a breed (the dog API is checking
  the content of the data so we suggest you send a dog picture).
- As a user, I want to delete an image I previously uploaded.

Potential improvements:

- Split stores into 2 stores: One for listing public doggos and one for private
- Add cypress tests

Usefull information:

- Get your own api key at https://docs.thedogapi.com/authentication
- Add environment file with key VUE_APP_APIKEY
