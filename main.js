/**
 * Created by idyescien21 on 4/11/2018.
 */

;(function(global){
    var AddressBook = function(name,phone,email,address){
        return new AddressBook.init(name,phone,email,address);
    };

    AddressBook.prototype = {
        data:[ //information
        ],
        searchResults:[

        ],
        addNewContact:function(name,phone,email,address){
            this.data.push({
                name: name,
                phone: phone,
                email:email,
                address: address
            });
            return this;
        },
        returnAll:function(){
            return this.data;
        },
        search:function(searchTerm){
            if(this.data.length){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].name.toLowerCase() == searchTerm.toLowerCase()){
                        console.error(this.data[i]);
                        this.searchResults.push(this.data[i]);
                    }
                }

                return this.searchResults;
            }else{
                console.log("There are no results");
            }
            return this;
        }};

    AddressBook.init=function(name,phone,email,address){
        var self = this;
        //set up the address book
        if(name || phone || email || address){
            self.addNewContact(name || "", phone||"", email||"", address||"");
        }

    };

    AddressBook.init.prototype = AddressBook.prototype;

    global.AddressBook = $ab = AddressBook;
})(window);

if(!window.contactList){ //check if we already have a contact list
    window.contactList= $ab();
}

var form  = document.getElementById('contact');
form.addEventListener('submit', function(){
    if (window.contactList) contactList.addNewContact(form.person.value, form.phone.value, form.email.value, form.address.value); else { //check if we already have a contact list
        window.contactList = $ab(form.person.value, form.phone.value, form.email.value, form.address.value);
    }

    form.person.value = '';
    form.phone.value = '';
    form.email.value = '';
    form.address.value = '';

    event.preventDefault();
});

var searchForm = document.getElementById('search');
searchForm.addEventListener('submit', function(){
    var results;
    if(results !== undefined){
        results = null;
    }
    if (window.contactList) {
        results = contactList.search(searchForm.search.value);
    } else {
        window.contactList = $ab();
    }
    document.getElementById('results').innerHTML = '';
    if(results.length>0){

        for(var i = 0;i<results.length;i++){
            document.getElementById('results').innerHTML += '<div class="contact-item">Name:'+results[i].name+'<br>Phone:'+results[i].phone+'<br>Email:'+results[i].email+'<br>Address: '+results[i].address+'</div><hr>';
        }
    } else{
        document.getElementById('results').innerHTML += '<div class="contact-item">There are no results for this Search key</div><hr>';
    }

    //do something with the results
    event.preventDefault();
});

document.getElementById('js-show-all').addEventListener('click', function(){
    if(window.contactList){ //check if we already have a contact list
        document.getElementById('show-panel').innerHTML = '';
        var contacts = contactList.returnAll();
        console.log(contacts);
        if(contacts.length>0){
            for(var i = 0;i<contacts.length;i++){
                document.getElementById('show-panel').innerHTML += '<div class="contact-item">Name:'+contacts[i].name+'<br>Phone:'+contacts[i].phone+'<br>Email:'+contacts[i].email+'<br>Address:'+contacts[i].address+'</div><hr>';
            }
        }else{
            document.getElementById('show-panel').innerHTML += '<div class="contact-item">You have no contacts. Why not add  a few?</div><hr>';
        }
    }
    document.getElementById('show-panel').style.display = 'block';

    document.getElementById('search-panel').style.display = 'none';
    document.getElementById('contact-panel').style.display = 'none';
});

document.getElementById('js-search').addEventListener('click', function(){
    document.getElementById('show-panel').style.display = 'none';
    document.getElementById('search-panel').style.display = 'block';
    document.getElementById('contact-panel').style.display = 'none';
});

document.getElementById('js-add-new').addEventListener('click', function(){
    document.getElementById('show-panel').style.display = 'none';
    document.getElementById('search-panel').style.display = 'none';
    document.getElementById('contact-panel').style.display = 'block';
});

