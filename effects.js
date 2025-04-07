document.addEventListener('DOMContentLoaded', function() {
  // Création du canvas pour les particules
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const ctx = canvas.getContext('2d');
  
  // Configuration des particules
  const particlesArray = [];
  const numberOfParticles = 100;
  
  class Particle {
      constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
          this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
      }
      
      update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          if (this.size > 0.2) this.size -= 0.1;
          
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
      }
  }
  
  function init() {
      for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(new Particle());
      }
  }
  
  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
      }
      requestAnimationFrame(animate);
  }
  
  init();
  animate();
  
  // Effet de néon sur les titres
  const neonTexts = document.querySelectorAll('h1, h2');
  neonTexts.forEach(text => {
      text.innerHTML = text.textContent.split('').map(letter => 
          `<span class="neon-letter">${letter}</span>`
      ).join('');
  });
  
  function neonEffect() {
      const letters = document.querySelectorAll('.neon-letter');
      letters.forEach(letter => {
          const randomIntensity = Math.random() * 0.5 + 0.5;
          letter.style.textShadow = `0 0 ${randomIntensity * 10}px rgba(232, 60, 255, ${randomIntensity})`;
      });
  }
  
  setInterval(neonEffect, 50);
  
  // Effet de distorsion au survol des boutons
  const buttons = document.querySelectorAll('.play-now, .signup-btn');
  buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          button.style.transform = `perspective(500px) rotateX(${(y - rect.height / 2) / 10}deg) rotateY(${-(x - rect.width / 2) / 10}deg)`;
          button.style.boxShadow = `
              ${(x - rect.width / 2) / 10}px 
              ${(y - rect.height / 2) / 10}px 
              20px rgba(232, 60, 255, 0.7)
          `;
      });
      
      button.addEventListener('mouseleave', () => {
          button.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
          button.style.boxShadow = '0 0 20px rgba(232, 60, 255, 0.7)';
      });
  });
  
  // Effet de vague sur le formulaire
  const form = document.querySelector('.signup-form');
  form.addEventListener('mousemove', (e) => {
      const rect = form.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const gradientX = (x / rect.width) * 100;
      const gradientY = (y / rect.height) * 100;
      
      form.style.background = `
          radial-gradient(
              circle at ${gradientX}% ${gradientY}%, 
              rgba(255, 255, 255, 0.2) 0%, 
              rgba(255, 255, 255, 0.1) 20%, 
              rgba(255, 255, 255, 0.05) 40%, 
              rgba(255, 255, 255, 0) 60%
          ),
          rgba(255, 255, 255, 0.1)
      `;
  });
  
  // Redimensionnement du canvas
  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
  });
});