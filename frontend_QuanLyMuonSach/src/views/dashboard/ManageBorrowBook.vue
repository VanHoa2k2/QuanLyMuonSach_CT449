<template>
  <NavbarDashboard />
  <div id="app">
    <h1>Quản lý yêu cầu mượn sách</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Sách</th>
          <th>Đọc giả</th>
          <th>Xử lý mượn sách</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="borrowBook in listBorrowBook" :key="borrowBook._id">
          <td>{{ borrowBook.book.name }}</td>
          <td>
            {{ borrowBook.user.firstName }} {{ borrowBook.user.lastName }}
          </td>
          <td>
            <button
              v-if="!borrowBook.isActive"
              class="btn btn-success set-borrow-book"
              @click="acceptBorrow(borrowBook)"
            >
              Chấp nhận mượn sách
            </button>
            <button v-else class="btn btn-success set-borrow-book" disabled>
              Đã chấp nhận mượn sách
            </button>
          </td>
          <td>
            <button
              class="btn btn-danger"
              @click="deleteBorrowBook(BorrowBook._id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import NavbarDashboard from "@/components/Navbar-dashboard.vue";

export default {
  name: "App",
  components: {
    NavbarDashboard,
  },
  name: "App",
  data() {
    return {
      listBorrowBook: [],
      showEditModal: false,
      editBorrowBookData: {},
      isAddingNewBorrowBook: false,
    };
  },
  mounted() {
    this.fetchBorrowBook();
  },
  methods: {
    fetchBorrowBook() {
      axios
        .get("http://localhost:3500/api/get-all-borrow-book")
        .then((response) => {
          console.log(response.data.data);
          this.listBorrowBook = response.data.data;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    acceptBorrow(borrowBook) {
      const data = {
        _id: borrowBook._id,
        isActive: true,
      };

      axios
        .put("http://localhost:3500/api/edit-borrow-book", data)
        .then((response) => {
          console.log("Đã chấp nhận mượn sách:", response.data);
          // Cập nhật lại danh sách mượn sách sau khi chấp nhận thành công
          this.fetchBorrowBook();
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi chấp nhận mượn sách:", error);
        });
    },
    deleteBorrowBook(BorrowBookId) {
      if (confirm("Are you sure you want to delete this BorrowBook?")) {
        axios
          .delete(
            `http://localhost:3500/api/delete-borrow-book/${BorrowBookId}`
          )
          .then((response) => {
            console.log("BorrowBook deleted successfully:", response.data);
            // Cập nhật lại danh nhà xuất bản nhà xuất bản sau khi xóa
            this.fetchBorrowBooks();
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    },
  },
};
</script>

<style>
.btn-success.set-borrow-book {
  margin: 0 !important; /* Loại bỏ margin */
  padding: 8px 16px; /* Kích thước padding */
  font-size: 14px; /* Kích thước chữ */
  font-weight: bold; /* Đậm */
  border: none; /* Không có đường viền */
  border-radius: 4px; /* Bo góc */
  cursor: pointer; /* Con trỏ chuột */
  background-color: #28a745; /* Màu nền */
  color: white; /* Màu chữ */
  transition: background-color 0.3s; /* Hiệu ứng chuyển đổi màu nền */
}

.btn-success.set-borrow-book:hover {
  background-color: #218838; /* Màu nền khi hover */
}

.btn-success.set-borrow-book:disabled {
  background-color: #6c757d; /* Màu nền khi disabled */
  cursor: not-allowed; /* Không cho phép click */
}

.navbar-brand,
.nav-link {
  color: white !important;
}

.navbar-toggler-icon {
  background-color: white;
}

.navbar-toggler {
  border-color: white;
}

.nav-item.active .nav-link {
  color: white;
}

.navbar-nav .nav-link {
  color: white;
  margin-right: 10px;
}

.btn-success {
  margin: 20px 0;
  margin-left: 70%;
}

.btn-danger {
  margin-left: 4px;
}

.form-group {
  margin-bottom: 20px; /* Khoảng cách giữa các nhóm form */
}

.form-control {
  width: 100%; /* Căn chỉnh input để nó chiếm đủ chiều rộng */
  padding: 10px; /* Đặt padding cho input */
  font-size: 16px; /* Đặt kích thước phông chữ cho input */
  border: 1px solid #ccc; /* Hiển thị đường viền cho input */
  border-radius: 5px; /* Bo góc cho input */
}

.btn-primary {
}

.btn-primary:hover {
  background-color: #0056b3; /* Màu nền của nút khi hover */
}
</style>
