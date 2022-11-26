// Main success or failure functions
// results are displayed based on how user selected

// first one is a random activity selector
function actSuccess(response) {
    clear();
    let data = response.data;
    activity.insertAdjacentHTML(`afterbegin`, `<h1>Activity: ${data.activity}</h1>`);
    activity.insertAdjacentHTML(`beforeend`, `<h4>Type: ${data.type}</h4>`);
    activity.insertAdjacentHTML(`beforeend`, `<h4>Participants: ${data.participants}</h4>`);
}

function actFailure(error) {
    clear();
    activity.insertAdjacentHTML(`afterbegin`, `<h2>Activity failed to load. Please try again.</h2>`);
}

// second is a selector by activity type
function typeSuccess(response) {
    clear();
    let type = response.data;
    actByType.insertAdjacentHTML(`afterbegin`, `<h1>Type: ${type.type}</h1>`);
    actByType.insertAdjacentHTML(`beforeend`, `<h4>Activity: ${type.activity}</h4>`);
    actByType.insertAdjacentHTML(`beforeend`, `<h4>Participants: ${type.participants}</h4>`);
}

function typeFailure(error) {
    clear();
    actByType.insertAdjacentHTML(`afterbegin`, `<h2>Activity by type failed to load. Please try again.</h2>`);
}

// third selector is a drop down for the number of participants
// I wasn't successful getting a function to alert the user if the field was blank or invalid (ie. 0 participants)
function participantSuccess(response) {
    clear();
    let participants = response.data;
    numberOfParticipants.insertAdjacentHTML(`beforeend`, `<h1>Participants: ${participants.participants}</h1>`);
    numberOfParticipants.insertAdjacentHTML(`beforeend`, `<h4>Type: ${participants.type}</h4>`);
    numberOfParticipants.insertAdjacentHTML(`beforeend`, `<h4>Activity: ${participants.activity}</h4>`);
}

function participantFailure(error) {
    clear();
    document.getElementById(`participantResults`).insertAdjacentHTML(`afterbegin`, `<h2>Activity by number of people failed to load. Please try again.</h2>`);
}

// axios request on 'click' with no params
// random activity selector
function clickMe() {
    axios
        .request({
            url: "https://www.boredapi.com/api/activity/",
        })
        .then(actSuccess)
        .catch(actFailure);
}

// axios request on selection of dropdown menu
// included params with values taken from DOM
function dropdown() {
    axios
        .request({
            url: "https://www.boredapi.com/api/activity?type=",
            params: {
                type: document.querySelector(`select`).value,
            },
        })
        .then(typeSuccess)
        .catch(typeFailure);
}

// axios request on textbox for number of participants
// included params with number values from DOM
function submit() {
    axios
        .request({
            url: "https://www.boredapi.com/api/activity?participants=",
            params: {
                participants: actParticipants.value,
            },
        })
        .then(participantSuccess)
        .catch(participantFailure);
}

// clearing the info to keep the page clean
function clear() {
    activity.innerText = "";
    actByType.innerText = "";
    actParticipants.innerText = "";
    numberOfParticipants.innerText = "";
}

// my attempt at not allowing the submit button without an alert if the field was empty or 0
function required() {
    let empty = actParticipants;
    if (empty == "" || empty == 0) {
        alert("Please select a number of participants");
    }
}

// cleaning up code
let activity = document.getElementById(`randomResult`);
let actByType = document.getElementById(`typeResult`);
let actParticipants = document.getElementById(`participants`);
let numberOfParticipants = document.getElementById(`participantResults`);
let howMany = document.getElementById(`howManyPeople`);
document.getElementById(`randomActivity`).addEventListener(`click`, clickMe);
document.getElementById(`dropdown`).addEventListener(`change`, dropdown);
document.getElementById(`submit`).addEventListener(`click`, submit);
