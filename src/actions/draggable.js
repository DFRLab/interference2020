export function draggable(node) {
  let isDown = false;
  let startX;
  let scrollLeft;

  function handleMousedown(event) {
    isDown = true;
    startX = event.pageX - node.offsetLeft;
    scrollLeft = node.scrollLeft;

    window.addEventListener('mouseleave', handleMouseup);
    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
  }

  function handleMouseup() {
    isDown = false;
    
    window.removeEventListener('mouseleave', handleMouseup);
    window.removeEventListener('mousemove', handleMousemove);
    window.removeEventListener('mouseup', handleMouseup);
  }

  function handleMousemove(event) {
    if (!isDown) return;
    event.preventDefault();
    const x = event.pageX - node.offsetLeft;
    const walk = (x - startX) * 3;
    node.scrollLeft = scrollLeft - walk;
  }

  node.addEventListener('mousedown', handleMousedown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown);
    },
  };
}
