import React, { useState,useEffect } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useInfiniteQuery, useQuery } from "react-query";
import { ApiPerson } from "../Api";

const ActorDetail =({route:{params:{item}}})=>{
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
        <ScrollView>
            <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.profile_path}`}} style={{width:100,height:120}}/>
            <Text>{item.name}</Text>
            <Text>{item.popularity}</Text>
            <View style={{flexDirection:"row"}}>
                {item.known_for.map((a,index)=><Image key={index} source={{uri:`https://image.tmdb.org/t/p/w500${a.poster_path}`}} style={{width:100,height:120}}/>)}
            </View>
            {!movieLoading&&!detailLoading?
                <>  
                    <Text>{detailData.data.birthday}{detailData.data.deathday||null}</Text>
                    <Text>출생지:{detailData.data.place_of_birth}</Text>
                    <Text>biography:{detailData.data.biography}</Text>
                    <View style={{flexDirection:"row",padding:10,justifyContent:"space-between",borderWidth:2}}>
                        <View>
                            <Text>출연 영화</Text>
                        </View>
                    </View>
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
                    <Text>마무리</Text>
                </>
            :
                <Text>Loading</Text>
            }
        </ScrollView>
    )
}

export default ActorDetail;