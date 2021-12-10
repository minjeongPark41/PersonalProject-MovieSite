import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import { Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    // 이제 movieInfo들
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variable ={
        // 누가 좋아요 눌렀는지, 어떤 영화 좋아했는지에 대한 정보를 Axios에 같이 보내줘야 올바른 정보를 받을 수 있음
        // userFrom: userFrom이라고 적어주는 것과 동일
        userFrom, 
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    // Favorite 누르면 해주고 싶은 것들 로직 짜주기
    useEffect(() => {

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

    const onClickFavorite = () => {

        if(Favorited){
            // Favorited 있으면 삭제해주기 
            Axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if (response.data.success){
                        setFavoriteNumber(FavoriteNumber -1)
                        setFavorited(!Favorited)
                    }else{
                        alert('Favorite 삭제를 실패했습니다.')
                    }
                })

        }else{
            // Favorited 없으면 추가해주기
            Axios.post('/api/favorite/addFavorite', variable)
                .then(response => {
                    if (response.data.success){
                        setFavoriteNumber(FavoriteNumber +1)
                        setFavorited(!Favorited)
                    }else{
                        alert('Favorite 추가를 실패했습니다.')
                    }
                })

        }

    }


    return (
        <div>
            {/* Favotied가 true면 - 즉, 좋아요가 있었으면 */}
            {/* {FavoriteNumber는 현재 좋아요 '숫자' 보여주는거} */}
            <Button onClick={onClickFavorite}>{Favorited? "Cancle Favorite": "Add to Favorite"} {FavoriteNumber} </Button>
        </div>
    )
}

export default Favorite
