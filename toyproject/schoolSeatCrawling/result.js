const root = require('./root.js');

const getSeatData = async (room_number, type) => {
  const url = `http://203.229.203.240/8080/roomview5.asp?room_no=${room_number}`;
  const target = 'div>table>tbody>tr>td';
  const seat = await root.getSeatNumber(room_number);

  if (room_number == 1 || room_number == 2) {
    if (type == 1) return await root.getNormalSeatDataBySingle(url, room_number, type, seat, target);
    return await root.getLaptopSeatDataBySingle(url, room_number, type, seat, target);
  } else {
    if (type == 1) return await root.getNormalSeatDataByDouble(url, room_number, type, seat, target);
    return await root.getLaptopSeatDataByDouble(url, room_number, type, seat, target);
  }
};

const test=async ()=>{
  var x =await getSeatData(1,1);
  console.log(x);
}

test();


module.exports = { getSeatData };