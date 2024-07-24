function placeCards() {
    let l = 0;
    let yOffset = 7;
    for (let cc of document.getElementsByClassName("word-card")) {
        if (cc.getAttribute('moved') !== null) {
            continue;
        }
        let xOffset = l * 82 + 7;
        if (xOffset + 82 > window.innerWidth) {
            xOffset = 7;
            yOffset += 47;
            l = 0;
        }
        // calculate left and top percentages
        let left = xOffset / window.innerWidth * 100;
        let top = yOffset / window.innerHeight * 100;


        cc.style.left = left + "%";
        cc.style.top = top + "%";
        l++;
    }

    document.getElementById("bank").style.height = yOffset + 47 + "px";
    document.getElementById("background").style.height = window.innerHeight - yOffset - 47 + "px";
}

placeCards();
window.addEventListener("resize", placeCards);

eel.get_words()(function (words) {
    for (let i = 1; i < 17; i++) {
        document.getElementById("card-" + i).innerHTML = words[i - 1];
    }
});

// Make the cards draggable:
for (var i = 1; i < 17; i++) {
    dragElement(document.getElementById("card-" + i));
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;


    function dragMouseDown(e) {
        e.target.setAttribute("moved", "");
        console.log(e.target);
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        // placeCards();
    }
}

eel.expose(close_window)
function close_window() {
    window.close()
}