var socket = io.connect("http://192.168.13.250:8054", { forceNew: true });

socket.on("messages", function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data
        .map(function (elem) {
            return `<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em>
            </div>`;
        })
        .join(" ");
    document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
    var message = {
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value
    };
    socket.emit("new-message", message);
    return false;
}