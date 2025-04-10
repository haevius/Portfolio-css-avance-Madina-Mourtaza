// Système de transitions simples et rapides entre les pages
document.addEventListener('DOMContentLoaded', function() {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'simple-page-transition';
    document.body.appendChild(transitionElement);

    const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="accueil.html"], a[href^="contact.html"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetUrl = this.getAttribute('href');
            
            transitionElement.classList.add('active');
            
            setTimeout(function() {
                window.location.href = targetUrl;
            }, 300);
        });
    });
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            transitionElement.classList.remove('active');
        }, 100);
    });
});