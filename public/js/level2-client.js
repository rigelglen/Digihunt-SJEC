let button = document.querySelector('#submitCode');
let inp = document.querySelector('#code');

button.addEventListener('click', () => {
    if (inp.value.trim().length > 4 && !isNaN(inp.value.trim())) {
        document.querySelector(".overlay").style.display = 'flex';
        axios.post('/level2/auth', {
            code: parseInt(inp.value.trim())
        }).then((response) => {
            console.log(`Status is ${response.data.message}`);
            console.log(`Code is ${response.data.code}`);

            document.querySelector(".overlay").style.display = 'none';
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("levels", response.data.userArray.levels);
        }).catch((err) => {
            alert('Wrong code');
            document.querySelector(".overlay").style.display = 'none';
        });
    } else {
        alert('Incorrect input');
    }
});