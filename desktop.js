//birds json file
const birdFile = "data/nzbird.json";

let jsonData;

//console.log('hi?');
//tests();
getJSON();


async function tests() {

    let card = document.createElement('div');
    card.setAttribute('class', 'birdCard');
    //console.log('reach');

    let card2 = document.getElementById('bird1');
    let string = card2.textContent;
    //console.log(string); //works
    card2.textContent = "changes text content"; //works

    let parent = document.getElementById('bird1');
    let child = document.createElement('p');
    child.textContent = "new text - add child to parent";
    parent.append(child); //works


}


//to read JSON file and put into an array?
async function getJSON() {
    //console.log('starting to get JSON');
    let response = await fetch(birdFile);
    let data = await response.text();
    jsonData = JSON.parse(data);
    //console.log(jsonData[0].primary_name);//WORKS
    //console.log(jsonData.length);//68

    //firstBirdCard(0);
    for (let i = 0; i < jsonData.length; i++) {
        //birdCards(i);
        printCards(jsonData, i);
        //console.log(i);
    }


}


//work on search feature
async function searchButton() {

}

function searchNames(searchArray, input) {
    let contains = new Array();
    let find = input.normalize("NFC");
    // console.log('search length: ' + searchArray.length);
    for (let i = 0; i < searchArray.length; i++) {
        let bird = searchArray[i];
        let names = '';
        names = names.concat(bird.primary_name.toLowerCase() + ' ' + bird.english_name.toLowerCase() + ' ' + bird.scientific_name.toLowerCase() + ' ' + bird.order.toLowerCase() + ' ' + bird.family.toLowerCase());
        for (let y = 0; y < bird.other_names.length; y++) {
            names = names.concat(' ' + bird.other_names[y].toLowerCase());
        }

        if (bird.primary_name == "Kak\u012b") {
            console.log(names);
            console.log('input: ' + input);
            let n = names.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
            let p = input.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
            console.log(n);
            console.log(p);
            console.log(n.includes(p));

        }
        let n = names.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
        let p = input.normalize("NFD").replace(/[\u0300-\u036f]/g, '');


        if (n.includes(p)) {
            console.log(bird.name);
            contains[contains.length] = bird;

        }
    }
    //console.log('returns length: ' + contains.length);
    return contains;
}

//filter button
//class = 'search-button'
function searchEvent(eventData) {
    //console.log('filter button pressed');
    let s = document.getElementById('SB-button');
    let c = document.getElementById('CS-button');
    //console.log(s.value + ', ' + c.value);
    // reloadBirds(c, s);
    let data = new Array();
    let dataCount = 0;

    let search = document.getElementById('searchbar');
    //console.log('searching: ' + search.value.toLowerCase());//works
    let searchFor = search.value.toLowerCase();
    search.textContent = "";
    if (searchFor == "") {
        console.log('nothing to search');
        data = Array.from(jsonData);
    } else {
        console.log('searching: ' + searchFor);
        data = searchNames(Array.from(jsonData), searchFor);
        //console.log('data length: ' + data.length);
    }


    //so the status before the sort by to first remove all the birds we dont want
    if (c.value === "All") {
        //data = Array.from(jsonData);

    } else if (c.value == c.value) {
        for (let i = 0; i < data.length; i++) {
            //console.log(jsonData[i].status.value);
            if (data[i].status == c.value) {
                //console.log('not threatened');
                data[dataCount] = data[i];
                dataCount++;
            }
        }
    }

    //console.log(data.length);
    //reloadBirds();

    if (s.value === "Lightest to Heaviest") {
        //data = jsonData;
        printing(data);
        data.sort(function (a, b) { return a.size.weight.value - b.size.weight.value });
        printing(data);
    } else if (s.value === "Heaviest to Lightest") {
        //data = jsonData;
        data.sort(function (a, b) { return b.size.weight.value - a.size.weight.value });
        printing(data);
    } else if (s.value === "Common to Extinct") {

        let dataCopy = Array.from(data);
        let data2 = ext2Com(dataCopy);


        printing(data2);
    } else if (s.value == "Extinct to Common") {//if s.value = "Common to Extinct"
        let dataCopy = Array.from(data);
        let data2 = ext2Com(dataCopy).reverse();
        printing(data2);

    } else if (s.value == "Shortest to Tallest") {
        data.sort(function (a, b) { return a.size.length.value - b.size.length.value });
        printing(data);
    } else {//s.value == "Tallest to Shortest"
        
        data.sort(function (a, b) { return b.size.length.value - a.size.length.value });
        printing(data);
    }

    function comm2Exti(value, index, array) {
        sortedData[sortedData.length] = value;
    }





    function printing(arr) {
        //print whatever meets criteria
        reloadBirds();
        for (let i = 0; i < arr.length; i++) {
            printCards(arr, i);
        }

        let found = document.getElementById('searchNumber');
        let num = arr.length;
        found.textContent = num + ' results found.';
    }


}
let button = document.querySelector("#search-button");
//console.log(button.textContent);
if (button) {
    button.addEventListener('click', searchEvent);
}



function reloadBirds() {
    let main = document.getElementById('myMain');
    main.innerHTML = '';


}

function printCards(array, count) {
    let main = document.getElementById('myMain');
    let card = document.createElement('div');
    let cardArea = document.createElement('div');
    cardArea.setAttribute('class', 'cardBorder');

    card.setAttribute('class', 'birdCard');

    const colours = [['Not Threatened', '#02a028'], ['Naturally Uncommon', '#649a31'],
    ['Relict', '#99cb68'], ['Recovering', '#fecc33'], ['Declining', '#fe9a01'],
    ['Nationally Increasing', '#c26967'], ['Nationally Vulnerable', '#9b0000'],
    ['Nationally Endangered', '#660032'], ['Nationally Critical', '#320033'],
    ['Extinct', '#000000'], ['Data Deficient', '#000000']];

    //let data = jsonData;
    //let data = array;
    //let bird = jsonData[count];
    let bird = array[count];
    //photo
    let photo = document.createElement('img'); //create img
    photo.setAttribute('class', 'birdPhoto');

    photo.src = bird.photo.source;
    //console.log(photo.src); 
    card.appendChild(photo);//works


    //information
    let maori = array[count].primary_name;
    let topInfo = document.createElement('div');
    topInfo.setAttribute('class', 'topInfo');
    let title = document.createElement('h2');
    title.textContent = maori;
    //console.log(title);
    topInfo.appendChild(title);





    card.appendChild(topInfo);//worked

    //bottom info
    let bottomInfo = document.createElement('div');
    bottomInfo.setAttribute('class', 'bottomInfo');
    let name = bird.english_name;
    let engName = document.createElement('h2');
    engName.textContent = name; // could i make it = bird.english_name; ???
    bottomInfo.appendChild(engName);
    let divide = document.createElement('hr');
    divide.setAttribute('class', 'cardHR');
    bottomInfo.appendChild(divide);




    //grid of other info

    //scientific name
    let grid = document.createElement('div');
    grid.setAttribute('class', 'gridInfo');
    let sciBold = document.createElement('p');
    sciBold.setAttribute('id', 'bold');
    sciBold.textContent = 'Scientific name';
    grid.appendChild(sciBold);
    let sciName = document.createElement('p');
    sciName.textContent = bird.scientific_name;
    sciName.setAttribute('id', 'right');
    grid.appendChild(sciName);

    //family
    let famBold = document.createElement('p');
    famBold.setAttribute('id', 'bold');
    famBold.textContent = 'Family';
    grid.appendChild(famBold);
    let famName = document.createElement('p');
    famName.textContent = bird.family;
    famName.setAttribute('id', 'right');
    grid.appendChild(famName);


    //order
    let ordBold = document.createElement('p');
    ordBold.setAttribute('id', 'bold');
    ordBold.textContent = 'Order';
    grid.appendChild(ordBold);
    let ordName = document.createElement('p');
    ordName.textContent = bird.order;
    ordName.setAttribute('id', 'right');
    grid.appendChild(ordName);


    //status
    let staBold = document.createElement('p');
    staBold.setAttribute('id', 'bold');
    staBold.textContent = 'Status';
    grid.appendChild(staBold);
    let staName = document.createElement('p');
    staName.textContent = bird.status;
    staName.setAttribute('id', 'right');
    grid.appendChild(staName);


    //length
    let lenBold = document.createElement('p');
    lenBold.setAttribute('id', 'bold');
    lenBold.textContent = 'Length';
    grid.appendChild(lenBold);
    let lenName = document.createElement('p');
    lenName.textContent = bird.size.length.value + ' ' + bird.size.length.units;
    lenName.setAttribute('id', 'right');
    grid.appendChild(lenName);

    //weight
    let weiBold = document.createElement('p');
    weiBold.setAttribute('id', 'bold');
    weiBold.textContent = 'Weight';
    grid.appendChild(weiBold);
    let weiName = document.createElement('p');
    weiName.textContent = bird.size.weight.value + ' ' + bird.size.weight.units;
    weiName.setAttribute('id', 'right');
    grid.appendChild(weiName);


    bottomInfo.appendChild(grid);
    card.appendChild(bottomInfo);

    let creditsDiv = document.createElement('div');
    let credits = document.createElement('p');
    creditsDiv.setAttribute('class', 'credits');
    credits.textContent = 'Photo by ' + bird.photo.credit;
    creditsDiv.appendChild(credits);
    bottomInfo.appendChild(creditsDiv);
    //need to add coloured circle

    //border for circle

    let border = document.createElement('span');
    border.setAttribute('class', 'circleBorder');
    card.appendChild(border);

    //think its a span i need to add with alil border?
    let circle = document.createElement('span');
    circle.setAttribute('class', 'circle');
    //circle.setAttribute('id', 'circleColour');


    for (let i = 0; i < colours.length; i++) {
        let status = bird.status;
        let status2 = colours[i][0];
        //let result = (status).localCompare(status2);
        if (status === status2) {
            //circle.setAttribute('background-colour', colours[i][1]);
            //let c = document.getElementById('circle');
            let col = colours[i][1];
            circle.style.backgroundColor = col;
            cardArea.style.backgroundColor = col;
            card.style.borderColor = col;
            photo.style.borderColor = col;
            //console.log(col);
        }
    }
    // card.appendChild(circle);
    cardArea.appendChild(card);

    main.appendChild(cardArea);




}


function ext2Com(array) {


    let one = array.filter(d => d.status == 'Not Threatened');
    let two = one.concat(array.filter(d => d.status == 'Naturally Uncommon'));
    let three = two.concat(array.filter(d => d.status == 'Relict'));
    let four = three.concat(array.filter(d => d.status == 'Recovering'));
    let five = four.concat(array.filter(d => d.status == 'Declining'));
    let six = five.concat(array.filter(d => d.status == 'Nationally Increasing'));
    let seven = six.concat(array.filter(d => d.status == 'Nationally Vulnerable'));
    let eight = seven.concat(array.filter(d => d.status == 'Nationally Endangered'));
    let nine = eight.concat(array.filter(d => d.status == 'Nationally Critical'));
    let ten = nine.concat(array.filter(d => d.status == 'Extinct'));
    let eleven = ten.concat(array.filter(d => d.status == 'Data Deficient'));

    //let data = Array.from(eleven);
    //console.log(one.length);


    return eleven;
}

let date = document.getElementById('today');
let today = new Date();
//console.log(today);
let dayString = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
if (date) {
    date.textContent = dayString;
}


let display = navigator.userAgent;
console.log(display);





