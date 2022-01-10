import React from "react";
import { Text, View ,TouchableOpacity, FlatList, Image, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useInfiniteQuery } from "react-query";
import { useEffect } from "react/cjs/react.development";
import { ApiMovie } from "../Api";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MovieVerticalList = ({title,num})=>{

    const {isLoading,data,hasNextPage,fetchNextPage} = useInfiniteQuery(["movie",num===10?"discover":"popular"],num===10?ApiMovie.discoverRelease:ApiMovie.popular,{
        getNextPageParam:(currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages?null:nextPage;
        }
    });
    useEffect(()=>{
        // console.log(data)
    },[data])
    const loadMore = () =>{
        if(hasNextPage){
            fetchNextPage();
        }
    }
    return(
        <>
            {data?
                <View style={{marginBottom:5,elevation:3}}>
                    <FlatList
                        onEndReached={loadMore} //끝지점 도달시 
                        onEndReachedThreshold={1} //끝지점이 어디를 의미하는 지 설명해준다
                        showsVerticalScrollIndicator={false}
                        data={data.pages.map((page)=>page.results).flat()}
                        renderItem={({item})=>
                            <TouchableOpacity style={{flexDirection:"row"}}>
                                <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{width:windowWidth/4,height:windowHeight/5}} resizeMode="stretch"/>
                                <View style={{width:windowWidth*3/4,left:10}}>
                                    <Text style={{fontSize:16,color:"white"}}>{item.original_title}</Text>
                                    <Text style={{fontSize:12,opacity:0.9,color:"white"}}>⭐{item.vote_average}/10</Text>
                                    <Text style={{fontSize:12,opacity:0.6,color:"white"}}>{item.overview.substr(0,70)}...</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            :
                <Text>Loading</Text>
            }
        </>
    )
}

export default MovieVerticalList;