import React from "react";
import { View, TextInput, Text, Button, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

const App = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: { email: "test@gmail.com", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("email", { message: "This email is already taken" });
    }
  };

  return (
    <View style={{ padding: 40 }}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}

      <Button title={isSubmitting ? "Loading..." : "Submit"} onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
    </View>
  );
};

export default App;
