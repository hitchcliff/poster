import User from "../../entities/User";
import Photo from "../../entities/Photo";

async function MyPhotoQuery(id: number): Promise<Photo | null> {
  const photo = await Photo.findOne({
    where: {
      id,
    },
    relations: {
      user: true,
    },
  });

  if (!photo) {
    return null;
  }

  return photo;
}

export default MyPhotoQuery;
