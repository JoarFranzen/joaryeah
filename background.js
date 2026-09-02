// Enkel scroll-parallax for #bg-canvas blobbarna.
// Flyttar varje blob i olika hastighet baserat pa scroll-position for att ge djup.
// Respekterar prefers-reduced-motion.
(function(){
  const blobs = document.querySelectorAll('.blob');
  if (!blobs.length) return;

  const speeds = [0.05, 0.09, 0.04, 0.07];
  let ticking = false;

  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = speeds[i % speeds.length];
        blob.style.transform = `translate3d(0, ${y * speed * -1}px, 0)`;
      });
      ticking = false;
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion){
    window.addEventListener('scroll', onScroll, { passive:true });
  }
})();
