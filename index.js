//birds json file
const birdFile = "data/nzbird.json";

let jsonData;

console.log('hi?');
//tests();
getJSON();


async function tests(){

    let card = document.createElement('div');
    card.setAttribute('class', 'birdCard');
    console.log('reach');
    
    let card2 = document.getElementById('bird1');
    let string = card2.textContent;
    console.log(string); //works
    card2.textContent = "changes text content"; //works

    let parent = document.getElementById('bird1');
    let child = document.createElement('p');
    child.textContent = "new text - add child to parent";
    parent.append(child); //works


}


//to read JSON file and put into an array?
async function getJSON() {
    console.log('starting to get JSON');
    let response = await fetch(birdFile);
    let data = await response.text();
    jsonData = JSON.parse(data);
    console.log(jsonData[0].primary_name);//WORKS
    console.log(jsonData.length);//68

    birdCards(0);

}

//function to make bird cards
async function birdCards(count){

    let data = jsonData;
    let bird = jsonData[count];
    //photo
    let photo = document.createElement('img'); //create img
    photo.setAttribute('class', 'birdPhoto');
    let card = document.getElementById('bird1');
    
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
    credits.textContent = 'Photo by ' + bird.credit;
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

/*
    //length
    let sciBold = document.createElement('p');
    sciBold.setAttribute('id', 'bold');
    sciBold.textContent = 'Scientific name';
    grid.appendChild(sciBold);
    let sciName = document.createElement('p');
    sciName.textContent = bird.scientific_name;
    grid.appendChild(sciName);

    //weight
    let sciBold = document.createElement('p');
    sciBold.setAttribute('id', 'bold');
    sciBold.textContent = 'Scientific name';
    grid.appendChild(sciBold);
    let sciName = document.createElement('p');
    sciName.textContent = bird.scientific_name;
    grid.appendChild(sciName);
    */

    bottomInfo.appendChild(grid);
    card.appendChild(bottomInfo);

}