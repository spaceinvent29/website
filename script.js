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

  const video = document.getElementById('spaceVideo');
  
  // Ensure video autoplays
  video.play().catch(function(error) {
    console.log("Video autoplay failed:", error);
  });
}); 