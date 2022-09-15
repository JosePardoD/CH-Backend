const socket = io();

socket.on('connection',()=>{
    console.log("You are conected")
});



socket.on("products", (data) => {
    console.log(data);
    

    let htmlToRender= `
    <table>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Foto</th>
    </tr>`;
    

    data.forEach(element => {
        
        htmlToRender=htmlToRender+ `
        
        <tr>
            <td>${element.id}</td>
            <td>${element.title}</td>
            <td>${element.price}</td>
            <td><img src=${element.thumbnail}></td>
        </tr>
        
        `
    });

    htmlToRender=htmlToRender+`</table>`

    document.querySelector("#products").innerHTML=htmlToRender;
})

socket.on("chat", (data) => {
    console.log(data);
    let htmlReduce=data.reduce((previewHtml,CurrentHtml)=>previewHtml+`
    <tr>
    <td><h1>${CurrentHtml.email}</h1></td>
    <td><h1>${CurrentHtml.message}</h1></td>
    <td><h1>${CurrentHtml.date}</h1></td>
    </tr>
    `,``
    )
    document.querySelector("#message").innerHTML=htmlReduce;
})


function addMessage(addMessage){
    let messageToAdd={
        email:addMessage.email.value,
        message:addMessage.message.value,
        date:new Date().toLocaleDateString(),
    }
    socket.emit("newMessage",messageToAdd)
}

    

