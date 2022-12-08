const userRepository = require('../repository/user-repository')
const response = require("../data/ResponseFrom");

exports.isLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) next(); else res.status(403).json(response.responseFromMessage("[AuthService]로그인되지 않은 상태입니다."));
};

exports.isNotLoggedIn = async (req, res, next) => {
    if (!req.isAuthenticated()) next(); else res.json(response.responseFromMessage("[AuthService]로그인된 상태입니다."));
};

exports.isPermissionIn = async (req, res, next) => {
    if ((await userRepository.getUserPermission(req.user.id)).permission || req.body.id === req.user.id) next(); else res.json(response.responseFromMessage("[AuthService]권한이 없습니다."));
};

exports.isAdminIn = async (req, res, next) => {
    if ((await userRepository.getUserPermission(req.user.id)).permission) next(); else res.json(response.responseFromMessage("[AuthService]권한이 없습니다."));
};