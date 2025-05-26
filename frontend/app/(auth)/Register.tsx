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
  Keyboard
} from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { layout } from "@/constants/Layout"; 
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { validateEmail, validateName, validatePassword } from "@/utils/utils";
import useAuth from "@/context/useAuth";
import { useToast } from "react-native-toast-notifications";


const orangeLogo = require('@/assets/images/logo-orange.png');

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { register} = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return toast.show("Please fill in all fields", { type: "danger" });
    }

    const nameCheck = validateName(name);
    const emailCheck = validateEmail(email);
    const passCheck = validatePassword(password);

    if (!nameCheck.valid) {
      return toast.show(nameCheck.message, { type: "danger" });
    }
    if (!emailCheck.valid) {
      return toast.show(emailCheck.message, { type: "danger" });
    }
    if (!passCheck.valid) {
      return toast.show(passCheck.message, { type: "danger" });
    }

    register(name, email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-white justify-center">
            <View className="items-center">
              <Text className="text-3xl font-poppins-bold">Welcome</Text>
              <Text className="text-2xl font-poppins-semibold text-[#FFA45A]">Signup</Text>
              <Image source={orangeLogo} contentFit="contain" style={styles.logo} />
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="User name . . ."
                  className="bg-gray-100 p-4 rounded-xl font-poppins-regular"
                  value={formData.name}
                  onChangeText={(val) =>
                    setFormData({ ...formData, name: val })
                  }
                />
                <View style={styles.borderBottom} />
              </View>
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

              <TouchableOpacity className="bg-primary p-4 rounded-full mb-7" onPress={() => handleSubmit()}>
                <Text className="font-poppins-bold text-xl text-white text-center">
                  Signup
                </Text>
              </TouchableOpacity>

              <Text className="font-poppins-regular text-center mt-8">
                Don&apos;t have an account?
                <Link href="/(auth)/Login">
                  <Text className="text-primary font-poppins-medium"> Login</Text>
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
    paddingHorizontal: layout.spacingHorizontal || 20, 
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 25, 
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#B1B1B1', 
    borderRadius: 2, 
  }
});