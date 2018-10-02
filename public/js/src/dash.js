const completedList = document.getElementById("completedList");
const wrapper = document.getElementById("wrapper");
const socket = io();
let completed = []
socket.on('userUpdate', (jsonData) => {
    console.log(`${jsonData} recieved`);
    completed = [];
    wrapper.innerHTML = '';
    completedList.innerHTML = '';
    try {
        var data = JSON.parse(`${jsonData}`);
    } catch (e) { }
    console.log('Parsed data is ' + data);
    // Create json-tree
    ta.value = JSON.stringify(data, null, 4);
    let tree = jsonTree.create(data, wrapper);

    for (var i = 0; i < data.length; i++) {
        if (data[i].levels.length == 7)
            completed.push(data[i]);
    }

    console.log('Completed teams are' + completed);

    for (let d of completed) {
        completedList.innerHTML += `<li>${d.id} - Completed at ${d.completionTime}</li>`
    }

    console.log('Completed list is ' + JSON.stringify(completed, null, 4));

    // Expand all (or selected) child nodes of root (optional)
    tree.expand();
});

const ta = document.getElementById('ta');
const btn = document.querySelector('#sub');

btn.addEventListener('click', () => {
    let val = ta.value
    console.log(val);

    axios.post('/memparse/abcd1234', {
        jsonData: JSON.parse(val)
    }).then((response) => {
        console.log('Sucess!');
    }).catch((err) => {
        console.log('Error');
    });

});