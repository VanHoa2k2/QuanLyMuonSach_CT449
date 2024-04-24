<template>
  <NavbarHome />
  <div class="profile">
    <div class="banner-profile">
      Profile - {{ user.firstName }} {{ user.lastName }}
    </div>
    <div class="profile-info">
      <p><strong>Năm sinh:</strong> {{ user.birthday }}</p>
      <p><strong>Giới tính:</strong> {{ user.gender }}</p>
      <p><strong>Địa chỉ:</strong> {{ user.address }}</p>
      <p><strong>Số điện thoại:</strong> {{ user.phoneNumber }}</p>
    </div>

    <h2 class="title-profile-borrow-book">Thông tin mượn sách</h2>
    <div v-if="borrowedBooks?.length === 0">
      <p>No books borrowed</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="borrowedBook in borrowedBooks" :key="borrowedBook?._id">
          <div class="book-item">
            <img
              :src="borrowedBook?.bookInfo?.image"
              alt="Book Image"
              class="book-image"
            />
            <div class="book-details">
              <p>
                <strong>Tên sách:</strong> {{ borrowedBook?.bookInfo?.name }}
              </p>
              <p>
                <strong>Ngày mượn:</strong>
                {{ formatDate(borrowedBook?.borrowDate) }}
              </p>
              <p>
                <strong>Ngày trả:</strong>
                {{ formatDate(borrowedBook?.returnDate) }}
              </p>
              <p
                :class="{
                  'borrowed-status': borrowedBook?.isActive,
                  'pending-status': !borrowedBook?.isActive,
                }"
              >
                <strong>Trạng thái:</strong>
                {{ borrowedBook?.isActive ? "Đã mượn" : "Chưa được duyệt" }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
      user: {},
      borrowedBooks: [],
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    },
    fetchUserData() {
      const userId = JSON.parse(localStorage.getItem("reader"))._id;
      axios
        .get(`http://localhost:3500/api/get-detail-user-by-id/${userId}`)
        .then((response) => {
          this.user = response.data.data;
          console.log(response.data.data);
          if (this.user?.borrowBooks) {
            this.borrowedBooks = this.user?.borrowBooks;
            this.fetchBookInfo(); // Gọi hàm lấy thông tin sách
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
    fetchBookInfo() {
      // Lấy danh sách sách mượn có isActive bằng true
      // const activeBorrowedBooks = this.borrowedBooks.filter(
      //   (borrowedBook) => borrowedBook.isActive
      // );

      // Tạo một mảng chứa các promise từ việc gọi request API
      const promises = this.borrowedBooks.map((borrowedBook) => {
        return axios
          .get(
            `http://localhost:3500/api/get-detail-book-by-id/${borrowedBook.book}`
          )
          .then((response) => {
            // Gán thông tin sách vào borrowedBook
            borrowedBook.bookInfo = response.data.data;
          })
          .catch((error) => {
            console.error("Error fetching book info:", error);
          });
      });

      // Sử dụng Promise.all để chờ tất cả các promise hoàn thành
      Promise.all(promises)
        .then(() => {
          // Tất cả các request đã hoàn thành, dữ liệu đã được gán vào borrowedBooks
          console.log("All book info fetched");
        })
        .catch((error) => {
          console.error("Error fetching book info:", error);
        });
    },
  },
};
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7; /* Màu nền của trang */
  border-radius: 10px; /* Bo góc khung trang */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Đổ bóng cho khung trang */
}

.banner-profile {
  background-image: url("https://png.pngtree.com/background/20230204/original/pngtree-yellow-flat-banner-vector-background-picture-image_2025775.jpg");
  background-size: cover;
  background-position: center;
  height: 200px;
  margin-bottom: 20px;
  border-top-left-radius: 10px; /* Bo góc trên bên trái của banner */
  border-top-right-radius: 10px; /* Bo góc trên bên phải của banner */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #333;
  font-weight: 600;
}

.profile-info {
  display: flex;
  flex-wrap: wrap;
}

h1 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #333; /* Màu chữ của tiêu đề */
}

.title-profile-borrow-book {
  margin-top: 20px;
  font-size: 24px;
  margin-bottom: 15px;
  color: #555; /* Màu chữ của tiêu đề nhỏ */
}

p {
  width: 50%;
  margin-bottom: 10px;
  line-height: 1.5; /* Điều chỉnh khoảng cách giữa các dòng của đoạn văn */
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}

li p {
  width: 100%;
  margin-bottom: 0; /* Loại bỏ khoảng cách dưới cùng của mỗi đoạn văn trong danh sách sách mượn */
}

p.borrowed-status {
  font-weight: bold;
  color: green; /* Màu chữ xanh dương */
}

/* CSS cho phần trạng thái "Chưa được duyệt" */
p.pending-status {
  font-weight: bold;
  color: red; /* Màu chữ đỏ */
}

.book-item {
  display: flex;
  margin-bottom: 20px;
}

.book-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.book-details {
  flex: 1;
}

/* Định dạng cho ngày tháng năm */
p {
  margin-bottom: 5px;
}
</style>
