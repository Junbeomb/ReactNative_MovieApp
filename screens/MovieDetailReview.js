import React from "react";
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MovieDetailReview = ({route:{params:{reviewData}}})=>{
    console.log(reviewData.data.results[0],"route")
    return (
    <ScrollView>
        {reviewData.data.results.map((a,index)=>
        { 
            const temp = a.author_details.avatar_path?.substr(1);
            return(
            <View key={index} style={{borderWidth:0.4,borderColor:"black"}}>
                {temp?
                    temp.includes("https")?
                        <Image source={{uri:temp}} style={{width:30,height:30}}/>
                    :
                        <Image source={{uri:`https://image.tmdb.org/t/p/w500/${temp}`}} style={{width:30,height:30}}/>
                :
                    <Image source={require(`../images/기본사람이미지.jpg`)}  style={{width:30,height:30}}/>
                }
                <Text>{a.author}</Text>
                <Text>rating: {a.author_details.rating||"not rating"}</Text>
                <Text>{a.created_at.substr(0,10)}</Text>
                <Text>{a.content.substr(0,120)}...</Text>
            </View>
            )
        })}
    </ScrollView>)
}

export default MovieDetailReview;