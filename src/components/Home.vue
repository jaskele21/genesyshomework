<template>
  <body>
  <button class="prev-button" @click="prevPage" :disabled="currentPage === 1">Previous</button>
  <div class="container">
    <input type="text" v-model="searchQuery" placeholder="Search character names">

    <span>Page {{ currentPage }}</span>

    <table>
      <thead>
      <tr>
        <th>Avatar</th>
        <th>Name</th>
        <th>Species</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="character in filteredCharacters" :key="character.id" @click="viewProfile(character.id)">
        <td><img :src="character.image" alt="Avatar" class="avatar"/></td>
        <td><a @click.prevent="viewProfile(character.id)" href="#">{{ character.name }}</a></td>
        <td>{{ character.species }}</td>
        <td>{{ character.status }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <button class="next-button" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </body>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      characters: [],
      currentPage: 1,
      totalPages: 1,
      searchQuery: ''

    };
  },
  computed:{
    filteredCharacters() {
      return this.characters.filter(character =>
          character.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchCharacters(page = 1) {
      try {

        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
        this.characters=response.data.results;
        this.totalPages= response.data.info.pages;
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    },
    viewProfile(id) {
      this.$router.push({ name: 'Profile', params: { id } });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.characters = [];
        this.fetchCharacters(this.currentPage);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.characters=[];
        this.fetchCharacters(this.currentPage);
      }
    }
  },
  mounted() {
    this.fetchCharacters();
  },

}
</script>
<style>

 .container {
   max-width: 800px;
   margin: 0 auto;
   padding: 100px;
 }

input[type="text"] {
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 5px;
  border: 1px solid #ddd;
}
@media (prefers-color-scheme: dark) {
  .container{
    background-color: #333;
    color: #fff;
  }
}
 @media (min-width: 768px) {
   .container{
     column-count: 2;
   }
 }
.avatar {
  width: 100px;
  height: auto;
  border-radius: 50%;
}
 .prev-button,
 .next-button {
   background-color: hsla(160, 100%, 37%, 1);
   color: #fff;
   border: none;
   padding: 10px 20px;
   cursor: pointer;
   border-radius: 10%;

 }

 .prev-button:hover,
 .next-button:hover {
   background-color: hsla(160, 100%, 37%, 0.2);

 }

 .prev-button {
   margin-right: auto;
 }

 .next-button {
   margin-left: auto;
 }

</style>
