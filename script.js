const button = document.getElementById("getloc");

function gotLocation(position){
    console.log(position);
}

function failed() {
    console.log("There was an error");
}
button.addEventListener('click', async() =>{
    navigator.geolocation.getCurrentPosition(gotLocation,failed);
});