let button = document.querySelector('#submitCode');
let inp = document.querySelector('#code');

if (JSON.parse(localStorage.levels)[5]) {
    document.querySelector('.completed').style.display = 'inline';
}

button.addEventListener('click', () => {
    if (inp.value.trim().length > 4) {
        document.querySelector(".overlay").style.display = 'flex';
        axios.post('/level6/auth', {
            code: parseInt(inp.value.trim())
        }).then((response) => {
            console.log(`Status is ${response.data.message}`);
            console.log(`Code is ${response.data.code}`);

            document.querySelector(".overlay").style.display = 'none';
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
            window.location.href='./level7';
        }).catch((err) => {
            alert('Wrong code');
            document.querySelector(".overlay").style.display = 'none';
        });
    } else {
        alert('Incorrect input');
    }
});