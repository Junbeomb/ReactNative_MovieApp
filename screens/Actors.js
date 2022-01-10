import React,{useEffect} from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useInfiniteQuery } from "react-query";
import { ApiPerson } from "../Api";
import { useNavigation } from "@react-navigation/core";

const Actors =()=>{
    const navigation = useNavigation();
    const {isLoading,data,hasNextPage,fetchNextPage} = useInfiniteQuery(["person","popular"],ApiPerson.popular,{
        getNextPageParam:(currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages?null:nextPage;
        }
    }); 
    useEffect(()=>{
        // isLoading?null:console.log(data.pages[0].results[0]);
    },[isLoading])

    const loadMore = () =>{
        if(hasNextPage){
            fetchNextPage();
        }
    }

    return(
        data?
        <FlatList
            onEndReached={loadMore} //끝지점 도달시 
            onEndReachedThreshold={1}
            data={data.pages.map(a=>a.results).flat()}
            keyExtractor={(item,index)=>`${item.id}${index}`}
            renderItem={({item})=>
                <TouchableOpacity style={{flexDirection:"row",marginVertical:5}} onPress={()=>navigation.navigate("Stacks",{
                    screen:"ActorDetail",
                    params:{
                        item
                    }
                })}>
                    <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.profile_path}`}} style={{width:100,height:120}}/>
                    <View style={{flexDirection:"column"}}>
                        <Text>이름 : {item.name}</Text>
                        <Text>인지도 : {item.popularity}</Text>
                        <Text>대표작 : </Text>
                        {item.known_for.map((a,index)=><Text key={index}>{a.title||a.name}</Text>)}
                    </View>
                </TouchableOpacity>
            }
        />
        :
        <Text>Loading</Text>
    )
}

export default Actors;