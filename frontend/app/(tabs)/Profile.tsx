import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import useAuth from '@/context/useAuth'

const profileImage = require('@/assets/images/profile.png')

export default function Profile() {
  const { logout } = useAuth();
  return (
    <View className="flex-1 bg-white">
      {/* Profile Header */}
      <View className="items-center pt-8">
        <View className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image
            source={profileImage}
            style={styles.profileImage}
            contentFit="cover"
          />
        </View>
      </View>

      {/* User Info */}
      <View className="px-6 mt-4">
        <View className="bg-gray-50 rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-4">
            <Ionicons name="person-outline" size={24} color="#FF7300" />
            <View className="ml-4">
              <Text className="font-poppins-regular text-gray-500">Username</Text>
              <Text className="font-poppins-medium text-lg">John Doe</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={24} color="#FF7300" />
            <View className="ml-4">
              <Text className="font-poppins-regular text-gray-500">Email</Text>
              <Text className="font-poppins-medium text-lg">john@example.com</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          className="bg-palered rounded-xl py-4 mt-4"
          onPress={logout}
        >
          <View className="flex-row justify-center items-center">
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text className="font-poppins-bold text-white text-lg ml-2">
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profileImage: {
    width: '100%',
    height: '100%',
  },
})