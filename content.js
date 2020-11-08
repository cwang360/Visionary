console.log('Chrome extension running');
var highlightMode = "default";
var linkStyle = [];

//message receiving
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse){
    console.log(message.txt);
    if(message.txt === "change font size"){
        setSize(message.fontSize);
    }
    if(message.txt === "change padding"){
        setPadding(message.padding, message.spacing);
    }
    if(message.txt === "change highlight mode"){
        highlightMode = message.hMode;
        console.log(highlightMode);
    }
    if(message.txt === "toggle remove image"){
        removeImages(message.removeImg);
    }
    if(message.txt === "toggle remove link"){
        removeLinks(message.removeLk);
    }
    if(message.txt === 'change font'){
        setFont(message.font);
    }
    if(message.txt === 'change color scheme'){
        setColor(message.color);  
    }
    if(message.txt === 'change mode'){
        setPadding(message.padding, message.spacing);
        setSize(message.fontSize);
        setFont(message.font);
        setColor(message.color);
        removeImages(message.removeImg);
        removeLinks(message.removeLk);
    }
}

function setPadding(padding, spacing){
    let paragraphs = document.getElementsByTagName('p');
    for (elt of paragraphs) {
      elt.style['padding'] = padding;
      elt.style['line-height'] = spacing;
    }   
}
function setSize(size){
    let paragraphs = document.getElementsByTagName('p');
    for (elt of paragraphs) {
      elt.style['font-size'] = size;
    }    
}
function setFont(font){
    let paragraphs = document.getElementsByTagName('p');
    for (elt of paragraphs) {
        elt.style['fontFamily'] = font;
    }   
    let h1 = document.getElementsByTagName('h1');
    for (elt of h1) {
        elt.style['fontFamily'] = font;
    }  
    let h2 = document.getElementsByTagName('h2');
    for (elt of h2) {
        elt.style['fontFamily'] = font;
    }    
    let h3 = document.getElementsByTagName('h3');
    for (elt of h3) {
        elt.style['fontFamily'] = font;
    }  
    let h4 = document.getElementsByTagName('h4');
    for (elt of h4) {
        elt.style['fontFamily'] = font;
    } 
    let h5 = document.getElementsByTagName('h5');
    for (elt of h5) {
        elt.style['fontFamily'] = font;
    }  
    let h6 = document.getElementsByTagName('h6');
    for (elt of h6) {
        elt.style['fontFamily'] = font;
    }  
    let lists = document.getElementsByTagName('li');
    for (elt of lists) {
        elt.style['fontFamily'] = font;
    }
    let tables = document.getElementsByTagName('table');
    for (elt of tables) {
        elt.style['fontFamily'] = font;
    }    
}
function setColor(color){
    var fontColor;
    var backgroundColor;
    if(color === 'plain'){
        fontColor = 'black';
        backgroundColor = 'white';
    }else if(color === 'nightMode'){
        fontColor = '#f0f4f8';
        backgroundColor = '#3b3b3b';
    }else if(color === 'warm'){
        fontColor = '#9b2948';
        backgroundColor = '#ffedbf';
    }else if(color === 'cool'){
        fontColor = '#334e68';
        backgroundColor = '#bcccdc';
    }   
    let divs = document.getElementsByTagName('div');
    let links = document.getElementsByTagName('a');
    let paragraphs = document.getElementsByTagName('p');
    let tables = document.getElementsByTagName('table');
    let headers = document.getElementsByTagName('header');
    let h1 = document.getElementsByTagName('h1');
    let h2 = document.getElementsByTagName('h1');
    let h3 = document.getElementsByTagName('h1');
    let h4 = document.getElementsByTagName('h1');
    let h5 = document.getElementsByTagName('h1');
    let h6 = document.getElementsByTagName('h1');

    for (elt of divs) {
      elt.style['color'] = fontColor;
      elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of headers) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of paragraphs) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of tables) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of links) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of h1) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of h2) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of h3) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of h4) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of h5) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    } 
    for (elt of h6) {
        elt.style['color'] = fontColor;
        elt.style['backgroundColor'] = backgroundColor;
    }
     
    document.body.style.backgroundColor = backgroundColor;
}
function removeImages(remove){
    var images = document.getElementsByTagName('img');
    if(remove){
        console.log("removing images");
        for(elt of images){
            elt.style['display'] = 'none';
        }
        
    }else{
        console.log("see images");
        for(elt of images){
            elt.style['display'] = 'block';
        }
    }
}
function removeLinks(remove){
    var links = document.getElementsByTagName('a');
    if(remove){
        console.log("removing links");
        for(elt of links){
            linkStyle.push(window.getComputedStyle(elt).getPropertyValue('color'));
            console.log(linkStyle[linkStyle.length-1]);
            elt.style['pointer-events'] = 'none';
            elt.style['color'] = 'inherit';
            elt.style['text-decoration'] = 'none';
        }
        
    }else{
        var i = 0;
        for(elt of links){
            elt.style['pointer-events'] = 'auto';
            console.log(linkStyle[i]);
            elt.style['color'] = linkStyle[i];
            i++;
        }
    }
}



// Add tooltip to the top of the page.
var tooltipDOM = document.createElement('div');
tooltipDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(tooltipDOM);


document.addEventListener('mouseup', function (e) {
    if(highlightMode === "wordImage"){
        var selection = window.getSelection().toString();
        if (selection.length > 0) {
            renderBubble(e.clientX, e.clientY+window.pageYOffset, selection);
        }
        //console.log(document.body.scrollTop);
        console.log(window.pageYOffset);
    }
}, false);


// Close the tooltip when we click on the screen.
document.addEventListener('mousedown', function (e) {
  tooltipDOM.style.visibility = 'hidden';
}, false);

// Move tooltip
function renderBubble(mouseX, mouseY, selection) {
    
        console.log('enter render bubble');
        //remove old image
        tooltipDOM.innerHTML = 'Loading...';
        var img = "";
        $.getJSON('https://www.googleapis.com/customsearch/v1?<API_KEY_HERE>&cx=<SEARCH_ENGINE_ID>&q='+selection, function(data) {
            if('items' in data){
                for(var i = 0; i<data.items.length; i++){
                    console.log(data.items[i]);
                    //if contains imageobject, get the first image url
                    if('imageobject' in data.items[i].pagemap){
                        console.log("there is imageobject");
                        if(data.items[i].displayLink == "unsplash.com"){
                            img = data.items[i].pagemap.imageobject[0].thumbnailurl;
                        }else if(data.items[i].displayLink == "pixabay.com"){
                            img = data.items[i].pagemap.imageobject[0].contenturl;
                        }
                        console.log(img);
                        var elem = document.createElement("img");
                        elem.setAttribute('class', 'bubble_image');
                        elem.src = img;
                        tooltipDOM.innerHTML = '';
                        tooltipDOM.appendChild(elem);
                        break;
                    }
                }
            }
            //nothing found
            //img = data.items[0].pagemap.imageobject[0].thumbnailurl;
            if(img == ""){
                console.log("no image");
                tooltipDOM.innerHTML = "No image found for \""+selection+"\"";
            }
            
        });
    

    tooltipDOM.style.top = mouseY + 'px';
    tooltipDOM.style.left = mouseX + 'px';
    tooltipDOM.style.visibility = 'visible';
}
