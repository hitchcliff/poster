"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../utils/constants");
const LogoutMutation = async ({ req, res }) => {
    return new Promise((resolve) => {
        return req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.error(err);
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
};
exports.default = LogoutMutation;
//# sourceMappingURL=LogoutMutation.js.map