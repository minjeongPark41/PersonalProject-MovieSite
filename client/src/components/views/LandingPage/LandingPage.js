import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from './Sections/MainImage';

function LandingPage() {

    // 2. 가지고 온 API를 state에 넣어보자
    const [Movie, setMovies] = useState([])
    // 3. MainImage를 만들어보자 
    const [MainMovieImage, setMainMovieImage] = useState(null)

    // 1. API를 가지고 와보자
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetch(endpoint)
        .then(response => response.json())
        //.then(response => console.log(response))
        // .then(response => console.log(response.results[0]))
        .then(response => {

            // array
            setMovies([response.results])
            // 가지고 온 이미지들 중에서 첫 번째
            setMainMovieImage(response.results[0])

        })

    }, [])



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

            </div>

            <div style={{display:'flex', justifyContent:'center'}}>
                <button> Load More </button>
            </div>

        </div>
    )
}

export default LandingPage
