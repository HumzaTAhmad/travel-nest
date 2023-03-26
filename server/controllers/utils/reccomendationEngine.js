import KNN from 'ml-knn'
import roomModel from '../../models/Room.js';
import userModel from '../../models/User.js';

const getRoomFeatures = (room) => [
  room.roomType === 'private' ? 0 : 1,
  room.bathroomType === 'private' ? 0 : 1,
  room.occupancy,
  room.LengthOfStay,
];
 
export const recommendRoom = async(userId, k=3) =>{
    const user = await userModel.findById(userId)

    if(!user || user.favoriteRooms.length === 0){
        return null
    }

    const favoriteRoomIds = user.favoriteRooms.map((favRoom) => favRoom._id);

    const allRooms = await roomModel
    .find({
        _id: {
        $nin: favoriteRoomIds,
        },
    })
    .exec();

    const roomsData = allRooms.map(getRoomFeatures)
    const favoriteRoomsData = user.favoriteRooms.map(getRoomFeatures)

    const knn = new KNN(roomsData, allRooms.map((_, index) => index), {k}) //train KNN algorithm

    const recommendations = [];

    for(const favoriteRoom of favoriteRoomsData){
        const indices = [knn.predict(favoriteRoom)];
        for(const index of indices) {
            const recommendedRoom = allRooms[index]
            if (!recommendations.includes(recommendedRoom) && !user.favoriteRooms.some((favRoom) => favRoom._id === recommendedRoom._id)) {
                recommendations.push(recommendedRoom);
            }
        }
    }
    return recommendations
}