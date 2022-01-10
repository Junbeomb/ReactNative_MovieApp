import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY = "05b81ffe05cb24c3ab044ea04aa9cc17"

export const ApiMovie={
    nowPlaying:async()=>
        await axios.get(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`),
    popular:async({pageParam})=>
        fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`).then(a=>a.json()),
    discoverRated:({pageParam})=>
        fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&sort_by=vote_average.desc&vote_count.gte=3500`).then(a=>a.json()),
    discoverRelease:({pageParam})=>
        fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&sort_by=release_date.desc&vote_count.gte=30`).then(a=>a.json()),
    detail:async({queryKey})=>{
        const [_,query] = queryKey;
        return await axios.get(`${BASE_URL}movie/${query}?api_key=${API_KEY}&language=ko-KR&page=1`)
    },
    similar:async({queryKey})=>{
        const [_,query] = queryKey;
        return await axios.get(`${BASE_URL}movie/${query}/similar?api_key=${API_KEY}&language=ko-KR&page=1`)
    },
    review:async({queryKey})=>{
        const [_,query] = queryKey;
        return await axios.get(`${BASE_URL}movie/${query}/reviews?api_key=${API_KEY}&language=en_US&page=1`)
    },
    credits:async({queryKey})=>{
        const [_,query] = queryKey;
        return await axios.get(`${BASE_URL}movie/${query}/credits?api_key=${API_KEY}&language=en_US`)
    }
}

export const ApiTv={
    popular:async({pageParam})=>
        fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`).then(a=>a.json()),
    latest:async()=>
        fetch(`${BASE_URL}tv/latest?api_key=${API_KEY}&language=en-US`).then(a=>a.json()),
    discoverRated:({pageParam})=>
        fetch(`${BASE_URL}discover/tv?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&sort_by=vote_average.desc&vote_count.gte=1300`).then(a=>a.json()),
    discoverRelease:({pageParam})=>
        fetch(`${BASE_URL}discover/tv?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&sort_by=first_air_date.desc&vote_count.gte=20`).then(a=>a.json()),
    detail:async({queryKey})=>{
        const [_,query] = queryKey;
        return await axios.get(`${BASE_URL}tv/${query}?api_key=${API_KEY}&language=ko-KR&page=1`)
    },
    similar:async({queryKey})=>{
        const [_,query] = queryKey;
        return await axios.get(`${BASE_URL}tv/${query}/similar?api_key=${API_KEY}&language=ko-KR&page=1`)
    },
    review:async({queryKey})=>{
        const [_,query] = queryKey;
        return await axios.get(`${BASE_URL}tv/${query}/reviews?api_key=${API_KEY}&language=en_US&page=1`)
    },
}

export const ApiTrending = {
    trendingWeek:async()=>
        await axios.get(`${BASE_URL}trending/all/week?api_key=${API_KEY}`),
}

export const ApiSearch = {
    multi:async({queryKey})=>{
    const [_,query]=queryKey;
    return await fetch(`${BASE_URL}search/multi?api_key=${API_KEY}&language=en_US&page=1&query=${query}`).then(a=>a.json())
    }
}

export const ApiPerson = {
    popular:async({pageParam})=>
        await fetch(`${BASE_URL}person/popular?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`).then(a=>a.json()),
    detail:async({queryKey})=>{
        const [_,query] = queryKey;
        return await axios.get(`${BASE_URL}person/${query}?api_key=${API_KEY}&language=en-US`)
    },
    discoverPeople:async({queryKey,pageParam})=>{
        const [_,query] = queryKey;
        return await fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&with_people=${query}`).then(a=>a.json())
    },
}

export const ApiReview = {
    reviewTest:async({queryKey})=>{
        const [_,query] = queryKey;
        return await axios.get(`${BASE_URL}review/${query}?api_key=${API_KEY}`)
    },
}

//fetch랑 axios의 응답데이터가다름(useInfinitequery일때)
//fetch: {"pageParams": [undefined], "pages": [{"page": 1, "results": [Array], "total_pages": 31750, "total_results": 634994}]}
//axios: {"pageParams": [undefined], "pages": [{"config": [Object], "data": [Object], "headers": [Object], "request": [XMLHttpRequest], "status": 200, "statusText": undefined}]}


//useQuery일때
//axios: movie.data.results[]
//fetch:

//useInfinitequery일때
//axios:
//fetch: movie.pages[0].results[]

