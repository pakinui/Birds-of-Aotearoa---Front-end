/*
    JavaScript for if the user is on a device with a screen width 
    larger than 600px. 
    i.e. a computer, tablet
*/

const birdFile = "./data/nzbird.json";
let jsonData; // inital json file bird array
/*
    array of colours and which conservation status they represent
*/
const colours = [['Not Threatened', '#02a028'], ['Naturally Uncommon', '#649a31'],
['Relict', '#99cb68'], ['Recovering', '#fecc33'], ['Declining', '#fe9a01'],
['Nationally Increasing', '#c26967'], ['Nationally Vulnerable', '#9b0000'],
['Nationally Endangered', '#660032'], ['Nationally Critical', '#320033'],
['Extinct', '#000000'], ['Data Deficient', '#000000']];
fetchData();

/*
    function to fetch data 
*/
async function fetchData(){
    const resp = await fetch(birdFile);
    if(!resp.ok){
        console.error(resp.status);
    }
    const  data = await resp.text();
    jsonData = JSON.parse(data); // jsonData array if filled with bird info now
    startDesktopWebsite();
}

/*
    function to start printing the bird cards
*/
 function startDesktopWebsite() {

    //print each bird card in jsonData
    for (let i = 0; i < jsonData.length; i++) {
        printCards(jsonData, i);
    }
}

/*
    give the home button a function when clicked.
    will return to the main screen of all 68 bird 
    cards and scroll back to the top.
*/
let homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function () {

    reloadBirds();
    printing(jsonData);//print all 68 original bird cards
    redHearts(jsonData);
});

/* 
    function to search the text that the user inputs.
    uses normalize function to cater towards comparing 
    unicode and special characters.
    this means if someone searches for 'Kaki' the bird 
    'Kakī' will match the search and vice versa.
*/
/*
    i have excluded 'other_names' from the json file in 
    the search results initally.
    this is because i have not listed each birds other names 
    on their card and if i were to search 'south' for example, 
    many bird match the search whose other names include south 
    but not any of the names on the card which can be confusing 
    to look at.
*/
/*
    code for including 'other_names' in the search is commented 
    out but can be included.
*/
function searchNames(searchArray, input) {
    let contains = new Array(); // array which will be filled with birds who match search
    for (let i = 0; i < searchArray.length; i++) {
        let bird = searchArray[i];

        let names = '';
        //concat names (excluding 'other_names')
        names = names.concat(bird.primary_name.toLowerCase() + ' ' + bird.english_name.toLowerCase() + ' ' + bird.scientific_name.toLowerCase() + ' ' + bird.order.toLowerCase() + ' ' + bird.family.toLowerCase());

        //to exclude 'other_names' (comment out for loop)
        // for (let y = 0; y < bird.other_names.length; y++) {
        //     names = names.concat(' ' + bird.other_names[y].toLowerCase());
        // }

        let name = names.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
        let text = input.normalize("NFD").replace(/[\u0300-\u036f]/g, '');

        if (name.includes(text)) {
            contains[contains.length] = bird;
        }
    }
    return contains; // array of birds whose name(s) match the search
}

/*
    function to be called when the family or order on 
    a bird card is clicked.
    displays (if any) other birds in that same 
    family/order.
*/
function searchTaxonomy(string) {
    let data = new Array();
    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].family == string || jsonData[i].order == string) {
            data[data.length] = jsonData[i];
        }
    }
    reloadBirds();
    printing(data);
}

/*
    function which is called by a click on the filter results 
    button in the sidebar.
    this filters the birds so only matching birds will be 
    presented on the screen.
*/
function searchEvent(eventData) {
    eventData.preventDefault(); //prevents reload

    let s = document.getElementById('SB-button');//sort by value
    let c = document.getElementById('CS-button');//conservation status value

    //arrays to help handle the filtering process
    let data1 = new Array();
    let data2 = new Array();

    let dataCount = 0;//count to keep track of data2 length
    let search = document.getElementById('searchbar');
    let searchFor = search.value.toLowerCase();

    /*
        this if/else section handles the text search
        it calls a method called 'searchNames' which 
        finds and birds whose name(s) match the text 
        provided by the user.
    */
    if (searchFor == "") {
        data1 = Array.from(jsonData);
    } else {
        data1 = searchNames(Array.from(jsonData), searchFor);
    }

    /*
        this if/else section handles the conservations 
        status filter.
    */
    if (c.value === "All") {
        data2 = Array.from(data1);
    } else {
        for (let i = 0; i < data1.length; i++) {
            if (data1[i].status == c.value) {
                data2[dataCount] = data1[i]; // if status matches then add to data2
                console.log(data2[dataCount++].primary_name);
            }
        }
    }

    /*
        this if/else section is in charge of the sort by 
        button/options.
    */
    let finalBirds = new Array();

    if (s.value === "Lightest to Heaviest") {
        finalBirds = Array.from(data2.sort(function (a, b) { return a.size.weight.value - b.size.weight.value }));

    } else if (s.value === "Heaviest to Lightest") {
        finalBirds = Array.from(data2.sort(function (a, b) { return b.size.weight.value - a.size.weight.value }));

    } else if (s.value === "Common to Extinct") {
        let dataCopy = Array.from(data2);
        finalBirds = Array.from(com2Ext(dataCopy));

    } else if (s.value == "Extinct to Common") {
        let dataCopy = Array.from(data2);
        finalBirds = Array.from(com2Ext(dataCopy).reverse());

    } else if (s.value == "Shortest to Tallest") {
        finalBirds = Array.from(data2.sort(function (a, b) { return a.size.length.value - b.size.length.value }));

    } else if (s.value == "Tallest to Shortest") {
        finalBirds = Array.from(data2.sort(function (a, b) { return b.size.length.value - a.size.length.value }));

    } else if (s.value == "A to Z by Scientific name") {
        finalBirds = Array.from(data2.sort(function (a, b) {
            let x = a.scientific_name.toLowerCase();
            let y = b.scientific_name.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        }));

    } else {//s.value = "Z to A by Scientific name"
        finalBirds = Array.from(data2.sort(function (a, b) {
            let x = a.scientific_name.toLowerCase();
            let y = b.scientific_name.toLowerCase();
            if (x > y) { return -1; }
            if (x < y) { return 1; }
            return 0;
        }));;
    }

    printing(finalBirds);

    //scroll back to the top to view results
    scrollToTop();
}

/*
    function to scroll back to the top of the page.
    used when home button is clicked and when filter 
    button for search is clicked.
*/
function scrollToTop() {
    let m = document.getElementById('myMain');
    m.scrollTop = 0;
    m.scrollTop = 0;
}

/*
    function to print an array of birds.
    called from the searchEvent function and
    listeners.
*/
function printing(arr) {
    reloadBirds();
    for (let i = 0; i < arr.length; i++) {
        printCards(arr, i);
    }
    //change text to show how many results were found
    let found = document.getElementById('searchNumber');
    let num = arr.length;
    found.textContent = num + ' results found.';
    redHearts(arr);
    scrollToTop();
}

/*
    add a listener to filter results button in sidebar
    calls searchEvent function to filter through the 
    birds and display any that match
*/
let button = document.querySelector("#search-button");
button.addEventListener('click', searchEvent);

/*
    function to remove all current bird cards on the screen
*/
function reloadBirds() {
    let main = document.getElementById('myMain');
    main.innerHTML = '';
}

/*
    function to print/create the bird card at the index in the 
    array provided
*/
function printCards(array, count) {
    let main = document.getElementById('myMain');
    let card = document.createElement('div');
    let cardArea = document.createElement('div');
    cardArea.setAttribute('class', 'cardBorder');
    card.setAttribute('class', 'birdCard');

    //select which bird this card will print
    let bird = array[count];

    //photo
    let photo = document.createElement('img'); //create img
    photo.setAttribute('class', 'birdPhoto');
    photo.src = bird.photo.source;
    card.appendChild(photo);// add photo to card

    //like buttton
    let heart = document.createElement('button');
    heart.setAttribute('class', 'likeButton');
    let heartTxt = document.createElement('p');
    heartTxt.setAttribute('class', 'heartTxt');
    heartTxt.setAttribute('id', bird.scientific_name + 'Heart');
    heart.addEventListener('click', function () { likeBird(bird.scientific_name) }); //add action listener
    heartTxt.textContent = '🤍';
    heart.appendChild(heartTxt);
    card.appendChild(heart);//add likes button to card

    //bird name
    let maori = array[count].primary_name;
    let topInfo = document.createElement('div');
    topInfo.setAttribute('class', 'topInfo');
    let title = document.createElement('h2');
    title.textContent = maori;
    topInfo.appendChild(title);// add primary name to div
    card.appendChild(topInfo);//add div to card


    //bottom info
    let bottomInfo = document.createElement('div');
    bottomInfo.setAttribute('class', 'bottomInfo');
    let name = bird.english_name;
    let engName = document.createElement('h2');
    let nameBackground = document.createElement('div');
    nameBackground.setAttribute('class', 'nameBackground');
    nameBackground.appendChild(engName);
    engName.textContent = name;
    bottomInfo.appendChild(nameBackground);//add english name to bottom info div
    let divide = document.createElement('hr');
    divide.setAttribute('class', 'cardHR');
    bottomInfo.appendChild(divide);//add divide to bottom info div

    //grid of other info

    //scientific name
    let grid = document.createElement('div');
    grid.setAttribute('class', 'gridInfo');
    let sciBold = document.createElement('p');
    sciBold.setAttribute('class', 'bold');
    sciBold.textContent = 'Scientific name';
    grid.appendChild(sciBold);
    let sciName = document.createElement('p');
    sciName.textContent = bird.scientific_name;
    sciName.setAttribute('class', 'right');
    grid.appendChild(sciName);//add scientific info to grid

    //family
    let famBold = document.createElement('p');
    famBold.setAttribute('class', 'bold');
    famBold.textContent = 'Family';
    grid.appendChild(famBold);
    let famName = document.createElement('p');
    famName.textContent = bird.family;
    famName.setAttribute('class', 'right');
    famName.setAttribute('id', 'famButton');
    famName.addEventListener('click', function () { searchTaxonomy(bird.family) }); //add action listener
    grid.appendChild(famName);//add family info to grid

    //order
    let ordBold = document.createElement('p');
    ordBold.setAttribute('class', 'bold');
    ordBold.textContent = 'Order';
    grid.appendChild(ordBold);
    let ordName = document.createElement('p');
    ordName.textContent = bird.order;
    ordName.setAttribute('class', 'right');
    ordName.setAttribute('id', 'ordButton');
    ordName.addEventListener('click', function () { searchTaxonomy(bird.order) }); //add action listener
    grid.appendChild(ordName);//add order info to grid

    //status
    let staBold = document.createElement('p');
    staBold.setAttribute('class', 'bold');
    staBold.textContent = 'Status';
    grid.appendChild(staBold);
    let staName = document.createElement('p');
    staName.textContent = bird.status;
    staName.setAttribute('class', 'right');
    grid.appendChild(staName);//add conservation status info to grid

    //length
    let lenBold = document.createElement('p');
    lenBold.setAttribute('class', 'bold');
    lenBold.textContent = 'Length';
    grid.appendChild(lenBold);
    let lenName = document.createElement('p');
    lenName.textContent = bird.size.length.value + ' ' + bird.size.length.units;
    lenName.setAttribute('class', 'right');
    grid.appendChild(lenName);//add length info to grid

    //weight
    let weiBold = document.createElement('p');
    weiBold.setAttribute('class', 'bold');
    weiBold.textContent = 'Weight';
    grid.appendChild(weiBold);
    let weiName = document.createElement('p');
    weiName.textContent = bird.size.weight.value + ' ' + bird.size.weight.units;
    weiName.setAttribute('class', 'right');
    grid.appendChild(weiName);//add weight info to grid

    bottomInfo.appendChild(grid);// add grid to bottom info div


    let creditsDiv = document.createElement('div');
    let credits = document.createElement('p');
    creditsDiv.setAttribute('class', 'credits');
    credits.textContent = 'Photo by ' + bird.photo.credit;
    creditsDiv.appendChild(credits);
    bottomInfo.appendChild(creditsDiv);//add photo credits to bottom info

    card.appendChild(bottomInfo);//add bottom info div to card

    //for loop to handle changing colours based on conservation status
    for (let i = 0; i < colours.length; i++) {
        let status = bird.status;
        let status2 = colours[i][0];

        if (status === status2) {
            let col = colours[i][1];
            cardArea.style.backgroundColor = col;
            card.style.borderColor = col;
            photo.style.borderColor = col;
            nameBackground.style.backgroundColor = "rgba(1, 1, 1, 0.7)";
            nameBackground.style.borderTopColor = col;
            
            
        }
    }

    //add bird card to border card
    cardArea.appendChild(card);
    //add bird card to main
    main.appendChild(cardArea);
}

/*
    function to sort birds in an array based on conservation status 
    from common to extinct.
    starts with an array of all not threated birds.
    each increasing status gets concat onto the array.
    uses the status from the 'colours' array to compare
*/
function com2Ext(array) {

    let one = array.filter(d => d.status == colours[0][0]);
    for (let i = 1; i < colours.length; i++) {
        one = one.concat(array.filter(d => d.status == colours[i][0]));
    }
    return one;
}

//array to hold currently liked birds
let likes = new Array();
/*
    function for when the heart button is clicked
    if heart is red (already liked), it will make the 
    heart white and call 'removeBird' to remove the 
    bird from the likes array.
    if the heart is white, it will make the heart red and 
    then add the bird to the likes array.
*/
function likeBird(name){
    
    let heart = document.getElementById(name + 'Heart');
    if(heart.textContent == '❤️'){//then unlike it
        heart.textContent = '🤍';
        removeBird(name);
    }else{//like it
        likes = likes.concat(jsonData.filter(d => d.scientific_name == name));
        redHearts(likes);
    }
}

/*
    function to remove a liked bird from the array
*/
function removeBird(name){
    
    for(let i = 0; i < likes.length; i++){
        if(likes[i].scientific_name == name) likes.splice(i,1);
    }
}

/*
    function to make all liked birds have red hearts
*/
function redHearts(arr){
    for(let l = 0; l < likes.length; l++){
        let heart = document.getElementById(likes[l].scientific_name + 'Heart');
        if(heart)heart.textContent = '❤️'; //works 
    }
    
}

// add event listener to likes button in topbar
let likePg = document.getElementById('likes');
likePg.addEventListener('click', likePage);
/*
    function to show all the currently liked birds
*/
function likePage(){
    printing(likes);
}

//date area in topbar
let date = document.getElementById('today');
let today = new Date();
//+1 to the month as the months are from 0-11
let dayString = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
date.textContent = dayString;































