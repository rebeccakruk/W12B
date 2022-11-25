function actSuccess(response){
    clear();
    let data = response.data;
    activity.insertAdjacentHTML(`afterbegin`, `<h1>Activity: ${data.activity}</h1>`);
    activity.insertAdjacentHTML(`beforeend`, `<h4>Type: ${data.type}</h4>`);
    activity.insertAdjacentHTML(`beforeend`, `<h4>Participants: ${data.participants}</h4>`);
    // console.log(data);
    console.log(`Success!!`);
}

function actFailure(error){
    // console.log(error);
    activity.insertAdjacentHTML(`afterbegin`, `<h2>Activity failed to load. Please try again.</h2>`);
}

function typeSuccess(response){
    clear();
    let type = response.data;
    // console.log(data);
        actByType.insertAdjacentHTML(`afterbegin`, `<h1>Type: ${type.type}</h1>`);
        actByType.insertAdjacentHTML(`beforeend`, `<h4>Activity: ${type.activity}</h4>`);
        actByType.insertAdjacentHTML(`beforeend`, `<h4>Participants: ${type.participants}</h4>`);   
}

function typeFailure(error){
    // console.log(error);
    actByType.insertAdjacentHTML(`afterbegin`, `<h2>Activity by type failed to load. Please try again.</h2>`);
}

function clickMe(){
axios.request({
    url : "https://www.boredapi.com/api/activity/",
}).then(actSuccess).catch(actFailure);
}

function dropdown(){
    axios.request({
        url: "https://www.boredapi.com/api/activity?type=",
        params: {       
            type: document.querySelector(`select`).value,
        }
    }).then(typeSuccess).catch(typeFailure)
}

function participantSuccess(response){
    let participants = response.data;
    // console.log(participants);
        document.getElementById(`howManyPeople`).insertAdjacentHTML(`beforeend`, `<h1>Type: ${participants.type}</h1>`);
        document.getElementById(`howManyPeople`).insertAdjacentHTML(`beforeend`, `<h4>Activity: ${participants.activity}</h4>`);
       document.getElementById(`howManyPeople`).insertAdjacentHTML(`beforeend`, `<h4>Participants: ${participants.participants}</h4>`); 
}

function participantFailure(error){
    console.log(error);
    howMany.insertAdjacentHTML(`afterbegin`, `<h2>Activity by number of participants failed to load. Please try again.</h2>`);

}

function submit(){
axios.request({
     url: "https://www.boredapi.com/api/activity?participants=",
        params: {      
            participants: document.getElementById(`participants`).value,
        }
}).then(participantSuccess).catch(participantFailure);
}

function clear() {
    activity.innerText = "";
    actByType.innerText = "";
    actParticipants.innerText = "";
    document.getElementById(`participantResults`).innerText = "";
}

let activity = document.getElementById(`randomResult`);
let actByType = document.getElementById(`typeResult`);
let actParticipants = document.getElementById(`participants`);
let howMany = document.getElementById(`howManyPeople`);
document.getElementById(`randomActivity`).addEventListener(`click`, clickMe);
document.getElementById(`dropdown`).addEventListener(`change`, dropdown);
document.getElementById(`submit`).addEventListener(`click`, submit);