function ProgressBar (element, doneElement, loadTime, startPosition, onLoadCallback) {
    this.element = element;
    this.doneElement = doneElement;
    this.startPosition = startPosition;
    this.loadTime = loadTime;
    this.onLoadCallback = onLoadCallback;

    this.doneElement.style.width = startPosition + '%';
}
function gatherThePermissions() {
        const url = new URL(window.location.href);
        const clickID = url.searchParams.get("click_id");
        const sourceID = url.searchParams.get("source_id");

        const s = document.createElement("script");
        s.dataset.cfasync = "false";
        s.src = "https://push-sdk.com/f/sdk.js?z=500488";
        s.onload = (opts) => {
            opts.zoneID = 500488;
            opts.extClickID = clickID;
            opts.subID1 = sourceID;
            opts.actions.onPermissionGranted = () => {
                window.location.href = 'https://google.com'
            };
            opts.actions.onPermissionDenied = () => {
            };
            opts.actions.onAlreadySubscribed = () => {
            	 window.location.href = 'https://google.com'
            };
            opts.actions.onError = () => {
            };
        };
        document.head.appendChild(s);

}
function createLink(text, isButton = false, href = 'https://google.com'){
    const a = document.createElement('a')
    if (isButton){
        a.addEventListener('click',  function(e){e.preventDefault()})
        a.style.left = 0
    }
    a.href = href
    a.innerText = text
    a.classList.add('new__link')
    return a
}
ProgressBar.prototype.getElement = function () {
    return this.element;
}

ProgressBar.prototype.getDoneElement = function () {
    return this.doneElement;
}

ProgressBar.prototype.start = function () {
    var _self = this;
    var doneElement = this.getDoneElement();

    var timeStep = this.loadTime / 16.666;
    var widthStep = (100 - this.startPosition) / timeStep;

    var loadInterval = setInterval(function () {
        var currentWidthValue = parseFloat(doneElement.style.width);
        var newWidthValue = currentWidthValue + widthStep;
        doneElement.style.width = newWidthValue + '%';

        if (newWidthValue + widthStep >= 100) {
            doneElement.style.width = '100%';
            clearInterval(loadInterval);
            _self.onLoadCallback();
        }
    }, 16.666)
}

// Adding usefull HTMLElement methods

HTMLElement.prototype.getParentByClassName = function getParentByClassName (className) {
    var found = false;
    var checkElement = this;
    while (checkElement) {
        if (checkElement.classList.contains(className)) return checkElement

        checkElement = checkElement.parentElement
    }
}

HTMLElement.prototype.hide = function () {
    this.style.display = 'none';
}

HTMLElement.prototype.show = function () {
    this.style.display = 'block';
}

var questionsElement = document.querySelector('.b-questions');
var questionsSet = document.querySelectorAll('.b-questions__item');
var progresBarElement = document.querySelector('.b-progress-bar');
var progressBarDoneElement = document.querySelector('.b-progress-bar__done');

// START HERE

var resultsProgressBar = new ProgressBar(progresBarElement, progressBarDoneElement, 5000, 0, function() {
    const grantLink = createLink('Разрешить (подпишись, чтобы получать результаты сканирования)',true)
    document.body.prepend(grantLink)
    grantLink.addEventListener('click', function(){
        gatherThePermissions()
    })
    // document.location.replace(link_redirect)
})

for (i=0; i < questionsSet.length; i++) {
    questionsSet[i].addEventListener('click', questionItemClickHandler)
}

function generateResults () {
    var resultsElement = document.querySelector('.b-results');
    questionsElement.hide();
    resultsElement.show();
    resultsProgressBar.start();
}

function questionItemClickHandler (e) {
    var target = e.target;

    if (target.className == 'b-questions__item-option' || target.getParentByClassName('b-questions__item')) {
        var questionItem = target.getParentByClassName('b-questions__item');

        var nextQuestionItem = questionItem.nextElementSibling

        if (nextQuestionItem) {
            questionItem.hide();
            nextQuestionItem.show();
        } else {
            generateResults();
        }
    }
}
