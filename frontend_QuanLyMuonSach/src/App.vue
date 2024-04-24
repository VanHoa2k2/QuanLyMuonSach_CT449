<script></script>

<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style>
body {
  background-image: url("https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg");
  background-size: cover; /* Hiển thị ảnh với kích thước tối ưu */
  background-position: center; /* Hiển thị ảnh nền ở giữa trung tâm */
  background-repeat: no-repeat; /* Ngăn ảnh nền lặp lại */
  background-attachment: fixed; /* Giữ ảnh nền cố định khi cuộn trang */
  /* background-color: #f0f0f0; */
}

.page {
  max-width: 400px;
  margin: auto;
}
</style>
