let elements = document.querySelectorAll('a.btn-floating');

for (let elem of elements) {

    elem.addEventListener('click', function(event) {
        event.preventDefault();

        let id = elem.getAttribute('href');
        document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    });
}
