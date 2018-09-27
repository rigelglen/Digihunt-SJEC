let button = document.querySelector('#submitCode');
let inp = document.querySelector('#code');

button.addEventListener('click', () => {
    if (inp.value.trim().length > 5 && !isNaN(inp.value.trim())) {
        document.querySelector(".overlay").style.display = 'flex';
        axios.post('/genID', {
            uid: parseInt(inp.value.trim())
        }).then((response) => {
            console.log(`ID generated is ${response.data.id}`);
            document.querySelector(".overlay").style.display = 'none';
            localStorage.setItem("id", response.data.id);
            window.location.href = '/level1';
        }).catch((err) => {
            document.querySelector(".overlay").style.display = 'none';
        });
    }else{
        alert('Incorrect input');
    }
});