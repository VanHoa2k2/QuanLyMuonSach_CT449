<template>
  <div class="text-center mt-5 form-signin">
    <h1 class="h3 mb-3 fw-normal">Đăng nhập hệ thống nhân viên</h1>
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
          <router-link to="/register">Tạo tài khoản</router-link>
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
// import { useToast } from "vue-toast-notification";
// import "vue-toast-notification/dist/theme-sugar.css";

export default {
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
          localStorage.setItem("employee", JSON.stringify(response.user));
          router.push("/manage-book");
        } else {
          alert("Username hoặc mật khẩu không đúng");
        }
        // else if (response.data.loginResult.result === 1) {
        //   toast.error("Username hoặc mật khẩu không đúng!");
        //   errMessage.value = response.data.loginResult.result;
        // } else if (response.data.loginResult.userData.role !== "nhanvien") {
        //   toast.warning(
        //     "Độc giả không thể truy cập vào hệ thống của nhân viên"
        //   );
        // }
      } catch (error) {
        console.log(error);
        // if (error.response) {
        // toast.error("Username hoặc mật khẩu không đúng!");
        // errMessage.value = 1;
        // }
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
