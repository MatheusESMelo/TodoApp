import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }: any) => {
  // Access the login function from the authentication context
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the login process
  const handleLogin = () => {
    // Check if the login credentials are valid
    if (login(email, password)) {
      Alert.alert("Success", "Login successful!");
      navigation.replace("Main");
    } else {
      Alert.alert("Error", "Invalid email or password.");
    }
  };

  // Function to bypass login with predefined credentials
  const handleBypassLogin = () => {
    login("admin@adm.com", "adm123");
    Alert.alert("Success", "Login successful!");
    navigation.replace("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBypass} onPress={handleBypassLogin}>
        <Text style={styles.buttonText}>Bypass Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  buttonBypass: {
    backgroundColor: "grey",
    marginTop: 8,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
