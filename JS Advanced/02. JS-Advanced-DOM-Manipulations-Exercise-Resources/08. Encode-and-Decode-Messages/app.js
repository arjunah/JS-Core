function encodeAndDecodeMessages() {
    const encode = document.getElementsByTagName("button")[0];
    const decode = document.getElementsByTagName("button")[1];
    const input = document.getElementsByTagName("textarea")[0];
    const output = document.getElementsByTagName("textarea")[1];

    encode.addEventListener("click", encodeSend);
    decode.addEventListener("click", decodeRead);

    function encodeSend() {
        let message = input.value;
        let sent = "";
        for (let i = 0; i < message.length; i++) {
            sent += String.fromCharCode(message.charCodeAt(i) + 1);
        }
        message = "";
        input.value = "";
        output.value = sent;
    }

    function decodeRead() {
        let message = output.value;
        let read = "";
        for (let i = 0; i < message.length; i++) {
            read += String.fromCharCode(message.charCodeAt(i) - 1);
        }
        output.value = read;
    }
}