function getURLParameter(name) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === name) {
            return decodeURI(pair[1]);
        }
    }
    return '';
}
function goto() {
    location.href = link_redirect;
}
