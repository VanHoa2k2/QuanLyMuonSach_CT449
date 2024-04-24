<template>
  <NavbarHome />
  <div class="text-center mt-5 form-signin">
    <h1 class="h3 mb-3 fw-normal">Đăng nhập hệ thống độc giả</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errMessage === 1 }"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="username"
        />
        <label v-if="errMessage === 1" for="floatingInputInvalid"
          >Username không đúng</label
        >
        <label v-else for="floatingInput">Username</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errMessage === 1 }"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
        />
        <label v-if="errMessage === 1" for="floatingInputInvalid"
          >Mật khẩu không đúng</label
        >
        <label v-else for="floatingPassword">Mật khẩu</label>
      </div>

      <div class="mb-3">
        <label>
          Bạn chưa có tài khoản ?
          <router-link to="/register-reader">Tạo tài khoản</router-link>
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Đăng nhập
      </button>
    </form>
  </div>
</template>

<script>
// import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ContactService from "@/services/contact.service";
import NavbarHome from "@/components/Navbar-home.vue";

export default {
  name: "Profile",
  components: {
    NavbarHome,
  },
  setup() {
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const errMessage = ref(0);

    const handleLogin = async () => {
      try {
        const response = await ContactService.login({
          username: username._value,
          password: password._value,
        });
        if (response.errCode === 0 && response.message === "Ok") {
          localStorage.setItem("reader", JSON.stringify(response.user));
          console.log("Đăng nhập thành công");
          router.push("/");
        } else {
          alert("Username hoặc mật khẩu không đúng");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      username,
      password,
      errMessage,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 550px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}
</style>
