import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import {ApiMovie, ApiSearch, ApiTrending, ApiTv} from "../Api";
import Swiper from "react-native-swiper";
import MovieHorizontalList from "../components/MovieHorizontalList";
import TvHorizontalList from "../components/TvHorizontalList";
import Slide from "../components/Slide";
import TrendHorizontalList from "../components/TrendHorizontalList";
import styled from "styled-components";

const windowHeight = Dimensions.get('window').height;



const SearchInput = styled.TextInput`
    background-color:black;
    color:white;
    elevation:3;
`;

const RatedChooseBar = styled.View`
    flex-direction:row;
    justify-content:space-between;
    padding:20px;
    background-color:black;
`;

const RatedImageTouchBox = styled.TouchableOpacity`
    width:33.33%;
    height:100%;
`;

const RatedImage = styled.Image`
    width:100%;
    height:100%;
`;

const Main = ()=>{
    const queryClient =useQueryClient();
    const navigation = useNavigation();
    const [click,setClick] = useState("topRatedMovie");
    const [text,setText] = useState("");

    const {isLoading:nowPlayingLoading,data:movieNowPlayingData} = useQuery(["movie","nowPlaying"],ApiMovie.nowPlaying);
    const {isLoading:searchLoading,data:searchData} = useQuery(["search",text],ApiSearch.multi);
    const {isLoading:trendWeekLoading,data:trendWeekData} = useQuery(["trending"],ApiTrending.trendingWeek);
    const {isLoading:movieReleaseLoading,data:movieReleaseData,hasNextPage:movieReleaseNext,fetchNextPage:movieReleaseFetch} = useInfiniteQuery(["movie","discoverRelease"],ApiMovie.discoverRelease,{
        getNextPageParam:(currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages?null:nextPage;
        }
    }); 
    const {isLoading:tvReleaseLoading,data:tvReleaseData,hasNextPage:tvReleaseNext,fetchNextPage:tvReleaseFetch} = useInfiniteQuery(["tv","discoverRelease"],ApiTv.discoverRelease,{
        getNextPageParam:(currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages?null:nextPage;
        }
    }); 
    const {isLoading:popularLoading,data:moviePopularData,hasNextPage:moviePopularNext,fetchNextPage:moviePopularFetch} = useInfiniteQuery(["movie","popular"],ApiMovie.popular,{
        getNextPageParam:(currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages?null:nextPage;
        }
    });
    const {isLoading:tvPopularLoading,data:tvPopularData,hasNextPage:tvUpComingNext,fetchNextPage:tvUpComingFetch} =useInfiniteQuery(["tv","popular"],ApiTv.popular,{
        getNextPageParam:(currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages?null:nextPage;
        }
    });
    const {isLoading:movieVoteLoading,data:movieVoteData,hasNextPage:movieVoteNext,fetchNextPage:movieVoteFetch} = useInfiniteQuery(["movie","discoverRated"],ApiMovie.discoverRated,{
        getNextPageParam:(currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages?null:nextPage;
        }
    }); 
    const {isLoading:tvVoteLoading,data:tvVoteData,hasNextPage:tvVoteNext,fetchNextPage:tvVoteFetch} = useInfiniteQuery(["tv","discover"],ApiTv.discoverRated,{
        getNextPageParam:(currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages?null:nextPage;
        }
    });
    // useEffect(()=>{
    //        !movieVoteLoading?console.log(movieVoteData.pages.map((page)=>page.results).flat(),"fsdfsdfasfgsdaf"):null
    // },[movieVoteLoading])
    useEffect(()=>{
        find();
    },[text])
    const find=async()=>{
        await queryClient.refetchQueries(["search"])
    }
    const loadMore = () =>{
        switch(click){
            case "topRatedMovie":
                if(movieVoteNext){
                    movieVoteFetch();
                }
                break;
            case "topRatedTv":
                if(tvVoteNext){
                    tvVoteFetch();
                }
                break;
        }
    }
    return (
        <>
            {text? !searchLoading?
                <>
                    <TextInput placeholder="검색" placeholderTextColor="grey" value={text} onChangeText={setText}/>
                    {searchData.results.map((page,index)=>
                            <Image key={index} source={{uri:`https://image.tmdb.org/t/p/w500${page.poster_path}`}} style={{width:100,height:100}}/>
                        )}
                </>
            :
                <Text>Laoding</Text>
            :
            <View style={{backgroundColor:"black"}}>
              {moviePopularData&&movieNowPlayingData&&tvPopularData&&trendWeekData&&movieVoteData&&tvVoteData&&movieReleaseData&&tvReleaseData? 
                    <FlatList
                        onEndReached={loadMore} //끝지점 도달시 
                        onEndReachedThreshold={1} //끝지점이 어디를 의미하는 지 설명해준다
                        //값을 직접 넘기지 않고 state에 담아 넘기면 로드 오류 발생(해결 불가능)
                        ListHeaderComponent={
                            <>
                                <SearchInput placeholder="검색" placeholderTextColor="grey" value={text} onChangeText={setText}/>
                                <Swiper
                                    horizontal
                                    loop
                                    autoplay
                                    autoplayTimeout={3.5}
                                    showsButtons={false}
                                    showsPagination={false}
                                    containerStyle={{width:"100%",height:windowHeight/3}}
                                >
                                    {movieNowPlayingData.data.results.map((page,index)=>
                                        <Slide key={index} page={page}/>
                                    )}
                                </Swiper>
                                <TrendHorizontalList title={"일주일간의 인기 콘텐츠"} info={trendWeekData}/>
                                <MovieHorizontalList title={"최신 영화"} num={10} info={movieReleaseData}/>
                                <TvHorizontalList title={"최신 TV"} num={21} info={tvReleaseData}/>
                                <MovieHorizontalList title={"인기 영화"} num={11} info={moviePopularData}/>
                                <TvHorizontalList title={"인기 TV"} num={20} info={tvPopularData}/>
                                <RatedChooseBar>
                                    <TouchableOpacity onPress={()=>setClick("topRatedMovie")}>
                                        <Text style={{color:"white"}}>영화 별점순</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>setClick("topRatedTv")}>
                                        <Text style={{color:"white"}}>tv 별점순</Text>
                                    </TouchableOpacity>
                                </RatedChooseBar>
                            </>
                        }
                        data={click==="topRatedMovie"?movieVoteData.pages.map((page)=>page.results).flat():
                            click==="topRatedTv"?tvVoteData.pages.map((page)=>page.results).flat():null}
                        numColumns={3}
                        columnWrapperStyle={{ //numColumns를 지정했을때 한줄을 View로 감싸게 된다.
                            justifyContent:"space-between",
                            height:windowHeight/4
                        }}
                        keyExtractor={(item,index)=>`${item.id}|${index}`}
                        renderItem={({item})=>
                                <RatedImageTouchBox onPress={()=>navigation.navigate("Stacks",{
                                    screen:click==="topRatedMovie" ? "MovieDetail" : "TvDetail",
                                    params:{
                                        id:item.id,
                                        item
                                    }
                                })}>
                                    <RatedImage source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} resizeMode="stretch"/>
                                </RatedImageTouchBox>
                        }
                    />
                 : <Text>null</Text>}
                 </View>
            }
        </>
        )
}

export default Main;