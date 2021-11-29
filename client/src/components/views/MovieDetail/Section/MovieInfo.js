import React from 'react'
import {Descriptions, Badge} from 'antd'

function MovieInfo(props) {

    // 이렇게 변수 처리하면, 아래서 props.movie가 아니라 그냥 movie로 해주는 것 같은데 해보기
    // let {movie} = props

    return (
        <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="Title">{props.movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="release_date">{props.movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="revenue">{props.movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="runtime">{props.movie.runtime}</Descriptions.Item>
            <Descriptions.Item label="vote_average" span={2}>
                {props.movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">{props.movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="status">{props.movie.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">{props.movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
