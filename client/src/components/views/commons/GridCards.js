import React from 'react'
// antd를 활용해보자
import {Col} from 'antd'

function GridCards(props) {
    return (
        // 한 줄이 24 사이즈가 기준. lg={6}이라는 건, 화면이 클 때는 4개를 보여준다는 것
        <Col lg={6} md={8} xs={24}>
            <div style={{position:'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{width:'100%', height:'320px'}} src={props.image} alt={props.movieName}/>
                </a>
                <p>{props.movieName}</p>
            </div>
        </Col>
    )
}

export default GridCards
