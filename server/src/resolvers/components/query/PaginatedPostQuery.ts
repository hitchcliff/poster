import {
  PaginatedPostInput,
  PaginatedPostResponse,
} from "../../../resolvers/post";
import { AppDataSource } from "../../../data-source";

const PaginatedPostQuery = async (
  options: PaginatedPostInput
): Promise<PaginatedPostResponse[]> => {
  const sql = `
        SELECT  u.id                                AS "userId"
               ,u.username
               ,u.verified
               ,u."firstName"
               ,u."lastName"
               ,post.id                             AS "postId"
               ,post.body
               ,post."updatedAt"
               ,photo.src                           AS "profileImg"
        FROM public.post post
        LEFT JOIN public.user u
          ON post."userId" = u.id
        LEFT JOIN public.photo photo
          ON u."photoId" = photo.id
        ORDER BY "updatedAt" desc offset ${options.offset} rows fetch next ${options.limit} rows only
    `;

  const data = await AppDataSource.createQueryRunner().query(sql);
  const formattedData: PaginatedPostResponse[] = [];

  data.map((item: any) => {
    formattedData.push({
      id: item.postId,
      postDetails: {
        id: item.postId,
        body: item.body,
        updatedAt: item.updatedAt,
      },
      poster: {
        id: item.userId,
        username: item.username,
        fullName:
          item.firstName && item.lastName
            ? item.firstName + " " + item.lastName
            : item.username,
        profileImg: item.profileImg,
        verified: item.verified,
      },
    });
  });

  return formattedData;
};

export default PaginatedPostQuery;
