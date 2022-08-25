const socket = io();

socket.on('connection',()=>{
    console.log("You are conected")
})

