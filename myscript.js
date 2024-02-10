window.onload = ()=>{
    history.pushState({page: 1}, null, '')
    window.addEventListener('popstate', function() {
        window.location.href = 'https://www.google.com';
    });

}
