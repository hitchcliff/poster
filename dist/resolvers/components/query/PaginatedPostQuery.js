"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../../data-source");
class TempResult {
}
const PaginatedPostQuery = async (options) => {
    const sql = `
 SELECT  
    post.id as "postId",
    post."createdAt",
    u.id as "userId", 
    photo.id as "photoId" 
FROM public.post post
LEFT JOIN public.user u
ON u.id = post."userId"
LEFT JOIN public.photo photo
ON photo.id = u."photoId"
ORDER BY "createdAt" desc offset ${options.offset} rows fetch next ${options.limit} rows only
    `;
    const data = await data_source_1.AppDataSource.createQueryRunner().query(sql);
    const formattedData = [];
    j;
    console.log(data);
    console.log(formattedData);
    return formattedData;
};
exports.default = PaginatedPostQuery;
//# sourceMappingURL=PaginatedPostQuery.js.map