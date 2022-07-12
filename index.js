const express = require("express");
const app = express()

const PORT = process.env.PORT || 4000;
app.use(express.json());


const rooms = [
    {
        roomID: 1,
        roomName: "Standard Room",
        noOfSeats: "1",
        amenities: ["TV"],
        pricePerHour: 100,
        bookedStatus: true,
        customerDetails: {
            customerName: "Customer 1",
            date: "2022/07/06",
            startTime: "12:30",
            endTime: "20:00",
        }
    },
    {
        roomID: 2,
        roomName: "Deluxe Room",
        noOfSeats: "2",
        amenities: ["TV", "AC", "Wifi"],
        pricePerHour: 250,
        bookedStatus: true,
        customerDetails: {
            customerName: "Customer 2",
            date: "2022/07/08",
            startTime: "10:00",
            endTime: "16:00",
        }
    },
    {
        roomID: 3,
        roomName: "Mini Suite",
        noOfSeats: "2",
        amenities: ["TV", "AC", "Wifi", "Pool"],
        pricePerHour: 500,
        bookedStatus: true,
        customerDetails: {
            customerName: "Customer 3",
            date: "2022/07/07",
            startTime: "10:00",
            endTime: "16:00",
        }
    },
    {
        roomID: 4,
        roomName: "Standard Room",
        noOfSeats: "2",
        amenities: ["TV"],
        pricePerHour: 100,
        bookedStatus: false,
        customerDetails: {
            customerName: "",
            date: "",
            startTime: "",
            endTime: "",
        }
    }

];


app.get("/", (req, res) => {
    res.send("HALL BOOKING API")
})

//Creating a room
app.post("/rooms/create", (req, res) => {

    const newRoom = req.body;
    rooms.push(newRoom);
    res.send("Room created successfully");
    console.log("Room created");
})

// Booking a room
app.post("/rooms/book", (req, res) => {
    const booking = req.body;

    rooms.map((room) => {
        if (room.roomID == booking.roomID) {
            if (room.customerDetails.date != booking.date) {
                room.customerDetails.customerName = booking.customerName;
                room.customerDetails.date = booking.date;
                room.customerDetails.startTime = booking.startTime;
                room.customerDetails.endTime = booking.endTime;
                room.bookedStatus = true
                res.send("Booking Success")
            } else {
                res.send("Sorry! Room is  already booked for that date, Please choose a differnt room")
            }
        }
        return room;
    })
    console.log("Room Booked")
})


//List all rooms with booked data
app.get("/occupiedRooms", (req, res) => {
    occupiedRooms = rooms.filter((room) => {
        if (room.bookedStatus == true) {
            return room
        }
    }).map((room) => {

        return {
            "Room name": room.roomName,
            "Booked Status": "Booked",
            "Customer Name": room.customerDetails.customerName,
            "Date": room.customerDetails.date,
            "Start Time": room.customerDetails.startTime,
            "End Time": room.customerDetails.endTime,
        }

    })
    res.send(occupiedRooms)

});

//List all customers with booked data
app.get("/customerData", (req, res) => {
    const data = rooms.filter((room) => {
        if (room.bookedStatus === true) {
            return room;
        }
    }).map((room) => {
        if (room.bookedStatus === true) {
            return {
                "Room name": room.roomName,
                "Customer Name": room.customerDetails.customerName,
                "Date": room.customerDetails.date,
                "Start Time": room.customerDetails.startTime,
                "End Time": room.customerDetails.endTime,
            };
        }
    })
    res.send(data)
});


app.listen(PORT, () => {
    console.log("server is running fine")
})