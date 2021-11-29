import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../commons/MainImage'
import MovieInfo from './Section/MovieInfo'
import GridCards from '../commons/GridCards'
import {Row} from 'antd'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    // 각 영화의 상세 페이지 들어와서 그 id에 맞는 정보들이 각각 Movie에 담기도록 해줌
    const [Movie, setMovie] = useState([])
    // crew 정보들을 담아줄 그릇
    const [Casts, setCasts] = useState([])
    // toggle 해주기 위한. 초기값은 false로 (이벤트로 true되면 보여주게 할 것이기에)
    const [ActorToggle, setActorToggle] = useState(false)

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

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('responseForCrew', response)
                // 그냥 response 안에는 cast(배우들 정보), crew(스태프들 정보) 다 있기에
                setCasts(response.cast)
            })
    
       
    }, [])

    const toggleActorView = () => {
        // 이거를 누르면, true가 되어서 '현재' false여서 안보이는걸 바꿔주는 것
        setActorToggle(!ActorToggle)
    }

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
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

                {/* ActorToggle이 true면~ 아래 코드를 실행해줘 */}
                {/* 지금 20명의 데이터 담긴게 Casts에 있으니까 */}
                {/* Casts가 있으면, map 메소드를 이용해서 하나하나 가지고 온다. (하나하나의 Casts를 뜻하는 이름, index도 줘보자) */}
                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                    {Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                image={cast.profile_path ?
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                characterName={cast.name}
                            />
                        </React.Fragment>
                    ))}

                    </Row>
                
                }


            </div>

            
        </div>
    )
}

export default MovieDetail
