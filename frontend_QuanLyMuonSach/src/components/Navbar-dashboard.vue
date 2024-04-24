<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="'/manage-book'">
          B2017041
        </router-link>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isActive }">
        <div class="navbar-end">
          <router-link to="/manage-book" class="navbar-item">Sách</router-link>
          <router-link to="/manage-publisher" class="navbar-item"
            >Nhà xuất bản</router-link
          >
          <router-link to="/manage-borrow-book" class="navbar-item"
            >Quản lý mượn sách</router-link
          >
        </div>
      </div>
      <div v-if="employee" class="employee-info">
        Nhân viên - {{ employee.firstName }} {{ employee.lastName }}
        <button class="logout-button" @click="logout">Đăng xuất</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue"; // Thêm các import cần thiết

export default {
  data() {
    return {
      isActive: false,
      employee: null,
    };
  },
  setup() {
    const router = useRouter();
    const employee = ref(null);

    const logout = () => {
      localStorage.removeItem("employee");
      employee.value = null;
      router.push("/login-employee");
    };

    onMounted(() => {
      const employeeData = localStorage.getItem("employee");
      if (employeeData) {
        employee.value = JSON.parse(employeeData);
      }
    });

    return {
      isActive: ref(false),
      employee,
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

.employee-info {
  margin-left: auto;
}

.logout-button {
  background-color: transparent;
  color: #dc3545;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-left: 30px;
}

.logout-button:hover {
  color: #c82333;
}
</style>
