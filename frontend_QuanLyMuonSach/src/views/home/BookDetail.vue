<template>
  <NavbarHome />
  <div class="container-detail-book">
    <div class="book-info">
      <h2>{{ book.name }}</h2>
      <img :src="book.image" alt="Book Image" />
    </div>
    <div class="details">
      <p><strong>Giá:</strong> {{ book.price }} VNĐ</p>
      <p><strong>Số lượng:</strong> {{ book.quantity }}</p>
      <p><strong>Tác giả:</strong> {{ book.author }}</p>
      <p><strong>Năm xuất bản:</strong> {{ book.publishYear }}</p>
      <p><strong>Nhà xuất bản:</strong> {{ book?.publisher?.name }}</p>
      <div class="return-date-form">
        <label for="returnDate">Chọn ngày trả sách:</label>
        <input type="date" id="returnDate" v-model="returnDate" />
      </div>
      <button class="buy-button" @click="borrowBook">Đăng ký mượn sách</button>
      <div v-if="showLoginRequest" class="login-request">
        Vui lòng <router-link to="/login-reader">đăng nhập</router-link> để đăng
        ký mượn sách.
      </div>
      <p v-if="!returnDate" class="error-message">
        Vui lòng chọn ngày trả sách!
      </p>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
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
      book: {},
      returnDate: null,
      successMessage: "",
      showLoginRequest: false,
    };
  },
  mounted() {
    this.fetchBookDetail();
  },
  methods: {
    fetchBookDetail() {
      const bookId = this.$route.params.id;
      axios
        .get(`http://localhost:3500/api/get-detail-book-by-id/${bookId}`)
        .then((response) => {
          this.book = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching book detail:", error);
        });
    },
    borrowBook() {
      if (!this.isAuthenticated()) {
        this.showLoginRequest = true;
        return;
      }

      let reader = null;
      const readerData = localStorage.getItem("reader");
      if (readerData) {
        reader = JSON.parse(readerData);
      }

      const data = {
        book: this.book._id,
        user: reader._id, // Thay thế bằng id của người dùng hiện tại
        returnDate: this.returnDate,
      };

      axios
        .post("http://localhost:3500/api/borrow-book", data)
        .then(() => {
          this.successMessage = "Đăng ký mượn sách thành công!";
        })
        .catch((error) => {
          console.error("Error borrowing book:", error);
        });
    },
    isAuthenticated() {
      const reader = localStorage.getItem("reader");
      if (reader) {
        return true;
      } else {
        return false;
      }
    },
    handleReturn() {
      if (!this.returnDate) {
        // Nếu ngày trả sách chưa được chọn, hiển thị thông báo lỗi
        return;
      }
    },
  },
};
</script>

<style>
.container-detail-book {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 800px;
  margin: 60px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.book-info {
  flex: 1;
}

.book-info img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.details {
  flex: 1;
  padding-left: 20px;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.price,
.quantity,
.author,
.publisher {
  font-size: 18px;
  margin-bottom: 10px;
}

.buy-button {
  margin-top: 30px;
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s ease;
}

.buy-button:hover {
  background-color: #0056b3;
}

.return-date-form {
  margin-top: 20px;
}

.return-date-form label {
  margin-right: 10px;
}

.return-date-form input {
  margin-right: 10px;
}

.login-request {
  margin-top: 10px;
  color: red;
}

.success-message {
  margin-top: 20px;
  color: #28a745;
  font-weight: bold;
}

.error-message {
  color: red;
  margin-top: 5px;
}
</style>
