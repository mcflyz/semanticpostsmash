const newBtnWithClass = (btnClass) => $('<button></button>').addClass(btnClass);
const newBtnWithClassAndUserData = (btnClass, dataUserId) => newBtnWithClass(btnClass).attr('data-user-id', dataUserId);

const newLabelWithFor = (forLabel) => $('<label></label>').attr('for', forLabel);

const newSectionWithTitle = (title, dataUserId) => $('<section></section>').append($('<h1></h1>').attr('data-user-id', dataUserId).text(title));
const newSectionWithTitleAndUserData = (title, dataUserId) => newSectionWithTitle(title, dataUserId).attr('data-buttons-id', dataUserId);

const newParaWithText = (text) => $('<p></p>').text(text);
const newParaWithTextAndClass = (text, paraClass) => newParaWithText(text).addClass(paraClass);

const newDivWithClass = (divClass) => $('<div></div>').attr('class', divClass);
const newDivWithClassAndId = (divClass, divId) => newDivWithClass(divClass).attr('id', divId);

const newLink = (href) => $('<a></a>').attr('href', href);

const addPost = post => newSectionWithTitle(post.title).append($('<p></p>').text(post.body));
const addAlbum = post => newSectionWithTitle(post.title).append($('<p></p>').text(post.body));
const addTodo = todo => (todo.completed) ? newParaWithText(todo.title).css('color', 'greenyellow') : newParaWithText(todo.title).css('color', 'lightcoral');

const modalView = (event) => findUserById($(event.target).parent('button').attr('data-user-id'));
const modalDelete = (event) => remove(`https://jsonplaceholder.typicode.com/users/${$(event.target).parent('button').attr('data-user-id')}`);

const getId = (event) => $(event.target).attr('data-user-id');

//hendler error
const handleError = (xhr, status, error) => console.log(`ERROR!!\nStatus: ${status}\nMessage error:${error}`);

function userData(ev) {

    let id = getId(ev);

    findPostsOfSpecificUser(id);
    findAlbumsOfSpecificUser(id);
    findTodosOfSpecificUser(id);

}

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

//delete user function
function remove(url) {
    $.ajax({
        type: "DELETE",
        url: url,
        success: function (data, textStatus, jqXHR) {
            console.log("remove successfully");
        },
        error: handleError
    });
}

//modify user 
function update(url, input) { 
    $.ajax({ 
        type: "PUT", 
        contentType: "application/json", 
        url: url, 
        dataType: "json", 
        data: input, 
        success: function (data, textStatus, jqXHR) { 
            console.log("update successfully"); 
        }, 
        error: handleError
    }); 
}

//fetch users
function findUsers() {

    let url = 'https://jsonplaceholder.typicode.com/users';

    callback = users =>
        users.forEach(user =>
            createCard(user, '.usersContent'));

    find(url, callback);

}

//fetch user
function findUserById(id, callback) {

    let url = `https://jsonplaceholder.typicode.com/users/${id}`;

    callback = user => showInfo(user, '#modalView');

    find(url, callback);

}

function insertBtns(id, whereAppend) {

    let btnView = newBtnWithClassAndUserData('view', id).append(newLabelWithFor('view'));
    let btnModify = newBtnWithClassAndUserData('modify', id).append(newLabelWithFor('modify'));
    let btnDelete = newBtnWithClassAndUserData('delete', id).append(newLabelWithFor('delete'));

    let linkView = newLink('#openModalView');
    let linkModify = newLink('#openModalModify');
    let linkDelete = newLink('#openModalDelete');

    linkView.append(btnView);
    linkModify.append(btnModify);
    linkDelete.append(btnDelete);

    $(whereAppend).append(newDivWithClass('btns').append(linkView, linkModify, linkDelete));

};

function createCard(user, whereAppend) {

    let divCard = newDivWithClass('card');
    let section = newSectionWithTitleAndUserData(user.name, user.id);
    let imgCard = $('<img></img>').attr('src', `img/card${user.id}.png`);
    let parCard = newParaWithText(user.email);

    section.append(imgCard, parCard);
    divCard.append(section);
    $(whereAppend).append(divCard);

    insertBtns(user.id, `*[data-buttons-id="${user.id}"]`);

}

//fetch posts from specific user id
function findPostsOfSpecificUser(id) {

    let url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

    callback = posts => createPosts(posts, '#postsHere');

    find(url, callback);

}

//fetch albums from specific user id
function findAlbumsOfSpecificUser(id) {

    let url = `https://jsonplaceholder.typicode.com/albums?userId=${id}`;

    callback = albums => createAlbums(albums, '#albumsHere');

    find(url, callback);

}

//fetch todos from specific user id
function findTodosOfSpecificUser(id) {

    let url = `https://jsonplaceholder.typicode.com/todos?userId=${id}`;

    callback = todos => createTodos(todos, '#todosHere');

    find(url, callback);

}

function createPosts(posts, whereAppend) {

    $('#postInit').css('display', 'none');

    let divPosts = newDivWithClass('divPosts');

    posts.forEach((post) => $(divPosts).append(addPost(post).attr('class', 'post')));

    $(whereAppend).html(divPosts);

}

function createAlbums(albums, whereAppend) {

    $('#albumInit').css('display', 'none');

    let divAlbum = newDivWithClass('divAlbums');

    albums.forEach((album) => $(divAlbum).append(addAlbum(album).attr('class', 'album')));

    $(whereAppend).html(divAlbum);

}

function createTodos(todos, whereAppend) {

    $('#todoInit').css('display', 'none');

    let divTodo = newDivWithClass('divTodos');

    todos.forEach((todo) => $(divTodo).append(addTodo(todo).attr('class', 'todo')));


    $(whereAppend).html(divTodo);

}

function showInfo(user, whereAppend) {

    let section = newSectionWithTitle(user.name);
    let address = "street: " + user.address.street + "suite: " + user.address.suite + " city: " + user.address.city;

    let username = newParaWithText(user.username);
    let email = newParaWithText(user.email);
    let addressP = newParaWithText(address);
    let phone = newParaWithText(user.phone);
    let website = newParaWithText(user.website);

    section.append(username, email, addressP, phone, website);

    $(whereAppend).html(section);

}

//start fetching info
findUsers();

//eventListner on <h1> in '.card'
$('body').on("click", '.card h1', userData);

//eventListner on view button in '.btns'
$('body').on("click", '.btns .view', modalView);

//eventListner on modify button in '.btns'
$('body').on("click", '.btns .modify', modalModify);

//eventListner on delete button in '.btns'
$('body').on("click", '.btns .delete', modalDelete);