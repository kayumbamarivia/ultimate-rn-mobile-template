import { Tabs } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";


const orangeLogo = require('@/assets/images/logo-orange.png');

function HeaderLeft({ logo }: { readonly logo: any }) {
  return (
    <Image 
      source={logo}
      contentFit="contain"
      style={{ width: 60, height: 60, marginLeft: 15 }}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={({route})=>({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
          borderBottomWidth: 0, // Removes the bottom border
        },
         tabBarIcon:({focused,color,size})=>{
                    let icon;
                    if(route.name === "Home"){
                        icon= focused ? <Ionicons name="home" size={30} color="#FF7300"/> : <Ionicons name="home-outline" color="#B1B1B1" size={25}/>;
                    }else if(route.name === "AddNewCar"){
                        icon= focused ? <Ionicons name="add-circle" size={30} color="#FF7300"/> : <Ionicons name="add-circle-outline" color="#B1B1B1" size={25}/>;
                    }else if(route.name === "Profile"){
                        icon = focused ? <Ionicons name='person' color="#FF7300" size={30}/>:<Ionicons name='person-outline' color="#B1B1B1" size={25}/>
                    }
                    return icon
                },
        tabBarActiveTintColor: '#FF7300', // Color when tab is focused
        tabBarInactiveTintColor: '#B1B1B1', // Color when tab is not focused
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Medium',
        },
        headerTitle: '', // Removes the header title
        headerLeft: () => <HeaderLeft logo={orangeLogo} />,
      })}>
      <Tabs.Screen 
        name="Home" 
        options={{
          tabBarLabel: 'Home',
        }} 
      />
       <Tabs.Screen 
        name="AddNewCar" 
        options={{
          tabBarLabel: 'Add Car',
        }} 
      />
      <Tabs.Screen 
        name="Profile" 
        options={{
          tabBarLabel: 'Profile',
        }} 
      />
    </Tabs>
  );
}