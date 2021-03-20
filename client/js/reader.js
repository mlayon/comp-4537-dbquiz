const xhttp = new XMLHttpRequest();
const path = "http://localhost:3000";

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

// makes get request for getting the most recent quote
let getRecent = function(){
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 200) {
		    console.log(this.responseText);
		    let arr = JSON.parse(this.responseText);
	    	console.log(arr);
            document.getElementById("main").innerHTML = ""; // clear out page

            // location.reload();
    		for(let i = 0; i < arr.length; i++) {
         		render(arr[i])
     		}
    	}
    }
	
    xhttp.open("GET", path + "/quotes/recent", true);
    xhttp.send();
}

// renders dom elements for each quote/author
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
    qtext.readOnly = true;

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
    atext.readOnly = true;

    alabel.htmlFor = "author" + qid;
    alabel.innerHTML = "Author " + qid;

    // appending elements
    qdiv.appendChild(qlabel);
    qdiv.appendChild(qtext);
    adiv.appendChild(alabel);
    adiv.appendChild(atext);

    document.getElementById("main").appendChild(qdiv);
    document.getElementById("main").appendChild(adiv);

}