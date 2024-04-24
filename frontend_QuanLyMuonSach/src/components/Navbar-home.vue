<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="'/'"> B2017041 </router-link>
      </div>
      <div v-if="reader" class="reader-info">
        <router-link class="username-button" :to="'/Profile'"
          >Welcome - {{ reader.firstName }} {{ reader.lastName }}</router-link
        >
        <button class="logout-button" @click="logout">Đăng xuất</button>
      </div>
      <div v-else class="reader-info">
        <router-link class="login-button" :to="'/login-reader'">
          Đăng nhập
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  data() {
    return {
      reader: null,
    };
  },
  setup() {
    const router = useRouter();
    const reader = ref(null);

    const logout = () => {
      localStorage.removeItem("reader");
      reader.value = null;
    };

    onMounted(() => {
      const readerData = localStorage.getItem("reader");
      if (readerData) {
        reader.value = JSON.parse(readerData);
      }
    });

    return {
      reader,
      logout,
    };
  },
};
</script>

<style scoped>
/* Navbar.vue */
.navbar {
  background-color: #f6f9f0;
  border-bottom: 1px solid #dddddd;
  padding: 10px 0;
  margin-bottom: 20px;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-brand a {
  color: #333333;
  font-weight: bold;
  text-decoration: none;
}

.navbar-menu {
  display: block;
}

.navbar-menu.is-active {
  display: block;
}

.navbar-menu .navbar-end {
  /* margin-left: auto; */
}

.navbar-item {
  margin-right: 20px;
  color: #333333;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-item:hover {
  color: #007bff;
}

.reader-info {
  margin-left: auto;
}

.username-button {
  color: #000;
  text-decoration: none;
}

.login-button,
.logout-button {
  color: #dc3545;
  margin-left: 30px;
  text-decoration: none !important;
  border: none; /* Bỏ viền */
  outline: none; /* Bỏ đường viền focus */
  background: none; /* Bỏ nền */
  cursor: pointer;
}

.login-button:hover,
.logout-button:hover {
  color: #c82333;
}
</style>
