<template>
  <div class="login-container">
    <div
      class="login-section"
      :class="{ active: isActive === 'login' }"
      @click="setActive('login')"
    >
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" v-model="loginEmail" required />
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            v-model="loginPassword"
            required
          />
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
      <p v-if="alertMessage">{{ alertMessage }}</p>
    </div>
    <div
      class="signup-section"
      :class="{ active: isActive === 'signup' }"
      @click="setActive('signup')"
    >
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="signup-name">Name</label>
          <input type="text" id="signup-name" v-model="signupName" required />
        </div>
        <div class="form-group">
          <label for="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            v-model="signupEmail"
            required
          />
        </div>
        <div class="form-group">
          <label for="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            v-model="signupPassword"
            required
          />
        </div>
        <button type="submit" class="btn">Sign Up</button>
      </form>
      <p v-if="alertMessage">{{ alertMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";

const loginEmail = ref("");
const loginPassword = ref("");
const signupName = ref("");
const signupEmail = ref("");
const signupPassword = ref("");
const isActive = ref("login");
const alertMessage = ref("");
const router = useRouter();

const setActive = (section) => {
  isActive.value = section;
};

const login = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );
    alertMessage.value = "Login successful!";
    setTimeout(() => {
      router.push("/");
    }, 1000);
  } catch (error) {
    alertMessage.value = error.message;
  }
};

const signup = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      signupEmail.value,
      signupPassword.value
    );
    alertMessage.value = "Registration successful. You can now log in.";
    setActive("login");
  } catch (error) {
    alertMessage.value = error.message;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
}
.login-section,
.signup-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  transition: background-color 0.3s;
}
h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}
.form-group {
  margin-bottom: 15px;
  width: 100%;
  max-width: 300px;
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
  max-width: 300px;
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
