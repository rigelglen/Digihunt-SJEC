axios.get(`/getLevels/${localStorage.id}`).then((response) => {
    console.log(response.data.userArray.levels);
    localStorage.levels = JSON.stringify(response.data.userArray.levels);
});