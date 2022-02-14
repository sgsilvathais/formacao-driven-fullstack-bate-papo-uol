let chat = [];
let username;
let receiver = "Todos";
let text;
let typeMessage = "message";

function SendName(){
    const input = document.querySelector("input");
    username = input.value;
    const section = document.querySelector("section");
    section.classList.add("hidden");
    const img = document.querySelector(".loading");
    img.classList.remove("hidden");

    const resp = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: username});
    resp.then(SolveSuccess);
    resp.catch(SolveError);  
}

function SolveError(resposta){
    const statusCode = resposta.response.status;
    if(statusCode == 400)
    {
        alert("Nome já está em uso, tente novamente!");
        const section = document.querySelector("section");
        section.classList.remove("hidden");
        const img = document.querySelector(".loading");
    img.classList.add("hidden");
        SendName();
    }
    console.log(resposta.data);
}

function SolveSuccess(resposta){
    const statusCode = resposta.status;
    if(statusCode == 200) {
        RenderChat();
    }
    console.log(resposta.data);
}

function RenderChat(){
    const loading = document.querySelector(".loading");
    loading.classList.add("hidden");
    const footer = document.querySelector("footer");
    footer.classList.remove("hidden"); 
    const nav = document.querySelector("nav");
    nav.classList.remove("hidden");

    
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promise.then(processingResponse);
    promise.catch(processingError);

    const main = document.querySelector("main");
    main.scrollIntoView({block: "end"});

    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    for (let i = 0; i < chat.length; i++) {
        if(chat[i].type == 'message'){
        ul.innerHTML += `
            <li class="general-message">
                <span class="time">${chat[i].time}</span> 
                <span class="name">${chat[i].from}</span>
                para
                <span class="name">${chat[i].to}</span>:
                <span class="message">${chat[i].text}</span>
            </li>   
        `;
        } else if(chat[i].type == 'status'){
            ul.innerHTML += `
            <li class="status-message">
                <span class="time">${chat[i].time}</span> 
                <span class="name">${chat[i].from}</span>
                <span class="message">${chat[i].text}</span>
            </li>   
        `;
        }    else if(chat[i].type == 'private-message'){
            ul.innerHTML += `
                <li class="private-message">
                    <span class="time">${chat[i].time}</span> 
                    <span class="name">${chat[i].from}</span>
                    reservadamente para
                    <span class="name">${chat[i].to}</span>:
                    <span class="message">${chat[i].text}</span>
                </li>   
            `;
        }
    }

}

function processingResponse(response){
    console.log(response);
    chat = response.data;
    RenderChat();
}

function processingError(error){
    console.log(error.data);
}

function SendMessage(){
    const inputMessage = document.querySelector(".input-message");
    text = inputMessage.value;

    const response = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", {from: username,
                                                                                       to: receiver,
                                                                                       text: text,
                                                                                       type: typeMessage});

    response.then(SolveSuccess);
    response.catch(FailedToSend);

}
setInterval(1000, RenderChat);