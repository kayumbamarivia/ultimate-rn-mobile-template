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
import { router } from "expo-router";
import { layout } from "@/constants/Layout"; // Ensure this path and its content are correct
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function UpdateCar() {
    const [rating, setRating] = useState(0);
    const handleRating = (selectedRating: number) => {
        setRating(selectedRating);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                bounces={false}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 bg-white justify-center">
                     
                            <Ionicons name="close-circle" size={50} color="#FF7300" className="absolute top-8 left-5" onPress={() => router.push('/(tabs)/Home')} />
                    
                        <View className="items-center mb-8">
                            <Text className="text-3xl font-poppins-bold"> Update your Car</Text>
                        </View>

                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Car name . . ."
                                    className="bg-gray-100 p-4 rounded-xl font-poppins-regular"
                                />
                                <View style={styles.borderBottom} />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="description of at most 15 characters . . ."
                                    className="bg-gray-100 p-4 rounded-xl font-poppins-regular"
                                />
                                <View style={styles.borderBottom} />
                            </View>

                            <View style={styles.inputContainer} className="rating">
                                <Text className="font-poppins-medium text-gray-600 mb-2">Rating</Text>
                                <View className="flex-row justify-start space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <TouchableOpacity
                                            key={star}
                                            onPress={() => handleRating(star)}
                                            className="p-1"
                                        >
                                            <Ionicons
                                                name={star <= rating ? "star" : "star-outline"}
                                                size={30}
                                                color={star <= rating ? "#FF7300" : "#B1B1B1"}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {/* Optional: Display current rating */}
                                <Text className="font-poppins-regular text-sm text-gray-500 mt-1">
                                    Selected new rating: {rating}/5
                                </Text>
                            </View>

                            <TouchableOpacity className="bg-primary p-4 rounded-full mb-5" >
                                <Text className="font-poppins-bold text-xl text-white text-center">
                                    <Ionicons name="cloud-upload" size={24} color="#fff" />
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="bg-primary p-4 rounded-full mb-7" onPress={() => router.push('/(tabs)/Home')}>
                                <Text className="font-poppins-bold text-xl text-white text-center">
                                    Update
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: layout.logoWidth,     // Ensure layout.logoWidth is defined in your constants
        height: layout.logoHeight,   // Ensure layout.logoHeight is defined in your constants
        marginVertical: 20,
    },
    form: {
        paddingHorizontal: layout.spacingHorizontal || 20, // Provide a fallback if layout.spacingHorizontal is undefined
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 25, // You might want to slightly adjust this if needed after removing mb-4 from TextInput
    },
    borderBottom: {
        position: 'absolute',
        bottom: 0, // This will now be at the bottom of the inputContainer, right under the TextInput's padding
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#B1B1B1', // A neutral gray color
        borderRadius: 2, // Subtle rounding for the border itself
    }
});