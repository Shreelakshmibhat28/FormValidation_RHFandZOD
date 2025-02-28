import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    setErrors({ email: "", password: "" });

    if (!email.includes("@")) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email must include @" }));
      return;
    }

    if (password.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 8 chars" }));
      return;
    }

    console.log("Form Submitted");
  };

  return (
    <View style={{ padding: 50 }}>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email ? <Text style={{ color: "red" }}>{errors.email}</Text> : null}

      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? <Text style={{ color: "red" }}>{errors.password}</Text> : null}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default App;
