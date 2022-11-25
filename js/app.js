function activitySuccess(response){
    let data = response.data;
    console.log(data);
    // for(let result of data){
    document.body.insertAdjacentHTML(`afterbegin`,
     `<h2>Activity: ${data[`activity`]}</h2>`);
    document.body.insertAdjacentHTML(`afterbegin`,
     `<h3>Type: ${data[`type`]}</h3>`);
};

function activityFailure(error){
    console.log(`loser`);
};

function clickRandom(){
axios.request({
    url: "http://www.boredapi.com/api/activity/"
}).then(activitySuccess).catch(activityFailure);
};
document.getElementById(`randomActivity`).addEventListener(`click`, clickRandom);