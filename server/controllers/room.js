


export async function createRoom(req, res) {
    console.log("createRoom runs")
    return res.status(201).json({success:true, result:{id:123, title:'test room'}});
}