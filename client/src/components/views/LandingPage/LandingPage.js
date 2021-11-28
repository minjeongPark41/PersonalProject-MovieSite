import React, {useEffect, useState} from 'react'
// import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards'
import { Row } from 'antd'

function LandingPage() {

    // 2. 가지고 온 API를 state에 넣어보자
    const [Movies, setMovies] = useState([])
    // 3. MainImage를 만들어보자 
    const [MainMovieImage, setMainMovieImage] = useState(null)
    // loadMore 누를 때마다 페이지를 바꿔보자. 초기값은 (0페이지)
    const [CurrentPage, setCurrentPage] = useState(0)

    // 1. API를 가지고 와보자
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)

    }, [])

    // 정보 가지고 와주는 로직 같은거는 함수로 빼준 거
    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            //.then(response => console.log(response))
            // .then(response => console.log(response.results[0]))
            .then(response => {

                // array
                setMovies([...Movies, ...response.results])
                // 가지고 온 이미지들 중에서 첫 번째
                setMainMovieImage(response.results[0])
                // 페이지 정보 바꿔주기
                setCurrentPage(response.page)
            })
    }

    const loadMoreItems = () => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchMovies(endpoint)
    }

    // 화면 
    return (
        <div stye={{width:'100%', margin:'0'}}>

            {/* Main Image */}
            {MainMovieImage &&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}

                />
            }

            <div style={{width:'85%', margin:'1rem auto'}}>
                <h2>Movies by lastes</h2>

                <hr/>

                {/* Movie Grid Cards */}

            {/* 사진 사이 사이 간격 띄우는 gutter */}
            <Row gutter={[16, 16]}>

            {/* 지금 20개의 영화 데이터 담긴게 Movies에 있으니까 */}
            {/* Movies가 있으면, map 메소드를 이용해서 하나하나 가지고 온다. (하나하나의 Movies를 뜻하는 이름, index도 줘보자) */}
            {Movies && Movies.map((movie, index) => (
                <React.Fragment key={index}>
                    <GridCards 
                        image={movie.poster_path ?
                            `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                        movieId={movie.id}
                        movieName={movie.original_title}
                      />
                </React.Fragment>
            ))}

            </Row>


            </div>

            <div style={{display:'flex', justifyContent:'center'}}>
                <button onClick={loadMoreItems}> Load More </button>
            </div>

        </div>
    )
}

export default LandingPage
