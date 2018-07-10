const newBtnWithId = (id) => $('<button></button>').attr('id', id);
const newLabelWithFor = (forLabel) => $('<label></label>').attr('for', forLabel);
const sectionWithTitle = (title) => $('<section></section>').append('<h1></h1>').text(title);
const paraWithText = (text) => $('<p></p>').text(text);
const newDivWithClass = (divClass) => $('<div></div>').attr('class', divClass);
const newDivWithClassAndId = (divClass, divId) =>  newDivWithClass(divClass).attr('id', divId);

//generic find
function find(url, callback) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: (data) => callback(data),
        failed: console.log('ERROR')
    });
}

//fetch users
function findUsers() {
    
    let url = 'https://jsonplaceholder.typicode.com/users';

    callback = (data) => {
        console.log(data);
        data.forEach( (user) => {
            createCard(user, '.usersContent');
            console.log(data);
        });
    }

    find(url,callback);

}

function insertBtns(whereAppend){

    let btnView = newBtnWithId('view').append(newLabelWithFor('view'));
    let btnModify = newBtnWithId('modify').append(newLabelWithFor('modify'));
    let btnDelete = newBtnWithId('delete').append(newLabelWithFor('delete'));

    $(whereAppend).append(newDivWithClass('btns').append(btnView, btnModify, btnDelete));

};

function createCard(user, whereAppend){
    
    let divCard = newDivWithClassAndId('card', `card${user.id}`);
    let section = sectionWithTitle(user.name);
    let imgCard = $('<img></img>').attr('src', `img/card${user.id}.png`);
    let parCard = paraWithText(user.email);

    section.append(imgCard, parCard);
    divCard.append(section);
    $(whereAppend).append(divCard);

    insertBtns(`#card${user.id}`);

}

findUsers();
