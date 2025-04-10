// Animation du chat qui court partout et évite le curseur
document.addEventListener('DOMContentLoaded', function() {
    const cat = document.createElement('div');
    cat.className = 'running-cat';
    document.body.appendChild(cat);
  
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let targetX = x;
    let targetY = y;
    let speedX = (Math.random() * 5) + 3;
    let speedY = (Math.random() * 5) + 2;
    let direction = speedX > 0 ? 'right' : 'left';
    let isRunning = true;
    let pauseTimer = null;
    let mouseX = -1000;
    let mouseY = -1000;
    let isEscaping = false;
    const escapeDistance = 150;
    const escapeSpeed = 8; 
    
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  
    function updateCatPosition() {
      if (!isRunning && !isEscaping) return;
  
      const catCenterX = x + cat.offsetWidth / 2;
      const catCenterY = y + cat.offsetHeight / 2;
      const distanceToMouse = Math.sqrt(
        Math.pow(catCenterX - mouseX, 2) + 
        Math.pow(catCenterY - mouseY, 2)
      );
  
      if (distanceToMouse < escapeDistance) {
        isEscaping = true;
        
        if (!isRunning) {
          isRunning = true;
          cat.classList.remove('sitting');
          clearTimeout(pauseTimer);
          pauseTimer = null;
        }
  
        const escapeAngle = Math.atan2(catCenterY - mouseY, catCenterX - mouseX);
        targetX = x + Math.cos(escapeAngle) * escapeSpeed * 2;
        targetY = y + Math.sin(escapeAngle) * escapeSpeed * 2;
        
        direction = Math.cos(escapeAngle) > 0 ? 'right' : 'left';
        cat.classList.toggle('flipped', direction === 'left');
        
        speedX = escapeSpeed;
        speedY = escapeSpeed;
      } else {
        if (isEscaping) {
          isEscaping = false;
        }
        
        if (Math.random() < 0.02 && !isEscaping) {
          speedX = ((Math.random() * 10) - 5) + (speedX > 0 ? 2 : -2);
          speedY = ((Math.random() * 10) - 5) + (speedY > 0 ? 2 : -2);
          
          speedX = Math.max(-8, Math.min(8, speedX));
          speedY = Math.max(-8, Math.min(8, speedY));
          
          direction = speedX > 0 ? 'right' : 'left';
          cat.classList.toggle('flipped', direction === 'left');
          
          if (Math.random() < 0.3 && !pauseTimer && !isEscaping) {
            isRunning = false;
            cat.classList.add('sitting');
            
            pauseTimer = setTimeout(() => {
              isRunning = true;
              cat.classList.remove('sitting');
              pauseTimer = null;
            }, Math.random() * 3000 + 1000);
          }
        }
        
        if (!isRunning) {
          requestAnimationFrame(updateCatPosition);
          return;
        }
        
        targetX = x + speedX;
        targetY = y + speedY;
      }
  
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
  
      if (x <= 0 || x >= window.innerWidth - cat.offsetWidth) {
        speedX = -speedX;
        direction = speedX > 0 ? 'right' : 'left';
        cat.classList.toggle('flipped', direction === 'left');
        
        if (x <= 0) x = 0;
        if (x >= window.innerWidth - cat.offsetWidth) x = window.innerWidth - cat.offsetWidth;
      }
  
      if (y <= 0 || y >= window.innerHeight - cat.offsetHeight) {
        speedY = -speedY;
        
        if (y <= 0) y = 0;
        if (y >= window.innerHeight - cat.offsetHeight) y = window.innerHeight - cat.offsetHeight;
      }
  
      cat.style.left = x + 'px';
      cat.style.top = y + 'px';
  
      requestAnimationFrame(updateCatPosition);
    }
  
    window.addEventListener('resize', function() {
      if (x > window.innerWidth - cat.offsetWidth) x = window.innerWidth - cat.offsetWidth;
      if (y > window.innerHeight - cat.offsetHeight) y = window.innerHeight - cat.offsetHeight;
    });
  
    updateCatPosition();
  });