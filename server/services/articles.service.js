const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const { Article } = require('../models/article')

const addArticle = async(body) => {
 
  try{
        const article = new Article({
            ...body,
            score:parseInt(body.score)
        });
        await article.save();
        return article;
    }catch(error){
        throw error;
    }
}
const getArticleById = async(_id,user) => {
    try{
        if(user.role === 'user'){
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry you are not allowed')
        }
        const article = await Article.findById(_id).populate('category');
        if(!article) throw new ApiError(httpStatus.NOT_FOUND,'Article not found');
        return article;
    }catch(error){
        throw error;
    }
}



module.exports = {

    addArticle,
    getArticleById
}