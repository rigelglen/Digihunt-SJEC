axios.get(`/getLevels/${localStorage.id}`).then((response) => {
    localStorage.levels = JSON.stringify(response.data.userArray.levels);
    if (JSON.parse(localStorage.levels)[1]) {
        document.querySelector('.completed').style.display = 'inline';
    }
});



let button = document.querySelector('#submitCode');
let inp = document.querySelector('#code');

button.addEventListener('click', () => {
    if (inp.value.trim().length > 3) {
        document.querySelector(".overlay").style.display = 'flex';
        axios.post('/level2/auth', {
            code: inp.value.trim()
        }).then((response) => {

            document.querySelector(".overlay").style.display = 'none';
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
            window.location.href = './level3';
        }).catch((err) => {
            swal('Error', 'Wrong code', 'error');
            document.querySelector(".overlay").style.display = 'none';
        });
    } else {
        swal('Error', 'Incorrect input', 'error');
    }
});