function activitySuccess(response){
    let data = response.data;
    console.log(data);
    for(let ideas of data){
    document.body.insertAdjacentHTML(`afterbegin`, `<h2>${ideas[`key`]}</h2>`);
}};

//     let data = response.data;
    // for(let post of data){

function activityFailure(error){
    console.log(`loser`);
}

axios.request({
    url: "http://www.boredapi.com/api/activity/"
}).then(activitySuccess).catch(activityFailure);

document.getElementById(`randomActivity`).addEventListener(`click`, activitySuccess);