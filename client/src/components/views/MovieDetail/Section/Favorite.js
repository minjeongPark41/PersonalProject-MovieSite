import React, {useEffect} from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    // 이제 movieInfo들
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime



    // Favorite 누르면 해주고 싶은 것들 로직 짜주기
    useEffect(() => {

        let variable ={
            // 누가 좋아요 눌렀는지, 어떤 영화 좋아했는지에 대한 정보를 Axios에 같이 보내줘야 올바른 정보를 받을 수 있음
            userFrom,
            movieId
        }

        // fetch, axios 다 사용 가능. (우선 get, post 나누지 말고 다 post로 만들어보자)
        // endpoint는 내가 임의로 정해줄 수 있음
        Axios.post('/api/favorite/favoriteNumber', variable) 
            // 서버에서 처리해준 다음에, 결과를 다시 받음
            .then(response => {
                console.log('responseForFavorite', response.data)
                if (response.data.success){

            } else{
                alert("Favorite 숫자 정보를 가져오는데 실패했습니다.")
            }
        
        })

    }, [])


    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
