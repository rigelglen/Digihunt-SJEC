axios.get(`/getLevels/${localStorage.id}`).then((response) => {
    localStorage.levels = JSON.stringify(response.data.userArray.levels);
    if (JSON.parse(localStorage.levels)[4]) {
        document.querySelector('.completed').style.display = 'inline';
    }
});

let button = document.querySelector('#submitCode');
let inp = document.querySelector('#code');



button.addEventListener('click', () => {
    if (inp.value.trim().length > 4) {
        document.querySelector(".overlay").style.display = 'flex';
        axios.post('/level5/auth', {
            code: inp.value.trim()
        }).then((response) => {
            console.log(`Status is ${response.data.message}`);
            console.log(`Code is ${response.data.code}`);

            document.querySelector(".overlay").style.display = 'none';
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
            window.location.href = './level6';
        }).catch((err) => {
            swal('Error', 'Wrong code', 'error');
            document.querySelector(".overlay").style.display = 'none';
        });
    } else {
        swal('Error', 'Incorrect input', 'error');
    }
});

var containerElement = document.getElementById("market");

var containerMonitor = scrollMonitor.createContainer(containerElement);
// this containerMonitor is an instance of the scroll monitor
// that listens to scroll events on your container.

var popupSection1 = document.getElementById("popupSection1");
var popupSection1Watcher = containerMonitor.create(popupSection1, -150);

popupSection1Watcher.enterViewport(function () {
    alert('EXTRA EXTRA EXTRA BUY NOW FOR ONLY 100 SHMECKLES!!!!!!');
    swal('EMERGENCY ALERT', 'EXTRA EXTRA EXTRA BUY NOW FOR ONLY 100 SHMECKLES!!!!!!', 'info').then(() => {
        swal('EMERGENCY ALERT', 'EXTRA EXTRA EXTRA BUY NOW FOR ONLY 100 SHMECKLES!!!!!!', 'info');
    }).then(() => {
        swal('EMERGENCY ALERT', 'BUY NOWWWW!!!!!!!!!!!!', 'info');
    }).then(() => {
        swal('EMERGENCY ALERT', 'EXTRA EXTRA EXTRA BUY NOW FOR ONLY 100 SHMECKLES!!!!!!', 'info');
    });
});
popupSection1Watcher.exitViewport(function () {
    alert('DO NOT LEAVE ');
    alert('SPECIAL OFFER IF YOU DO NOT LEAVE');
    alert('BUY FOR JUST 50 SHMECKLES');
    confirm('ARE YOU SURE YOU WANT TO LEAVE');
});