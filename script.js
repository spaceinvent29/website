// Randomize Perseid meteors
function randomizePerseids() {
  const perseidMeteors = document.querySelectorAll('.perseid-meteor');
  
  perseidMeteors.forEach(meteor => {
    // Random starting position
    const topPos = Math.random() * 40;
    const leftPos = Math.random() * 80 + 10;
    
    // Random rotation (30-60 degrees)
    const rotation = Math.random() * 30 + 30;
    
    // Random speed (6-12 seconds)
    const speed = Math.random() * 6 + 6;
    
    // Random delay
    const delay = Math.random() * 15;
    
    meteor.style.top = `${topPos}%`;
    meteor.style.left = `${leftPos}%`;
    meteor.style.transform = `rotate(${rotation}deg)`;
    meteor.style.animationDuration = `${speed}s`;
    meteor.style.animationDelay = `${delay}s`;
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code if any ...
  
  randomizePerseids();
  
  // Re-randomize periodically
  setInterval(randomizePerseids, 20000);

  const videoWidget = document.getElementById('videoWidget');
  const minimizeBtn = document.getElementById('minimizeBtn');
  const closeBtn = document.getElementById('closeBtn');
  const video = document.getElementById('spaceVideo');

  // Minimize button
  minimizeBtn.addEventListener('click', function() {
    videoWidget.classList.toggle('minimized');
    if (videoWidget.classList.contains('minimized')) {
      minimizeBtn.innerHTML = '<i class="fas fa-expand"></i>';
      video.pause();
    } else {
      minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
      video.play();
    }
  });

  // Close button
  closeBtn.addEventListener('click', function() {
    videoWidget.style.display = 'none';
    video.pause();
  });

  // Make widget draggable only on desktop
  if (window.innerWidth > 768) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    videoWidget.querySelector('.video-widget-header').addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;

      if (e.target.closest('.video-widget-header')) {
        isDragging = true;
      }
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        // Add boundaries to prevent dragging off screen
        const bounds = videoWidget.getBoundingClientRect();
        if (currentX < -bounds.width/2) currentX = -bounds.width/2;
        if (currentX > window.innerWidth - bounds.width/2) currentX = window.innerWidth - bounds.width/2;
        if (currentY < 0) currentY = 0;
        if (currentY > window.innerHeight - bounds.height) currentY = window.innerHeight - bounds.height;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, videoWidget);
      }
    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  }

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      videoWidget.style.transform = ''; // Reset position on mobile
    }
  });
}); 