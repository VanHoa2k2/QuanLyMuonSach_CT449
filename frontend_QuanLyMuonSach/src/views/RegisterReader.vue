<template>
  <NavbarHome />
  <div class="container-register">
    <h1>Đăng ký</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">username:</label>
        <input
          type="username"
          class="form-control"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu:</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div class="form-group">
        <label for="name">Họ và tên:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="name"
          required
        />
      </div>
      <div class="form-group">
        <label for="address">Địa chỉ:</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="address"
          required
        />
      </div>
      <div class="form-group">
        <label for="birthday">Ngày sinh:</label>
        <input
          type="date"
          class="form-control"
          id="birthday"
          v-model="birthday"
          required
        />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Số điện thoại:</label>
        <input
          type="text"
          class="form-control"
          id="phoneNumber"
          v-model="phoneNumber"
          required
        />
      </div>
      <div class="form-group">
        <label for="gender">Giới tính:</label>
        <select class="form-control" id="gender" v-model="gender" required>
          <option value="">Chọn giới tính của bạn</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Đăng ký</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import NavbarHome from "@/components/Navbar-home.vue";

export default {
  name: "Profile",
  components: {
    NavbarHome,
  },
  data() {
    return {
      username: "",
      password: "",
      name: "",
      address: "",
      birthday: "",
      phoneNumber: "",
      gender: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(
          "http://localhost:3500/api/user-register",
          {
            username: this.username,
            password: this.password,
            firstName: this.name.split(" ")[0], // Lấy phần tên đầu tiên làm firstName
            lastName: this.name.split(" ")[1], // Lấy phần tên cuối cùng làm lastName
            birthday: this.birthday,
            gender: this.gender,
            address: this.address,
            phoneNumber: this.phoneNumber,
            role: "reader",
          }
        );
        if (response.data && response.data.errCode === 0) {
          alert("Đăng ký thành công!");
          this.$router.push({ name: "login-reader" });
        } else {
          alert("Đăng ký không thành công!");
        }
      } catch (error) {
        // Xử lý khi có lỗi từ phía client
        console.error("Error:", error);
        alert("Đã xảy ra lỗi khi đăng ký!");
      }
    },
  },
};
</script>

<style>
.container-register {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
</style>
