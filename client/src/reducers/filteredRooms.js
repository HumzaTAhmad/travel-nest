
export default (state = [], action) => {
    switch (action.type){
        case 'FILTER_PRICE':
            return applyFilter(action.payload.all.rooms, action.payload.all.addressFilter, action.payload.price)
        case 'FILTER_ADDRESS':
            return  applyFilter(action.payload.all.rooms, action.payload.address, action.payload.all.priceFilter)
        case 'CLEAR_ADDRESS':
            return action.payload.all.rooms
        default:
            return state;
    }
}

const applyFilter = (rooms, address, price) => {
    let filteredRooms = rooms;
    if (address) {
      const { lng, lat } = address;
      filteredRooms = filteredRooms.filter((room) => {
        const lngDifference = lng > room.lng ? lng - room.lng : room.lng - lng;
        const latDifference = lat > room.lat ? lat - room.lat : room.lat - lat;
        return lngDifference <= 1 && latDifference <= 1;
      });
    }
  
    if (price < 50) {
      filteredRooms = filteredRooms.filter((room) => room.price <= price);
    }
  
    return filteredRooms;
  };