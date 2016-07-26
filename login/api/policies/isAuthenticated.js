/**
 * @author TangYunfeng
 */
/**
 * 用户是否被授权
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        return res.json({"错误":"用户未登录，无权进行该操作！"});
    }
};