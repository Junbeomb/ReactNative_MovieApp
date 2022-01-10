import React from "react";
import { Text, View ,TouchableOpacity, FlatList, Image, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
    elevation:3;
`;

const TitleBox = styled.TouchableOpacity`
    padding:10px;
    padding-top:15px;
    padding-bottom:15px;
    flex-direction:row;
    justify-content:space-between;
    background-color:black;
`;

const Title = styled.Text`
    color:white;
`;

const Flat = styled.FlatList``;

const ImageTouchBox = styled.TouchableOpacity``;

const ImageTouch = styled.Image`
    width:${windowWidth/4}px;
    height:${windowHeight/5}px;
`;

const TvHorizontalList = ({title,num,info})=>{
    const navigation = useNavigation();
    return(
        <Container>
            <TitleBox onPress={()=>navigation.navigate("Stacks",{
                screen:"PlusList",
                params:{
                    title,
                    num
                }
            })}>
                <Title>{title}</Title>
                <Icon name="arrow-right" size={20} color="white"/>
            </TitleBox>
            <Flat
                horizontal
                showsHorizontalScrollIndicator={false}
                data={info.pages.map((page)=>page.results).flat()}
                renderItem={({item})=>
                    <ImageTouchBox onPress={()=>navigation.navigate("Stacks",{
                        screen:"TvDetail",
                        params:{
                            id:item.id,
                            item
                        }
                    })}>
                        <ImageTouch source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} resizeMode="stretch"/>
                    </ImageTouchBox>
                }
            />
        </Container>
    )
}

export default TvHorizontalList;