<template>
  <NavbarDashboard />
  <div id="app">
    <h1>Danh sách nhà xuất bản</h1>
    <button class="btn btn-success" @click="addNewPublisher">
      Thêm mới nhà xuất bản
    </button>
    <table class="table">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Địa chỉ</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="publisher in publishers" :key="publisher._id">
          <td>{{ publisher.name }}</td>
          <td>{{ publisher.address }}</td>
          <td>
            <button class="btn btn-primary" @click="editPublisher(publisher)">
              Edit
            </button>
            <button
              class="btn btn-danger"
              @click="deletePublisher(publisher._id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for editing Publisher -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal slide-in-left">
        <button class="modal-close" @click="closeModal">&times;</button>
        <h2>{{ modalTitle }}</h2>
        <!-- Form for editing Publisher -->
        <form @submit.prevent="updatePublisher">
          <div class="form-group">
            <label for="editName">Họ và Tên nhà xuất bản:</label>
            <input
              type="text"
              class="form-control"
              id="editName"
              v-model="editPublisherData.name"
            />
          </div>
          <div class="form-group">
            <label for="editAddress">Địa chỉ:</label>
            <input
              type="text"
              class="form-control"
              id="editAddress"
              v-model="editPublisherData.address"
            />
          </div>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
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
      publishers: [],
      showEditModal: false,
      editPublisherData: {},
      isAddingNewPublisher: false,
    };
  },
  mounted() {
    this.fetchPublishers();
  },
  methods: {
    fetchPublishers() {
      axios
        .get("http://localhost:3500/api/get-all-publisher")
        .then((response) => {
          this.publishers = response.data.data;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    addNewPublisher() {
      // Đặt dữ liệu mặc định cho modal thêm nhà xuất bản mới
      this.editPublisherData = {
        name: "",
        address: "",
      };
      this.modalTitle = "Thêm mới NXB";
      this.isAddingNewPublisher = true;
      // Hiển thị modal
      this.showEditModal = true;
    },
    editPublisher(Publisher) {
      this.editPublisherData = { ...Publisher };
      this.modalTitle = "Chỉnh sửa nhà xuất bản";
      this.isAddingNewPublisher = false;
      this.showEditModal = true;
    },
    deletePublisher(PublisherId) {
      if (confirm("Are you sure you want to delete this Publisher?")) {
        axios
          .delete(`http://localhost:3500/api/delete-publisher/${PublisherId}`)
          .then((response) => {
            console.log("Publisher deleted successfully:", response.data);
            // Cập nhật lại danh nhà xuất bản nhà xuất bản sau khi xóa
            this.fetchPublishers();
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    },
    closeModal() {
      this.showEditModal = false;
    },
    updatePublisher() {
      if (this.editPublisherData._id) {
        // Nếu `_id` tồn tại, đây là việc cập nhật nhà xuất bản đã tồn tại
        axios
          .put(
            "http://localhost:3500/api/edit-publisher",
            this.editPublisherData
          )
          .then((response) => {
            console.log("Edit nhà xuất bản thành công!");
            this.showEditModal = false;
            this.fetchPublishers();
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      } else {
        // Nếu không, đây là việc thêm nhà xuất bản mới
        axios
          .post(
            "http://localhost:3500/api/create-publisher",
            this.editPublisherData
          )
          .then((response) => {
            console.log("Publisher created successfully:", response.data);
            this.showEditModal = false;
            this.fetchPublishers();
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

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-in-left {
  animation: slide-in-left 0.5s ease-out;
}

.btn-success {
  margin: 20px 0;
  margin-left: 70%;
}

.btn-danger {
  margin-left: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: block;
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px; /* Đặt kích thước phông chữ của nút đóng */
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
