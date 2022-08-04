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
        birdCards(i);
        //console.log(i);
    }


}

//function to make bird cards
async function birdCards(count) {

    let main = document.getElementById('myMain');
    let card = document.createElement('div');
    card.setAttribute('class', 'birdCard');

    const colours = [['Not Threated', '#02a028'], ['Naturally Uncommon', '#649a31'],
    ['Relict', '#99cb68'], ['Recovering', '#fecc33'], ['Declining', 'f#e9a01'],
    ['Nationally Increasing', '#c26967'], ['Nationally Vulnerable', '#9b0000'],
    ['Nationally Endangered', '#660032'], ['Nationally Critical', '#320033'],
    ['Extinct', 'black'], ['Data deficient', 'black']];

    let data = jsonData;
    let bird = jsonData[count];
    //photo
    let photo = document.createElement('img'); //create img
    photo.setAttribute('class', 'birdPhoto');

    photo.src = bird.photo.source;
    //console.log(photo.src); 
    card.appendChild(photo);//works


    //information
    let maori = jsonData[count].primary_name;
    let topInfo = document.createElement('div');
    topInfo.setAttribute('class', 'topInfo');
    let title = document.createElement('h2');
    title.textContent = maori;
    //console.log(title);
    topInfo.appendChild(title);

    let credits = document.createElement('p');
    credits.textContent = 'Photo by ' + bird.photo.credit;
    topInfo.appendChild(credits);

    card.appendChild(topInfo);//worked

    //bottom info
    let bottomInfo = document.createElement('div');
    bottomInfo.setAttribute('class', 'bottomInfo');
    let name = bird.english_name;
    let engName = document.createElement('h2');
    engName.textContent = name; // could i make it = bird.english_name; ???
    bottomInfo.appendChild(engName);

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
    grid.appendChild(sciName);

    //family
    let famBold = document.createElement('p');
    famBold.setAttribute('id', 'bold');
    famBold.textContent = 'Family';
    grid.appendChild(famBold);
    let famName = document.createElement('p');
    famName.textContent = bird.family;
    grid.appendChild(famName);


    //order
    let ordBold = document.createElement('p');
    ordBold.setAttribute('id', 'bold');
    ordBold.textContent = 'Order';
    grid.appendChild(ordBold);
    let ordName = document.createElement('p');
    ordName.textContent = bird.order;
    grid.appendChild(ordName);


    //status
    let staBold = document.createElement('p');
    staBold.setAttribute('id', 'bold');
    staBold.textContent = 'Status';
    grid.appendChild(staBold);
    let staName = document.createElement('p');
    staName.textContent = bird.status;
    grid.appendChild(staName);


    //length
    let lenBold = document.createElement('p');
    lenBold.setAttribute('id', 'bold');
    lenBold.textContent = 'Length';
    grid.appendChild(lenBold);
    let lenName = document.createElement('p');
    lenName.textContent = bird.size.length.value + ' ' + bird.size.length.units;
    grid.appendChild(lenName);

    //weight
    let weiBold = document.createElement('p');
    weiBold.setAttribute('id', 'bold');
    weiBold.textContent = 'Weight';
    grid.appendChild(weiBold);
    let weiName = document.createElement('p');
    weiName.textContent = bird.size.weight.value + ' ' + bird.size.weight.units;
    grid.appendChild(weiName);


    bottomInfo.appendChild(grid);
    card.appendChild(bottomInfo);



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
            //console.log(col);
        }
    }
    card.appendChild(circle);

    main.appendChild(card);

}

//can prob delete now
async function firstBirdCard(count) {

    const colours = [['Not Threated', '#02a028'], ['Naturally Uncommon', '#649a31'],
    ['Relict', '#99cb68'], ['Recovering', '#fecc33'], ['Declining', 'f#e9a01'],
    ['Nationally Increasing', '#c26967'], ['Nationally Vulnerable', '#9b0000'],
    ['Nationally Endangered', '#660032'], ['Nationally Critical', '#320033'],
    ['Extinct', 'black'], ['Data deficient', 'black']];

    let data = jsonData;
    let bird = jsonData[count];
    //photo
    let photo = document.createElement('img'); //create img
    photo.setAttribute('class', 'birdPhoto');

    //let card = document.createElement('div');
    //card.setAttribute('id', 'bird1');
    let card = document.getElementById('bird1');
    //let main = document.getElementsByClassName('main');
    //main.appendChild(card);

    photo.src = bird.photo.source;
    console.log(photo.src);
    card.appendChild(photo);//works


    //information
    let maori = jsonData[count].primary_name;
    let topInfo = document.createElement('div');
    topInfo.setAttribute('class', 'topInfo');
    let title = document.createElement('h2');
    title.textContent = maori;
    console.log(title);
    topInfo.appendChild(title);

    let credits = document.createElement('p');
    credits.textContent = 'Photo by ' + bird.photo.credit;
    topInfo.appendChild(credits);

    card.appendChild(topInfo);//worked

    //bottom info
    let bottomInfo = document.createElement('div');
    bottomInfo.setAttribute('class', 'bottomInfo');
    let name = bird.english_name;
    let engName = document.createElement('h2');
    engName.textContent = name; // could i make it = bird.english_name; ???
    bottomInfo.appendChild(engName);

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
    grid.appendChild(sciName);

    //family
    let famBold = document.createElement('p');
    famBold.setAttribute('id', 'bold');
    famBold.textContent = 'Family';
    grid.appendChild(famBold);
    let famName = document.createElement('p');
    famName.textContent = bird.family;
    grid.appendChild(famName);


    //order
    let ordBold = document.createElement('p');
    ordBold.setAttribute('id', 'bold');
    ordBold.textContent = 'Order';
    grid.appendChild(ordBold);
    let ordName = document.createElement('p');
    ordName.textContent = bird.order;
    grid.appendChild(ordName);


    //status
    let staBold = document.createElement('p');
    staBold.setAttribute('id', 'bold');
    staBold.textContent = 'Status';
    grid.appendChild(staBold);
    let staName = document.createElement('p');
    staName.textContent = bird.status;
    grid.appendChild(staName);


    //length
    let lenBold = document.createElement('p');
    lenBold.setAttribute('id', 'bold');
    lenBold.textContent = 'Length';
    grid.appendChild(lenBold);
    let lenName = document.createElement('p');
    lenName.textContent = bird.size.length.value + ' ' + bird.size.length.units;
    grid.appendChild(lenName);

    //weight
    let weiBold = document.createElement('p');
    weiBold.setAttribute('id', 'bold');
    weiBold.textContent = 'Weight';
    grid.appendChild(weiBold);
    let weiName = document.createElement('p');
    weiName.textContent = bird.size.weight.value + ' ' + bird.size.weight.units;
    grid.appendChild(weiName);


    bottomInfo.appendChild(grid);
    card.appendChild(bottomInfo);



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
            console.log(col);
        }
    }
    card.appendChild(circle);

}


//work on search feature
async function searchButton() {

}

//work on status sort
async function statusSort() {
    const status = document.getElementById('CS-button');

    status.addEventListener('change', function statusListen(event) {
        console.log(event.target.value);//print string of whatever one you pick

    });
}

//work on sort by
async function sortByListener() {
    const sort = document.getElementById('SB-button');

    sort.addEventListener('change', function sortListen(event) {
        console.log(event.target.value);//print string of whatever one you pick

    });
}



sortByListener();
statusSort();


//filter button
//class = 'search-button'
function searchEvent(eventData) {
    console.log('filter button pressed');
    let s = document.getElementById('SB-button');
    let c = document.getElementById('CS-button');
    console.log(s.value + ', ' + c.value);
    reloadBirds(c, s);
    let data = new Array();
    let dataCount =0;

    //so the status before the sort by to first remove all the birds we dont want
    if(c.value ==="All"){
        data = jsonData;
    }else if(c.value === "Not Threatened"){
        
        for(let i = 0; i < jsonData.length ; i++){
            console.log(jsonData[i].status.value);
            if(jsonData[i].status.value == "Not Threatened"){
                console.log('not threatened');
                data[dataCount] = jsonData[i];
                dataCount++;
            }
        }
    }

    console.log(data.length);

    if(s.value === "Lightest to Heaviest"){
        //data = jsonData;
        
        data.sort(function(a, b){return a.size.weight.value -b.size.weight.value});
        
    }else if(s.value === "Heaviest to Lightest"){
        //data = jsonData;
        data.sort(function(a, b){return b.size.weight.value -a.size.weight.value});
       
    }


    //print whatever meets criteria
    for(let i = 0; i < data.length;i++){
        printCards(data, i);
    }


}
let button = document.querySelector("#search-button");
//console.log(button.textContent);
button.addEventListener('click', searchEvent);


function reloadBirds(status, sort) {
    let main = document.getElementById('myMain');
    main.innerHTML = '';
    

}

function printCards(array, count){
    let main = document.getElementById('myMain');
    let card = document.createElement('div');
    card.setAttribute('class', 'birdCard');

    const colours = [['Not Threated', '#02a028'], ['Naturally Uncommon', '#649a31'],
    ['Relict', '#99cb68'], ['Recovering', '#fecc33'], ['Declining', 'f#e9a01'],
    ['Nationally Increasing', '#c26967'], ['Nationally Vulnerable', '#9b0000'],
    ['Nationally Endangered', '#660032'], ['Nationally Critical', '#320033'],
    ['Extinct', 'black'], ['Data deficient', 'black']];

    //let data = jsonData;
    let data = array;
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

    let credits = document.createElement('p');
    credits.textContent = 'Photo by ' + bird.photo.credit;
    topInfo.appendChild(credits);

    card.appendChild(topInfo);//worked

    //bottom info
    let bottomInfo = document.createElement('div');
    bottomInfo.setAttribute('class', 'bottomInfo');
    let name = bird.english_name;
    let engName = document.createElement('h2');
    engName.textContent = name; // could i make it = bird.english_name; ???
    bottomInfo.appendChild(engName);

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
    grid.appendChild(sciName);

    //family
    let famBold = document.createElement('p');
    famBold.setAttribute('id', 'bold');
    famBold.textContent = 'Family';
    grid.appendChild(famBold);
    let famName = document.createElement('p');
    famName.textContent = bird.family;
    grid.appendChild(famName);


    //order
    let ordBold = document.createElement('p');
    ordBold.setAttribute('id', 'bold');
    ordBold.textContent = 'Order';
    grid.appendChild(ordBold);
    let ordName = document.createElement('p');
    ordName.textContent = bird.order;
    grid.appendChild(ordName);


    //status
    let staBold = document.createElement('p');
    staBold.setAttribute('id', 'bold');
    staBold.textContent = 'Status';
    grid.appendChild(staBold);
    let staName = document.createElement('p');
    staName.textContent = bird.status;
    grid.appendChild(staName);


    //length
    let lenBold = document.createElement('p');
    lenBold.setAttribute('id', 'bold');
    lenBold.textContent = 'Length';
    grid.appendChild(lenBold);
    let lenName = document.createElement('p');
    lenName.textContent = bird.size.length.value + ' ' + bird.size.length.units;
    grid.appendChild(lenName);

    //weight
    let weiBold = document.createElement('p');
    weiBold.setAttribute('id', 'bold');
    weiBold.textContent = 'Weight';
    grid.appendChild(weiBold);
    let weiName = document.createElement('p');
    weiName.textContent = bird.size.weight.value + ' ' + bird.size.weight.units;
    grid.appendChild(weiName);


    bottomInfo.appendChild(grid);
    card.appendChild(bottomInfo);



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
            //console.log(col);
        }
    }
    card.appendChild(circle);

    main.appendChild(card);


}
