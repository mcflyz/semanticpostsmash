const newBtnWithClass = (btnClass) => $('<button></button>').attr('class', btnClass);
const newBtnWithClassAndUserData = (btnClass, dataUserId) => newBtnWithClass(btnClass).attr('data-user-id', dataUserId);
const newLabelWithFor = (forLabel) => $('<label></label>').attr('for', forLabel);
const newSectionWithTitle = (title) => $('<section></section>').append('<h1></h1>').text(title);
const newSectionWithTitleAndUserData = (title, dataUserId) => newSectionWithTitle(title).attr('data-user-id', dataUserId);
const newParaWithText = (text) => $('<p></p>').text(text);
const newDivWithClass = (divClass) => $('<div></div>').attr('class', divClass);
const newDivWithClassAndId = (divClass, divId) =>  newDivWithClass(divClass).attr('id', divId);
//hendler error
const handleError = (xhr, status, error) => console.log(`ERROR!!\nStatus: ${status}\nMessage error:${error}`);

//for posts from specific id user => https://jsonplaceholder.typicode.com/posts?userId=${id};
//for todos from specific id user => https://jsonplaceholder.typicode.com/todos?userId=${id};
//for albums from specific id user => https://jsonplaceholder.typicode.com/albums?userId=${id};

//generic find
function find(url, callback) {
    
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: (data) => callback(data),
        error: handleError
    });

}

//fetch users
function findUsers() {
    
    let url = 'https://jsonplaceholder.typicode.com/users';

    callback = users => 
                    users.forEach( user => 
                         createCard(user, '.usersContent'));
    
    find(url,callback);

}

function insertBtns(id, whereAppend){

    let btnView = newBtnWithClassAndUserData('view', id).append(newLabelWithFor('view'));
    let btnModify = newBtnWithClassAndUserData('modify', id).append(newLabelWithFor('modify'));
    let btnDelete = newBtnWithClassAndUserData('delete', id).append(newLabelWithFor('delete'));

    $(whereAppend).append(newDivWithClass('btns').append(btnView, btnModify, btnDelete));

};

function createCard(user, whereAppend){
    
    let divCard = newDivWithClass('card');
    let section = newSectionWithTitleAndUserData(user.name, user.id);
    let imgCard = $('<img></img>').attr('src', `img/card${user.id}.png`);
    let parCard = newParaWithText(user.email);

    section.append(imgCard, parCard);
    divCard.append(section);
    $(whereAppend).append(divCard);

    insertBtns(user.id,`*[data-user-id="${user.id}"]`);

}

//fetch posts from specific user id
function findPostsOfSpecificUser(id) {
    
    let url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

    callback = (posts) => {
        console.log(posts);
        posts.forEach( (post) => {
            console.log(post);
            //insertPosts();
        });
    }

    find(url,callback);

}

findUsers();

//for(let i = 0; i<10; ++i) findPostsOfSpecificUser(i);
const notify = ev => findPostsOfSpecificUser($(ev.target).parent('button').attr('data-user-id'));

$('body').on( "click", '.btns button', notify);