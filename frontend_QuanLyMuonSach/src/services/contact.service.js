import createApiClient from "./api.service";
class ContactService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }
  async login(data) {
    return (await this.api.post("/user-login", data)).data;
  }
  async getAllBooks() {
    return (await this.api.get("/get-all-book")).data;
  }

  //   async create(data) {
  //     return (await this.api.post("/", data)).data;
  //   }
  //   async deleteAll() {
  //     return (await this.api.delete("/")).data;
  //   }
  //   async get(id) {
  //     return (await this.api.get(`/${id}`)).data;
  //   }
  //   async update(id, data) {
  //     return (await this.api.put(`/${id}`, data)).data;
  //   }
  //   async delete(id) {
  //     return (await this.api.delete(`/${id}`)).data;
  //   }
}
export default new ContactService();
