const xhttp = new XMLHttpRequest();
const path = "http://localhost:3000";
var count = 0; // keeps track of total # of quotes

// makes get request for getting all quotes
let getAll = function(){
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 200) {
		    console.log(this.responseText);
		    let arr = JSON.parse(this.responseText);
	    	console.log(arr);
            document.getElementById("main").innerHTML = ""; // clear out page

    		for(let i = 0; i < arr.length; i++) {
         		// console.log(arr[i])
                render(arr[i]);
     		}
    	}
    }
	
    xhttp.open("GET", path + "/quotes", true);
    xhttp.send();
}

// renders dom elements for each existing quote/author
let render = function(obj) {
    let qid = obj.QuoteID;
    let body = obj.Body;
    let author = obj.Author;

    // quote related elements
    let qdiv = document.createElement("div");
    let qtext = document.createElement("textarea");
    let qlabel = document.createElement("label");

    qdiv.id = "quote" + qid;
    
    qtext.id = "qtext" + qid;
    qtext.name = "quote" + qid;
    qtext.rows = 3;
    qtext.innerHTML = body;

    qlabel.htmlFor = "quote" + qid;
    qlabel.innerHTML = "Quote " + qid;

    // author related elements
    let adiv = document.createElement("div");
    let atext = document.createElement("textarea");
    let alabel = document.createElement("label");

    adiv.id = "author" + qid;

    atext.id = "atext" + qid;
    atext.name = "author" + qid;
    atext.rows = 3;
    atext.innerHTML = author;

    alabel.htmlFor = "author" + qid;
    alabel.innerHTML = "Author " + qid;

    let bdiv = document.createElement("div");
    bdiv.id = "bdiv" + qid;

    let updateBtn = document.createElement("button");
    updateBtn.innerHTML = "Update in DB";
    updateBtn.id = "update" + qid;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.id = "delete" + qid;

    // appending elements
    qdiv.appendChild(qlabel);
    qdiv.appendChild(qtext);
    adiv.appendChild(alabel);
    adiv.appendChild(atext);

    bdiv.appendChild(updateBtn);
    bdiv.appendChild(deleteBtn);
    updateBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        update(id);
    });

    deleteBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        remove(id);
    });

    document.getElementById("main").appendChild(qdiv);
    document.getElementById("main").appendChild(adiv);
    document.getElementById("main").appendChild(bdiv);
    count = qid;

}

// renders a blank quote/author textbox
let renderBlank = function(obj) {
    count++;

    // quote related elements
    let qdiv = document.createElement("div");
    let qtext = document.createElement("textarea");
    let qlabel = document.createElement("label");

    qdiv.id = "quote" + count;
    
    qtext.id = "qtext" + count;
    qtext.name = "quote" + count;
    qtext.rows = 3;

    qlabel.htmlFor = "quote" + count;
    qlabel.innerHTML = "Quote " + count;

    // author related elements
    let adiv = document.createElement("div");
    let atext = document.createElement("textarea");
    let alabel = document.createElement("label");

    adiv.id = "author" + count;

    atext.id = "atext" + count;
    atext.name = "author" + count;
    atext.rows = 3;

    alabel.htmlFor = "author" + count;
    alabel.innerHTML = "Author " + count;

    let bdiv = document.createElement("div");
    bdiv.id = "bdiv" + count;

    let saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save in DB";
    saveBtn.id = "save" + count;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.id = "delete" + count;

    // appending elements
    qdiv.appendChild(qlabel);
    qdiv.appendChild(qtext);
    adiv.appendChild(alabel);
    adiv.appendChild(atext);

    bdiv.appendChild(saveBtn);
    bdiv.appendChild(deleteBtn);
    saveBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        save(id);
    });

    deleteBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        removeBlank(id);
    });

    document.getElementById("main").appendChild(qdiv);
    document.getElementById("main").appendChild(adiv);
    document.getElementById("main").appendChild(bdiv);

}

function update(qid) {
    let qtext = document.getElementById("qtext" + qid);
    let atext = document.getElementById("atext" + qid);
    let quote = qtext.value;
    let author = atext.value;
    xhttp.open("PUT", path + "/quotes", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    console.log(quote);
    xhttp.send(JSON.stringify({"QuoteID": qid, "Quote": quote, "Author": author}));
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 201) {
	    	console.log("put success!");
		    console.log(this.responseText);
    	}
    }
}

function remove(qid) {
    xhttp.open("DELETE", path + "/quotes", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({"QuoteID": qid}));
    // xhttp.send(null);
    xhttp.onreadystatechange = function(){
    	if (this.readyState == 4 && this.status == 200) {
	    	console.log("delete success!");
	    	document.getElementById("quote"+qid).remove();
            document.getElementById("author"+qid).remove();
            document.getElementById("bdiv"+qid).remove();

    	}
    }
}

function removeBlank(qid) {
    let qdiv = document.getElementById("quote"+qid);
    let adiv = document.getElementById("author"+qid);
    let bdiv = document.getElementById("bdiv"+qid);
    qdiv.remove();
    adiv.remove();
    bdiv.remove();
    count--;
}

function save(qid) {
    let qtext = document.getElementById("qtext" + qid);
    let atext = document.getElementById("atext" + qid);
    let quote = qtext.value;
    let author = atext.value;
    xhttp.open("POST", path + "/quotes", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({"Quote": quote, "Author": author}));
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 201) {
	    	console.log("POST success!");
		    console.log(this.responseText);
    	}
    }

    let bdiv = document.getElementById("bdiv"+qid);
    
    document.getElementById("save"+qid).remove();
    let updateBtn = document.createElement("button");
    updateBtn.innerHTML = "Update in DB";
    updateBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        update(id);
    });
    document.getElementById("delete"+qid).remove();
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.id = "delete" + qid;
    deleteBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        remove(id);
    });
    
    bdiv.appendChild(updateBtn);
    bdiv.appendChild(deleteBtn);
}

getAll();