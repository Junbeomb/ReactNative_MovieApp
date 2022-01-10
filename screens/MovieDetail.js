import React, { useState } from "react";
import { Dimensions, FlatList, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { useEffect } from "react/cjs/react.development";
import { ApiMovie, ApiReview } from "../Api";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/core";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const TopContainer = styled.View`
    position:relative;
    width:100%;
    height:${windowHeight/3}px;
    justify-content:center;
    align-items:center;
`;
const BackDropImage = styled.Image`
    position:absolute;
    width:100%;
    height:100%;
    background-color:black;
`;
const TopInfoBox = styled.View`
    flex-direction:row;
`;
const PosterImage = styled.Image`
    width:35%;
    height:${windowHeight/4}px;
`;
const TopTextBox = styled.View`
    flexDirection:column;
    width:50%;
    margin-left:10px;
`;
const Title = styled.Text`
    color:white;
    font-size:20px;
    font-weight:600;
`;
//position:"absolute" 가되어 있지 않은 Image를 ScrollView안에 넣으면 하단 부분이 짤리는 현상 발생
//일단 작동이 갑자기 되어서 빼둠.
/* top:${windowHeight/3.5}px; */
/* padding-bottom:${windowHeight/3.5}px; */
const InfoBox = styled.View`
    background-color:black;
    padding:5px;
`;

const MovieDetail = ({route:{params:{id,item}}})=>{
    
    const navigation = useNavigation();
    const [showOverView,setShowOverView] = useState(false);
    const [cast,setCast] = useState(true);
    const [moreCast,setMoreCast] = useState(false);
    const {isLoading:detailLoading,data:detailData} = useQuery(["movieDetail",id],ApiMovie.detail)
    const {isLoading:reviewLoading,data:reviewData} = useQuery(["movieReview",id],ApiMovie.review)
    const {isLoading:similarLoading,data:similarData} = useQuery(["movieSimilar",id],ApiMovie.similar)
    const {isLoading:creditsLoading,data:creditsData} = useQuery(["movieCredits",id],ApiMovie.credits)

    useEffect(()=>{
        // !detailLoading?console.log(detailData.data.production_companies,"review"):null;
        // !reviewLoading?reviewFunction():null;
        // !creditsLoading?console.log(creditsData,"dd"):null
        navigation.setOptions({
            headerTitle:`${item.title}`
        })
    },[creditsLoading])

    const reviewFunction=()=>{
        console.log("111111")
        const {isLoading:reviewTestLoading,data:reviewTestData} = useQuery(["movieReviewTest",reviewData.data.id],ApiReview.reviewTest)
        if(reviewTestData){
            return console.log(reviewTestData)
        }else{
            return console.log("nothing")
        }
    }

    return (
        <ScrollView style={{backgroundColor:"black"}}>
            <TopContainer>
                <BackDropImage source={{uri:`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}} blurRadius={3} resizeMode="stretch"/>
                <View style={{position:"absolute",height:"100%",width:"100%",backgroundColor:"black",opacity:0.6}}></View>
                <TopInfoBox>
                    <PosterImage source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} resizeMode="stretch"/>
                    <TopTextBox>
                        <Title>{item.title||item.original_title}</Title>
                        {detailData?
                            <>
                                <View style={{flexDirection:"row"}}>
                                    {detailData.data.genres.map((a,index)=><Text style={{color:"white",opacity:0.7}} key={index}>{a.name}{detailData.data.genres.length-1===index?null:","}</Text>)}
                                </View>
                                <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                                    <Text style={{color:"white",opacity:0.7}}>{detailData.data.release_date.substr(0,4)}</Text>
                                    <Text style={{color:"white",opacity:0.7}}>{parseInt(detailData.data.runtime/60)}시간{detailData.data.runtime%60}분</Text>
                                </View>
                                <View style={{justifyContent:"center",alignItems:"center",marginTop:20}}>
                                    <Text style={{fontSize:80,color:"white",position:"absolute"}}>⭐</Text>
                                    <Text style={{fontSize:18}}>{detailData.data.vote_average}</Text>
                                    {/* <Text>인기도:{detailData.data.popularity}</Text> */}
                                </View>
                            </>
                        :
                            null}
                    </TopTextBox>
                </TopInfoBox>
            </TopContainer>
            {!detailLoading&&!reviewLoading&&!similarLoading&&!creditsLoading?
            //top과 paddingBottom을 같이 주는이유: (ScrollView가 감싸고 있는 내용의 전체길이 - ScrollView의 길이)만큼 스크롤을 올릴 수 있는데 top을 주면 끝까지 올렸을 때 그만큼 밑 부분이 짤리게된다. 그래서 paddingBottom으로 내용의 전체길이 자체를 늘려버렸다.
            <InfoBox>
                <Text style={{fontSize:20,color:"white"}}>{detailData.data.tagline}</Text>
                <View style={{borderBottomWidth:1,borderColor:"grey",paddingBottom:5,marginBottom:5}}>
                    <Text style={{color:"white",opacity:0.7}}>{showOverView?detailData.data.overview:detailData.data.overview.substr(0,100)}...</Text>
                    <TouchableOpacity style={{alignItems:"flex-end"}} onPress={()=>setShowOverView((prev)=>!prev)}>
                        {!showOverView?<Text style={{color:"white",opacity:0.7}}>더 보기🔽</Text>:<Text style={{color:"white",opacity:0.7}}>접기🔼</Text>}
                    </TouchableOpacity>
                </View>
 
                <View style={{borderBottomWidth:1,borderColor:"grey",paddingBottom:5,marginBottom:5}}>
                    {detailData.data.budget===0?
                        <Text style={{color:"grey"}}>예산,수익 공개되지 않음</Text>
                    :
                        <>
                            <Text style={{color:"white"}}>예산 : ${detailData.data.budget}</Text>
                            <Text style={{color:"white"}}>수익 : ${detailData.data.revenue}</Text>
                        </>
                    }
                </View>

                <View style={{borderBottomWidth:1,borderColor:"grey",paddingBottom:5,marginBottom:5}}>
                    {reviewData.data.results[0]?
                        <TouchableOpacity onPress={()=>navigation.navigate("MovieDetailReview",{reviewData})} style={{justifyContent:"space-between",flexDirection:"row",marginBottom:5}}>
                            <Text style={{color:"white",fontSize:20}}>리뷰</Text>
                            <Text style={{color:"white",opacity:0.7}}>전체보기</Text>
                        </TouchableOpacity>
                    :
                        <Text style={{color:"grey"}}>리뷰 없음</Text>
                    }
                    {reviewData.data.results.map((a,index)=>{ 
                            const temp = a.author_details.avatar_path?.substr(1);
                            if(index<3){
                            return(
                                <View key={index} style={{marginBottom:5}}>
                                    <View style={{flexDirection:"row"}}>
                                        {temp?
                                            temp.includes("https")?
                                                <Image source={{uri:temp}} style={{width:30,height:30,borderRadius:15,backgroundColor:"#f0f0f0"}}/>
                                            :
                                                <Image source={{uri:`https://image.tmdb.org/t/p/w500/${temp}`}} style={{width:30,height:30,borderRadius:15,backgroundColor:"#f0f0f0"}}/>
                                        :
                                            <Image source={require(`../images/기본사람이미지.jpg`)}  style={{width:30,height:30,borderRadius:15,backgroundColor:"#f0f0f0"}}/>
                                        }
                                        <Text style={{color:"white",paddingLeft:5}}>{a.author}</Text>
                                        {a.author_details.rating?<Text style={{color:"white",paddingLeft:5}}>⭐{a.author_details.rating}/10</Text>:<Text style={{fontSize:12, color:"grey"}}>평가하지 않음</Text>}
                                    </View>
                                    <Text style={{color:"white",opacity:0.7}}>{a.content.substr(0,120)}...</Text>
                                </View>
                            )
                            }else{
                                return null
                            }
                        }
                    )}
                </View>
                <View style={{borderBottomWidth:1,borderColor:"grey",paddingBottom:5,marginBottom:5}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:5}}>
                        <TouchableOpacity onPress={()=>setCast(true)}>
                            <Text style={{color:"white",fontSize:20}}>출연진</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setCast(false)}>
                            <Text style={{color:"white",fontSize:20}}>감독/각본</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View>
                        {cast?
                            <>
                                {creditsData.data.cast.map((a,index)=>
                                    (moreCast?
                                        <View key={index}>
                                            {a.profile_path?<Image source={{uri:`https://image.tmdb.org/t/p/w500${a.profile_path}`}} style={{width:50,height:50}}/>:<Image source={require(`../images/기본사람이미지.jpg`)} style={{width:50,height:50}}/>}
                                            <Text style={{color:"white"}}>극중 역:{a.character}</Text>
                                            <Text style={{color:"white"}}>{a.name}</Text>
                                        </View>
                                    :
                                        index<3?
                                        <View key={index}>
                                            {a.profile_path?<Image source={{uri:`https://image.tmdb.org/t/p/w500${a.profile_path}`}} style={{width:50,height:50}}/>:<Image source={require(`../images/기본사람이미지.jpg`)} style={{width:50,height:50}}/>}
                                            <Text style={{color:"white"}}>극중 역:{a.character}</Text>
                                            <Text style={{color:"white"}}>{a.name}</Text>
                                        </View>
                                        :
                                        null

                                    )
                                )}
                            </>
                        :
                            <>
                                {creditsData.data.crew.map((a,index)=>
                                    (moreCast?
                                        <View key={index}>
                                            {a.profile_path?<Image source={{uri:`https://image.tmdb.org/t/p/w500${a.profile_path}`}} style={{width:50,height:50}}/>:<Image source={require(`../images/기본사람이미지.jpg`)} style={{width:50,height:50}}/>}
                                            <Text style={{color:"white"}}>직업:{a.department}</Text>
                                            <Text style={{color:"white"}}>{a.name}</Text>
                                        </View>
                                    :
                                        index<3?
                                        <View key={index}>
                                            {a.profile_path?<Image source={{uri:`https://image.tmdb.org/t/p/w500${a.profile_path}`}} style={{width:50,height:50}}/>:<Image source={require(`../images/기본사람이미지.jpg`)} style={{width:50,height:50}}/>}
                                            <Text style={{color:"white"}}>직업:{a.department}</Text>
                                            <Text style={{color:"white"}}>{a.name}</Text>
                                        </View>
                                        :
                                        null
                                    )
                                )}
                            </>
                        }
                                <TouchableOpacity onPress={()=>setMoreCast((prev)=>!prev)} style={{alignItems:"space-between"}}>
                                    {!moreCast?<Text style={{color:"grey"}}>더 보기🔽</Text>:<Text style={{color:"grey"}}>접기🔼</Text>}
                                </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={async()=>await Linking.openURL(detailData.data.homepage)} style={{borderBottomWidth:1,borderColor:"grey",paddingBottom:5}}>
                    <Text style={{color:"white",opacity:0.7}}>{detailData.data.homepage||"주소 없음"}</Text>
                </TouchableOpacity>
                <Text style={{color:"white",opacity:0.9,fontSize:18,padding:5}}>이영화와 비슷한 영화</Text>
                <FlatList
                    horizontal
                    data={similarData.data.results.map((a)=>a).flat()}
                    keyExtractor={(item,index)=>`${item.id}${index}`}
                    renderItem={({item})=>
                    <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{width:100,height:120}}/>
                    }
                />
                <View style={{flexDirection:"row",width:"100%",justifyContent:"center",borderTopWidth:1,borderColor:"grey"}}>
                    {detailData.data.production_companies.map((a,index)=>
                            a.logo_path?<Image source={{uri:`https://image.tmdb.org/t/p/w500${a.logo_path}`}} style={{width:90,height:40,margin:5,backgroundColor:"grey"}} resizeMode="stretch"/>:null
                    )}
                </View>
                
            </InfoBox>
            :
            <Text style={{color:"white"}}>Loading</Text>}
        </ScrollView>
    )
}

export default MovieDetail;