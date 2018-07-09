//generic find
function find(url, callback) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json"
        ,
        success: function (data) {
            console.log('ok');
            callback(data);
        }
    });
}

//fetch users
function findUsers() {
    
    let url = 'https://jsonplaceholder.typicode.com/users';

    callback = (data) => {
        console.log(data);
        data.forEach( user => {

            console.log(user.name);
            
        });
    }

    find(url,callback);

}

function createCard(user){
    
    let card = $('<div></div>').append($('<p></p>').text('DioPorco'));
}

findUsers();