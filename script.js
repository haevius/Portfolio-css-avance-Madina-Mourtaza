// JavaScript pour la fonctionnalité de carrousel des projets
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(carousel => {
        initCarousel(carousel);
    });
    
    function initCarousel(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const projects = Array.from(track.querySelectorAll('.project-card'));
        const nextButton = carousel.querySelector('.next-btn');
        const prevButton = carousel.querySelector('.prev-btn');
        
        carousel.setAttribute('aria-live', 'polite');
        
        let currentIndex = 1;
        
        function slideToNext() {
            currentIndex = (currentIndex + 1) % projects.length;
            if (currentIndex === 0) currentIndex = projects.length - 1;
            updateCarousel();
        }
        
        function slideToPrev() {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
            if (currentIndex === projects.length - 1) currentIndex = 0;
            updateCarousel();
        }
        
        function updateCarousel() {
            projects.forEach(project => {
                project.classList.remove('center-project', 'left-project', 'right-project', 'side-project');
                project.style.display = 'block';
            });
            
            const centerIdx = currentIndex;
            const leftIdx = (currentIndex - 1 + projects.length) % projects.length;
            const rightIdx = (currentIndex + 1) % projects.length;
            
            projects[centerIdx].classList.add('center-project');
            projects[leftIdx].classList.add('side-project', 'left-project');
            projects[rightIdx].classList.add('side-project', 'right-project');
        }
        
        updateCarousel();
        
        nextButton.addEventListener('click', slideToNext);
        prevButton.addEventListener('click', slideToPrev);
    }
});