
var routes = ['default', 'geolocation', 'synccalculation', 'webworker'];
checkLocation();
var tabs = document.querySelector('.tabs');
tabs.addEventListener('click', router);
var fullScreenBtn = document.querySelector('button');
fullScreenBtn.addEventListener('click', fullScreen);
var calc = document.querySelector('.calc');
calc.addEventListener('click', calculation);

function router(event) {
    event.preventDefault();
    var state = event.target.parentElement.dataset.tab;
    window.history.pushState(null, null, '/' + state);
    renderTab(state);
}

function renderTab(state) {
    let contents = Array.prototype.slice.call(document.querySelectorAll('.content-block'));
    contents.forEach(function (elem) {
        if (elem.dataset.content === state) {
            elem.style.display = 'block';
        } else {
            elem.style.display = 'none';
        }
    });
}

function checkLocation() {
    var link = location.pathname.slice(1);
    routes.forEach(function (elem) {
        if (elem === link) {
            renderTab(elem);
        } else {
            renderTab('default');
        }
    });
}

function fullScreen(event) {
    var content = document.querySelector('.content');
    var link = location.pathname.slice(1);

    if (!document.fullscreenElement) {
        content.requestFullscreen();
        event.target.textContent = '-';
        renderHeading(link);

        if (link === 'webworker') {
            var table = document.querySelector('table');
            table.style.cssFloat = 'right';
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            event.target.textContent = '+';
            hiddenHeading(link);

            if (link === 'webworker') {
                var _table = document.querySelector('table');

                _table.style.cssFloat = 'left';
            }
        }
    }
}

function renderHeading(link) {
    var targetBlock = document.querySelector('[data-content="' + link + '"]');
    var head = targetBlock.querySelector('.fullScreenHead');
    head.classList.remove('hidden');
    head.classList.add('visible');
}

function hiddenHeading(link) {
    var targetBlock = document.querySelector('[data-content="' + link + '"]');
    var head = targetBlock.querySelector('.fullScreenHead');
    head.classList.remove('visible');
    head.classList.add('hidden');
}

function calculation() {
    var table = document.querySelector('tbody');
    table.innerHTML = '';
    event.target.disabled = true;
    var iteration = document.querySelector('.iteration').value;
    var every = document.querySelector('.results').value;
    var worker = new Worker('webWorker.js');
    worker.postMessage({
        iteration: iteration,
        resultsEvery: every
    });

    worker.onmessage = function (e) {
        if (e.data.activeButton) {
            document.querySelector('.calc').disabled = false;
            return;
        }

        var row = document.createElement('tr');

        for (var i in e.data) {
            var td = document.createElement('td');
            td.innerHTML = e.data[i];
            row.appendChild(td);
        }

        table.appendChild(row);
    };
}