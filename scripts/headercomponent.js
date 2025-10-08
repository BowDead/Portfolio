function fillHeader1() {
    return `
        <div id="col1">
            <img class="image" src="images/avatar.png" alt="BowDead">
        </div>
        <div class="col2">
            <div>
                <h1>bowdead.github.io</h1>
            </div>
            <div>
                <a class="przycisk" href="index.html">
                    Strona Główna
                </a>
                <a class="przycisk" href="list.html">
                    Moje Projekty
                </a>
                <a class="przycisk" href="columns.html">
                    Moje Umiejętności
                </a>
                <a class="przycisk" href="contact.html">
                    Kontakt
                </a>
            </div>
        </div>`;
}

function fillHeader2() {
    return `
        <div class="row1">
            <img class="image" src="images/avatar.png" alt="BowDead">
            <h1>bowdead.github.io</h1>
        </div>
        <div class="row2">
            <a class="przycisk" href="index.html">
                Strona Główna
            </a>
            <a class="przycisk" href="list.html">
                Moje Projekty
            </a>
        </div>
        <div class="row3">
            <a class="przycisk" href="columns.html">
                Moje Umiejętności
            </a>
            <a class="przycisk" href="contact.html">
                Kontakt
            </a>
        </div>`;
}

// Injecting the headers into elements by ID
function injectHeader(targetId, headerType) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
        console.error(`Element with ID '${targetId}' not found.`);
        return;
    }

    if (headerType === 'header1') {
        targetElement.innerHTML = fillHeader1();
    } else if (headerType === 'header2') {
        targetElement.innerHTML = fillHeader2();
    } else {
        console.error(`Invalid header type: '${headerType}'. Choose 'header1' or 'header2'.`);
    }
}

// Onload injection
window.onload = function() {
    injectHeader('head1', 'header1');
    injectHeader('head2', 'header2');
};
