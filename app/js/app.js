const newBtnWithClass = (btnClass) => $('<button></button>').addClass(btnClass);
const newBtnWithClassAndUserData = (btnClass, dataUserId) => newBtnWithClass(btnClass).attr('data-user-id', dataUserId);

const newLabelWithFor = (forLabel) => $('<label></label>').attr('for', forLabel);

const newSectionWithTitle = (title, dataUserId) => $('<section></section>').append($('<h1></h1>').attr('data-user-id', dataUserId).text(title));
const newSectionWithTitleAndUserData = (title, dataUserId) => newSectionWithTitle(title, dataUserId).attr('data-buttons-id', dataUserId);

const newParaWithText = (text) => $('<p></p>').text(text);
const newParaWithTextAndClass = (text, paraClass) => newParaWithText(text).addClass(paraClass);

const newDivWithClass = (divClass) => $('<div></div>').attr('class', divClass);
const newDivWithClassAndId = (divClass, divId) =>  newDivWithClass(divClass).attr('id', divId);

//hendler error
const handleError = (xhr, status, error) => console.log(`ERROR!!\nStatus: ${status}\nMessage error:${error}`);

function userData(ev){

    let id = $(ev.target).attr('data-user-id');

    findPostsOfSpecificUser(id);
    findAlbumsOfSpecificUser(id);
    findTodosOfSpecificUser(id);

}

const addPost = post => newSectionWithTitle(post.title).append($('<p></p>').text(post.body));
const addAlbum = post => newSectionWithTitle(post.title).append($('<p></p>').text(post.body));
const addTodo = todo => (todo.completed) ? newParaWithText(todo.title).css('color', 'greenyellow') : newParaWithText(todo.title).css('color', 'lightcoral');

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

    insertBtns(user.id,`*[data-buttons-id="${user.id}"]`);

}

//fetch posts from specific user id
function findPostsOfSpecificUser(id) {
    
    let url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

    callback = posts => createPosts(posts, '#postsHere');
    
    find(url,callback);

}

//fetch albums from specific user id
function findAlbumsOfSpecificUser(id){

    let url = `https://jsonplaceholder.typicode.com/albums?userId=${id}`;

    callback = albums => createAlbums(albums, '#albumsHere');
    
    find(url,callback);

}

//fetch todos from specific user id
function findTodosOfSpecificUser(id){
    
    let url = `https://jsonplaceholder.typicode.com/todos?userId=${id}`;

    callback = todos => createTodos(todos, '#todosHere');
    
    find(url,callback);

}



function createPosts(posts, whereAppend){

    $('#postInit').css('display', 'none');

    let divPosts = newDivWithClass('divPosts');

    posts.forEach( (post) => $(divPosts).append(addPost(post).attr('class', 'post')));

    $(whereAppend).html(divPosts);

}

function createAlbums(albums, whereAppend){

    $('#postInit').css('display', 'none');

    let divAlbum = newDivWithClass('divAlbums');

    albums.forEach( (album) => $(divAlbum).append(addAlbum(album).attr('class', 'album')));

    $(whereAppend).html(divAlbum);

}

function createTodos(todos, whereAppend){

    $('#postInit').css('display', 'none');

    let divTodo = newDivWithClass('divTodos');

    todos.forEach( (todo) => {
        $(divTodo).append(addTodo(todo).attr('class', 'todo'))
        console.log(todo.completed);
    });
    

    $(whereAppend).html(divTodo);

}

findUsers();

//eventListner on <h1> in '.card'
$('body').on( "click", '.card h1', userData);