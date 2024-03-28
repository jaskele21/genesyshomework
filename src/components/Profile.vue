

<template>
  <div v-if="character">
    <button @click="goBack" class="back-button">Back</button>
    <h2>{{ character.name }}</h2>
    <p><img :src="character.image" alt="Avatar" class="profileavatar" /></p>
    <p>Species&Type: {{ character.species }} {{character.type}}</p>
    <p>Status: {{ character.status }}</p>
    <p>Gender: {{character.gender}}</p>
    <p>Origin: {{character.origin.name}}</p>
    <p>Location: {{character.location.name}}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Profile',
  data() {
    return {
      character: null
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      this.character = response.data;
    } catch (error) {
      console.error('Error fetching character profile:', error);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
<style>
.profileavatar {
  width: 300px;
  height: auto;
  border-radius: 50%;
}
.back-button{
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
