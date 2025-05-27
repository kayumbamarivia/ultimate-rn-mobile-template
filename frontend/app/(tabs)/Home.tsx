import { Ionicons } from "@expo/vector-icons";
import { View, Text, TextInput, FlatList } from "react-native";
import CarCard from "@/components/CarCard";

import { useGetCars } from "@/context/useCar";

function ListEmptyComponent() {
  return (
    <View className="flex-1 items-center justify-center mt-5">
      <Text className="text-xl text-gray-400 font-poppins-medium">
        No cars available
      </Text>
    </View>
  );
}

export default function Home() {
  const { data: cars } = useGetCars();

  return (
    <View className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="px-4 py-2">
        <View className="flex-row pl-6 items-center border-2 py-2 border-[#B1B1B1] rounded-full bg-white">
          <Ionicons name="search" size={24} color="#B1B1B1" />
          <TextInput
            placeholder="search . . ."
            className="flex-1 p-2 font-poppins-regular"
          />
        </View>
      </View>

      {/* Car List */}
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CarCard
            id={item.id}
            name={item.car_name}
            description={item.description}
            rating={item.rating}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          alignItems: 'center' 
        }}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
}