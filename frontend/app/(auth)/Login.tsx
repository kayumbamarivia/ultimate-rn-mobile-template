import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Image } from "expo-image";
import { layout } from "@/constants/Layout"; 
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Link } from "expo-router";
import useAuth from "@/context/useAuth";
import { useToast } from "react-native-toast-notifications";
import { validateEmail, validatePassword } from "@/utils/utils";
const orangeLogo = require("@/assets/images/logo-orange.png");

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      return toast.show("Please fill in all fields", {
        type: "danger",
      });
    }
    if (!validateEmail(formData.email)) {
      return toast.show("Please enter a valid email", {
        type: "danger",
      });
    }
    if (!validatePassword(formData.password)) {
      return toast.show("Password must be at least 4 characters", {
        type: "danger",
      });
    }
    login(formData.email, formData.password);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-white justify-center">
            <View className="items-center">
              <Text className="text-3xl font-poppins-bold">Welcome</Text>
              <Text className="text-2xl font-poppins-semibold text-[#FFA45A]">
                Login
              </Text>
              <Image
                source={orangeLogo}
                contentFit="contain"
                style={styles.logo}
              />
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email . . ."
                  className="bg-gray-100 p-4 rounded-xl font-poppins-regular"
                  value={formData.email}
                  onChangeText={(val) =>
                    setFormData({ ...formData, email: val })
                  }
                />
                <View style={styles.borderBottom} />
              </View>

              <View className="relative" style={styles.inputContainer}>
                <TextInput
                  placeholder="Password . . ."
                  secureTextEntry={!showPassword}
                  className="bg-gray-100 p-4 rounded-xl font-poppins-regular pr-12"
                  value={formData.password}
                  onChangeText={(val) =>
                    setFormData({ ...formData, password: val })
                  }
                />
                <TouchableOpacity
                  className="absolute right-4 top-4"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#B1B1B1"
                  />
                </TouchableOpacity>
                <View style={styles.borderBottom} />
              </View>

              <TouchableOpacity
                className="bg-primary p-4 rounded-full mb-7"
                onPress={() => handleSubmit()}
              >
                <Text className="font-poppins-bold text-xl text-white text-center">
                  Login
                </Text>
              </TouchableOpacity>

              <Text className="font-poppins-regular text-center mt-8">
                Already have an account?
                <Link href="/(auth)/Register">
                  <Text className="text-primary font-poppins-medium">
                    {" "}
                    Register
                  </Text>
                </Link>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: layout.logoWidth,
    height: layout.logoHeight,
    marginVertical: 20,
  },
  form: {
    paddingHorizontal: layout.spacingHorizontal || 20, // Provide a fallback if layout.spacingHorizontal is undefined
  },
  inputContainer: {
    position: "relative",
    marginBottom: 25, // You might want to slightly adjust this if needed after removing mb-4 from TextInput
  },
  borderBottom: {
    position: "absolute",
    bottom: 0, // This will now be at the bottom of the inputContainer, right under the TextInput's padding
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#B1B1B1", // A neutral gray color
    borderRadius: 2, // Subtle rounding for the border itself
  },
});
