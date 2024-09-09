<template>
  <div class="profile-container">
    <div class="profile-form">
      <h1>Profile</h1>
      <form @submit.prevent="updatePasswordFn">
        <div class="form-group">
          <label for="profile-email">Email</label>
          <input type="email" id="profile-email" v-model="email" disabled />
        </div>
        <div class="form-group">
          <label for="current-password">Current Password</label>
          <input
            type="password"
            id="current-password"
            v-model="currentPassword"
            required
          />
        </div>
        <div class="form-group">
          <label for="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            v-model="newPassword"
            required
          />
        </div>
        <button type="submit" class="btn">Update Password</button>
        <p
          v-if="message"
          :class="{ 'success-message': isSuccess, 'error-message': !isSuccess }"
        >
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "vue-router";

const email = ref("");
const newPassword = ref("");
const currentPassword = ref("");
const message = ref("");
const isSuccess = ref(true);
const router = useRouter();
const currentUser = ref(null);

const loadProfile = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      email.value = user.email;
      currentUser.value = user;
    } else {
      router.push("/login");
    }
  });
};

const updatePasswordFn = async () => {
  try {
    if (currentUser.value) {
      const credential = EmailAuthProvider.credential(
        currentUser.value.email,
        currentPassword.value
      );
      await reauthenticateWithCredential(currentUser.value, credential);

      await updatePassword(currentUser.value, newPassword.value);
      message.value = "Password updated successfully!";
      isSuccess.value = true;
    } else {
      message.value = "User not found.";
      isSuccess.value = false;
    }
  } catch (error) {
    message.value = error.message;
    isSuccess.value = false;
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.profile-form {
  max-width: 500px;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
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

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>
