import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    // 이제 movieInfo들
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)



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
                // console.log('responseForFavorite', response.data)
                setFavoriteNumber(response.data.favoriteNumber)
                if (response.data.success){

            } else{
                alert("Favorite 숫자 정보를 가져오는데 실패했습니다.")
            }
        
        })

        // 내가 이 영화 Favorite에 담았는지 확인
        Axios.post('/api/favorite/favorited', variable) 
            // 서버에서 처리해준 다음에, 결과를 다시 받음
            .then(response => {
                if (response.data.success){
                    console.log('favorited', response.data) 
                    // 헷갈릴까봐 적어주는건데 favorited 여기서 콘솔창에 이름 준거라는거 그냥
                    setFavorited(response.data.favorited)
            } else{
                alert("favorite에 담지 않았습니다.")
            }
        
        })


    }, [])


    return (
        <div>
            {/* Favotied가 true면 - 즉, 좋아요가 있었으면 */}
            {/* {FavoriteNumber는 현재 좋아요 '숫자' 보여주는거} */}
            <button>{Favorited? "Cancle Favorite": "Add to Favorite"} {FavoriteNumber} </button>
        </div>
    )
}

export default Favorite
