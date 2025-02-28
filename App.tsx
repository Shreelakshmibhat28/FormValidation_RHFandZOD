import React from "react";
import { View, TextInput, Text, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  firstname: z.string().min(3, {message: "First name is recquired"}),
  lastname: z.string().optional(),
  age: z.string().max(3, {message: "Age must contain max of 3 digits"}).regex(/^\d+$/, {message: "Age must be a number"}),
  phone: z.string().regex(/^[6-9]\d{9}$/, {message: "Enter a valid contact number"}),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword,{
message: "Passwords do not match",
path: ["confirmPassword"],
});

type FormFields = z.infer<typeof schema>;

const App = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {firstname:"", lastname: "", age:"",phone:"",  email: "test@gmail.com", password: "", confirmPassword:"" },
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
    <View style={styles.container}>
      <Text style = {styles.title}>FORM VALIDATION</Text>

      <Controller
        control={control}
        name="firstname"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.firstname && <Text style={styles.errorText}>{errors.firstname.message}</Text>}
      
      <Controller
        control={control}
        name="lastname"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.lastname && <Text style={styles.errorText}>{errors.lastname.message}</Text>}

      <Controller
        control={control}
        name="age"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Contact"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}


      <Button title={isSubmitting ? "Loading..." : "Submit"} onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: "#f9f9f9",
    flex : 1,
  },

  title:{
    fontSize: 24,
    fontWeight: "bold",
    textAlign:"center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor:"#ccc",
    borderRadius: 8,
    padding : 10,
    marginBottom: 10,
    backgroundColor:"#fff",
  },

  errorText:{
    color:"red",
    marginBottom: 10,
  },
});                              

export default App;
