export function brushable(node) {
  let x;
  let startX;
  let width;

  function handleMousedown(event) {
    event.preventDefault();

    x = startX = event.clientX;

    node.dispatchEvent(
      new CustomEvent('brushstart', {
        detail: { x },
      })
    );

    node.classList.add('brushed');

    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
  }

  function handleMousemove(event) {
    width = Math.abs(event.clientX - startX);
    if (event.clientX < startX) x = event.clientX;

    node.dispatchEvent(
      new CustomEvent('brush', {
        detail: { x, width },
      })
    );
  }

  function handleMouseup() {
    const x1 = x;
    const x2 = x + width;

    node.dispatchEvent(
      new CustomEvent('brushend', {
        detail: { x1, width, x2 },
      })
    );

    node.classList.remove('brushed');

    window.removeEventListener('mousemove', handleMousemove);
    window.removeEventListener('mouseup', handleMouseup);
  }

  node.addEventListener('mousedown', handleMousedown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown);
    },
  };
}
