<template>
  <div class="profile-container">
    <div v-if="!isLoggedIn">
      <p>First you need to log in.</p>
    </div>

    <div v-else>
      <h2>Profile</h2>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="profile-email">Email</label>
          <input type="email" id="profile-email" v-model="email" disabled />
        </div>
        <div class="form-group">
          <label for="profile-password">New Password</label>
          <input type="password" id="profile-password" v-model="password" />
        </div>
        <button type="submit" class="btn">Update Password</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      email: "",
      password: "",
      isLoggedIn: false,
    };
  },
  methods: {
    updateProfile() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser && this.password) {
        const userIndex = users.findIndex(
          (user) => user.email === currentUser.email
        );
        if (userIndex !== -1) {
          users[userIndex].password = this.password;
          localStorage.setItem("users", JSON.stringify(users));
          alert("Password updated successfully");
        }
      } else {
        alert("Please enter a new password");
      }
    },
  },
  created() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.isLoggedIn = !!currentUser;
    if (this.isLoggedIn) {
      this.email = currentUser.email;
    }
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 550px;
  margin: 200px auto;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  text-align: center;
  font-size: large;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
