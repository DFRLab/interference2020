export function slidable(node) {
  let x;
  let left;

  function handleMousedown(event) {
    x = event.clientX;

    node.dispatchEvent(
      new CustomEvent('slidestart', {
        detail: { x },
      })
    );

    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
  }

  function handleMousemove(event) {
    const dx = event.clientX - x;
    x = event.clientX;

    node.dispatchEvent(
      new CustomEvent('slide', {
        detail: { x, dx },
      })
    );
  }

  function handleMouseup(event) {
    x = event.clientX;
    left = node.offsetLeft;

    node.dispatchEvent(
      new CustomEvent('slideend', {
        detail: { x, left },
      })
    );

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
