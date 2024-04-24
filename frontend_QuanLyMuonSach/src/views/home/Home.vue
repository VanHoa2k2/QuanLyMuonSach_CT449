<template>
  <NavbarHome />
  <div class="banner">
    <!-- Nội dung của banner -->
  </div>
  <div class="container-home">
    <div class="header-container">
      <h1 class="title-book">List những quyển sách</h1>
      <div class="search-container">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Nhập tên sách..."
        />
        <button class="btn btn-search" @click="searchBooks">Tìm kiếm</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="book in filteredBooks" :key="book._id">
        <div class="card">
          <img :src="book.image" class="card-img-top" alt="Book Image" />
          <div class="card-body">
            <div>
              <h5 class="card-title">{{ book.name }}</h5>
              <p class="card-text">Giá: {{ book.price }} VNĐ</p>
            </div>
            <button class="btn btn-detail" @click="clickBook(book._id)">
              Chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavbarHome from "@/components/Navbar-home.vue";

export default {
  name: "Home",
  components: {
    NavbarHome,
  },
  data() {
    return {
      books: [],
      searchTerm: "",
      filteredBooks: [],
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      axios
        .get("http://localhost:3500/api/get-all-book")
        .then((response) => {
          this.books = response.data.data;
          // Lọc danh sách sách ban đầu với searchTerm nếu có
          this.filteredBooks = this.books.filter((book) =>
            book.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    clickBook(bookId) {
      // Chuyển hướng đến trang chi tiết sách khi click vào một quyển sách
      this.$router.push({ name: "book", params: { id: bookId } });
    },
    searchBooks() {
      this.filteredBooks = this.books.filter((book) =>
        book.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
};
</script>

<style>
.banner {
  background-image: url("https://t4.ftcdn.net/jpg/05/44/54/69/360_F_544546950_Xi80k2ppry7rqKQQYsSNVmuaAILUiki9.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  height: 260px; /* Điều chỉnh chiều cao của banner */
  margin-bottom: 20px; /* Khoảng cách giữa banner và phần thông tin sách */
}

.container-home {
  max-width: 1200px;
  margin: 0 auto;
}

.header-container {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.search-container {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.search-container input[type="text"] {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
}

.btn-search {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-search:hover {
  background-color: #0056b3;
}

.title-book {
  margin-bottom: 20px;
}

.card {
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  margin: 12px 0;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  margin-bottom: 5px;
}

.btn-detail {
  display: block;
  width: 90px;
  padding: 8px 16px;
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-detail:hover {
  background-color: #0056b3;
  color: #fff;
  width: 106px;
}

/* Hiệu ứng hover */
.btn-detail:hover::after {
  content: "\00bb"; /* Một biểu tượng mũi tên nhỏ (») */
  margin-left: 5px;
}

/* Hiệu ứng khi di chuột vào nút */
.btn-detail:active {
  transform: translateY(1px); /* Tạo hiệu ứng nhấn xuống nhẹ khi click */
}
</style>
