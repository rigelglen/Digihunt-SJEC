let button = document.querySelector('#submitCode');
let inp = document.querySelector('#code');

button.addEventListener('click', () => {
    if (inp.value.trim().length > 2) {
        document.querySelector(".overlay").style.display = 'flex';
        axios.post('/genID', {
            uid: inp.value.trim()
        }).then((response) => {
            console.log(`Response is ${response.data}`)
            console.log(`ID generated is ${response.data.id}`);
            document.querySelector(".overlay").style.display = 'none';
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
            window.location.href = '/level1';
        }).catch((err) => {
            document.querySelector(".overlay").style.display = 'none';
        });
    }else{
        swal('Error', 'Incorrect input', 'error');
    }
});