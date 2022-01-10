import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

const Slide = ({page})=>{
    const navigation = useNavigation();
    return (<TouchableOpacity onPress={()=>navigation.navigate("Stacks",{
        screen:"MovieDetail",
        params:{
            id:page.id
        }
    })}>
        <Image source={{uri:`https://image.tmdb.org/t/p/w500${page.backdrop_path}`}} blurRadius={3} style={{width:"100%",height:"100%",position:"absolute"}} blurRadius={3} resizeMode="stretch"/>
        <View style={{width:"100%",height:"100%",position:"absolute",opacity:0.4,backgroundColor:"black"}}></View>
        <View style={{flexDirection:"row",width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
            <View style={{width:"80%",height:"80%",flexDirection:"row"}}>
                <Image source={{uri:`https://image.tmdb.org/t/p/w500${page.poster_path}`}} style={{width:"44.44%",height:"100%"}} resizeMode="stretch"/>
                <View style={{width:"62.5%",heigth:"100%",marginLeft:10}}>
                    <Text style={{marginBottom:3,color:"white",fontSize:22}}>{page.original_title}</Text>
                    <Text style={{marginBottom:3,fontSize:14,color:"white",opacity:0.9}}>⭐{page.vote_average}/10</Text>
                    <Text style={{fontSize:12,color:"white",opacity:0.7}}>{page.overview.substr(0,60)}{page.overview.length>60?"...":""}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>)
}

export default Slide;