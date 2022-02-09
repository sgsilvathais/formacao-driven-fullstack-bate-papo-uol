
function SendName(){
    const input = document.querySelector("input");
    const name = input.value;

    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', name);

    if (request.then == 400){
        SolveError();
    }
    else {
        
    }
}

function SolveError(){
    alert("Nome já está em uso, tente novamente!");
}
