import React, { useState,useEffect } from "react";
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useInfiniteQuery, useQuery } from "react-query";
import { ApiPerson } from "../Api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const windowHeight = Dimensions.get('window').height;

const ActorDetail =({route:{params:{item}}})=>{
    const [folding,setFolding]=useState(true);

    const {isLoading:detailLoading,data:detailData} = useQuery(["personDetail",item.id],ApiPerson.detail);
    const {isLoading:movieLoading,data:movieData,hasNextPage:movieNext,fetchNextPage:movieFetch} = useInfiniteQuery(["personMovie",item.id],ApiPerson.discoverPeople,{
        getNextPageParam:(currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages?null:nextPage;
        }
    });
    
    useEffect(()=>{
        !movieLoading?console.log(movieData.pages[0].results,"1111"):null
        // console.log(detailData,"2222")
    },[movieLoading])
    
    const loadMore =()=>{
        console.log("dddddd")
        if(movieNext){
            movieFetch()
        }
    }
    return (
        !detailLoading?
        <ScrollView style={{backgroundColor:"black"}}>
            <View style={{flexDirection:"row",width:"100%",justifyContent:"center",padding:10}}>
                <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.profile_path}`}} style={{width:"40%",height:windowHeight/4,margin:5}}/>
                <View style={{flexDirection:"column"}}>
                    <Text style={{fontSize:22,color:"white"}}>{item.name}</Text>
                    <Text style={{opacity:0.7,color:"white"}}>{detailData.data.birthday}{detailData.data.deathday||null}</Text>
                    <Text style={{opacity:0.7,color:"white"}}>{detailData.data.place_of_birth}</Text>
                </View>
            </View>
            <Text style={{opacity:0.7,color:"white"}}>{folding?detailData.data.biography.substr(0,300):detailData.data.biography}</Text>
            <TouchableOpacity onPress={()=>setFolding((prev)=>!prev)}>
                {folding?<Icon name="chevron-down" size={22} color="white"/>:<Icon name="chevron-up" size={22} color="white"/>}
            </TouchableOpacity>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:5}}>
                {item.known_for.map((a,index)=><Image key={index} source={{uri:`https://image.tmdb.org/t/p/w500${a.poster_path}`}} style={{width:100,height:120}}/>)}
            </View>
            <View style={{flexDirection:"row",padding:10,justifyContent:"space-between",borderWidth:2}}>
                <View>
                    <Text style={{opacity:0.7,color:"white"}}>출연 영화</Text>
                </View>
            </View>
            {!movieLoading?
                    <FlatList
                        horizontal
                        onEndReached={loadMore} //끝지점 도달시 
                        onEndReachedThreshold={1}
                        data={movieData.pages.map(a=>a.results).flat()}
                        keyExtractor={(item,index)=>`${item.id}${index}`}
                        renderItem={({item})=>{
                            return <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{width:100,height:120}}/>
                        }}
                    />
            :
                <Text style={{color:"white"}}>Loading</Text>
            }
        </ScrollView>
        :
        <View style={{backgroundColor:"black",height:"100%"}}>
            <Text style={{color:"white"}}>Loading</Text>
        </View>
    )
}

export default ActorDetail;