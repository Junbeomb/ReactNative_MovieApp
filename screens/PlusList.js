import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import MovieVerticalList from "../components/MovieVerticalList";
import TvVerticalList from "../components/TvVerticalList";

const PlusList =({route:{params:{title,num}}})=>{
    const navigation = useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:`${title}`
        })
    },[])
    return(

        <View style={{backgroundColor:"black"}}>
            {num<20?<MovieVerticalList title={title} num={num}/>:
            num<30?<TvVerticalList title={title} num={num}/>:
            null}
        </View>
    )
}

export default PlusList;