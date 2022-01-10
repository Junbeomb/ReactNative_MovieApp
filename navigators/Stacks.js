import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MovieDetail from "../screens/MovieDetail";
import TvDetail from "../screens/TvDetail";
import PlusList from "../screens/PlusList";
import ActorDetail from "../screens/ActorDetail";
import MovieDetailReview from "../screens/MovieDetailReview";

const NativeStack = createNativeStackNavigator();

const Stacks = () =>{
    return(
        <NativeStack.Navigator screenOptions={{headerStyle:{backgroundColor:"black"},headerTitleStyle:{color:"white"},headerTintColor:"white"}}>
            <NativeStack.Screen name="MovieDetail" component={MovieDetail}/>
            <NativeStack.Screen name="TvDetail" component={TvDetail}/>
            <NativeStack.Screen name="PlusList" component={PlusList}/>
            <NativeStack.Screen name="ActorDetail" component={ActorDetail}/>
            <NativeStack.Screen name="MovieDetailReview" component={MovieDetailReview}/>
        </NativeStack.Navigator>
    )
};

export default Stacks;