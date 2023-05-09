/*import KNN from 'ml-knn'
import roomModel from '../../models/Room.js';
import userModel from '../../models/User.js';

const getRoomFeatures = (room) => [
  room.roomType === 'private' ? 0 : 1,
  room.bathroomType === 'private' ? 0 : 1,
  room.occupancy,
  room.LengthOfStay,
];
 
const averageFeatures = (featureArrays) => {
    const sumFeatures = featureArrays.reduce(
        (acc, features) => features.map((value, index) => acc[index] + value),
        new Array(featureArrays[0].length).fill(0)
    );
    return sumFeatures.map((value) => value / featureArrays.length);
};

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

    const averageFavoriteRoom = averageFeatures(favoriteRoomsData);
    const index = knn.predict(averageFavoriteRoom);
    console.log("HIIIII" + allRooms)
    return allRooms[index];
    
    /*
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
    */
//}
import KNN from 'ml-knn';
import roomModel from '../../models/Room.js';
import userModel from '../../models/User.js';

const getRoomFeatures = (room) => [
  room.roomType === 'private' ? 0 : 1,
  room.bathroomType === 'private' ? 0 : 1,
  room.occupancy,
  room.LengthOfStay,
];

const averageFeatures = (featureArrays) => {
  const sumFeatures = featureArrays.reduce(
    (acc, features) => features.map((value, index) => acc[index] + value),
    new Array(featureArrays[0].length).fill(0)
  );
  return sumFeatures.map((value) => value / featureArrays.length);
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

export const recommendRoom = async (userId, k = 3, userLocation) => {
  console.log(userLocation)
  const user = await userModel.findById(userId);

  if (!user || user.favoriteRooms.length === 0) {
    return null;
  }

  const favoriteRoomIds = user.favoriteRooms.map((favRoom) => favRoom._id);

  const allRooms = await roomModel
    .find({
      _id: {
        $nin: favoriteRoomIds,
      },
    })
    .exec();

  // Filter rooms within 100-mile radius
  const filteredRooms = allRooms.filter(room => {
    const distance = haversineDistance(userLocation.lat, userLocation.lng, room.lat, room.lng);
    return distance <= 160.934; // 100 miles in kilometers
  });

  for(let i = 0; i < filteredRooms.length; i++){
    console.log(filteredRooms[i].title)
  }

  const roomsData = filteredRooms.map(getRoomFeatures);
  const favoriteRoomsData = user.favoriteRooms.map(getRoomFeatures);

  const knn = new KNN(roomsData, filteredRooms.map((_, index) => index), { k }); //train KNN algorithm

  const averageFavoriteRoom = averageFeatures(favoriteRoomsData);
  console.log(averageFavoriteRoom)
  const index = knn.predict(averageFavoriteRoom);

  return filteredRooms[index];
};