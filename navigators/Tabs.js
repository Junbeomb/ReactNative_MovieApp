import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import Review from "../screens/Review";
import Actors from "../screens/Actors";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const Tabs = ()=>{
    return(
        <Tab.Navigator screenOptions={{
            headerStyle:{backgroundColor:"black"},
            headerTitleStyle:{color:"#ffffff"},
            tabBarStyle:{backgroundColor:"black",borderTopColor:"black"},
            tabBarShowLabel:false
        }}>
            <Tab.Screen name="Main" component={Main} options={{
                tabBarIcon:({focused,color,size})=>{
                    return <Icon name="home" color={focused?"#ffffff":"white"} size={focused?30:20}/>
                }
            }}/>
            <Tab.Screen name="Actors" component={Actors} options={{
                tabBarIcon:({focused,color,size})=>{
                    return <Icon name="account-group" color={focused?"#ffffff":"white"} size={focused?30:20}/>
                }
            }}/>
            <Tab.Screen name="Review" component={Review} options={{
                tabBarIcon:({focused,color,size})=>{
                    return <Icon name="card-text" color={focused?"#ffffff":"white"} size={focused?30:20}/>
                }
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs;