const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite')

// index.js에 endpoint들을 다 쓰면 너무 많으니까, route들을 나눠주는 것
//  ㄴ 페이지들 많아질수록 routes 폴더 안에는 더 많은 것들이 쌓이겠지~

// 프론트단에서 보내는 요청을 지금 여기서, 이 endpoint로 받은것
// 그런데 프론트단에서 데이터 같이 보냈잖아. 그 데이터를 서버에서 받으려면 (req, res)
// ㄴ 프론트단에서 지금 userFrom이랑 movieId를 보내줬었지. 
//  index.js 보면 bodyParser라는게 있는데 이거 때문에 req.body.movieId 이런 식으로 데이터 받을 수 있는 것

router.post('/favoriteNumber', (req, res) => {

    // (1) mongoDB에서 favorite 숫자 가지고 오기
    // ㄴ 이러기 위해서는 db 모델 Favorite에 접근해야함. 그래서 import 
    // ㄴ req.body.movieId랑 맞는! movieId를 찾아줘
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // (2) 맞는 정보가 있으면 ~ 그 다음에 프론트에 다시 숫자 정보 보내주기
            // ㄴ 만약 info 정보가 1,2,3 이라는 user가 눌렀다는거면 그 정보의 lenth만 
            res.status(200).json({ success:true, favoriteNumber: info.length })
        })
        
})

router.post('/favorited', (req, res) => {

    // (1) mongoDB에서 내가 이 영화를 favorited에 넣었는지'도' 정보 가져오기
    // ㄴ req.body.userFrom이랑 맞는! userFrom을 찾아줘
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // (2) 맞는 정보가 있으면 ~ 그 다음에 프론트에 다시 숫자 정보 보내주기
            // ㄴ 만약 []일 경우를 default로 해서 먼저 false로 주고, 값이 있으면 true로 바꾸는 식으로 줘보자
            let result = false;
            if (info.length !== 0){
                result = true
            }

            res.status(200).json({ success:true, favorited: result })
        })
        
})



module.exports = router;
