import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../commons/MainImage'
import MovieInfo from './Section/MovieInfo'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    // 각 영화의 상세 페이지 들어와서 그 id에 맞는 정보들이 각각 Movie에 담기도록 해줌
    const [Movie, setMovie] = useState([])

    // MovieDetail 페이지 왔을 때 딱 동작하길 바라는 것 
    useEffect(() => {

        // console.log(props.match)

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        // fetch(endpoint 주소)
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })
       
    }, [])



    return (
        <div>

            {/* 이건 LandingPage의 MainImage 부분과 같지~ */}
            {/* Header */}

            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.original_title}
                text={Movie.overview}
            />

            {/* Body */}
            <div style={{ width: '85%', margin:'1rem auto'}}>

                {/* Movie Info */}
                <MovieInfo
                    movie = {Movie}
                />


                <br />
                {/* Actors Grid */}

                <div style={{ display:'flex', justifyContent:'center', margin:'2rem'}}>
                    <button> Toggle Actor View </button>
                </div>

            </div>

            
        </div>
    )
}

export default MovieDetail
