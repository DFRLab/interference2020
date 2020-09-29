import CopyTooltip from '../components/CopyTooltip.svelte';

export function copytooltipable(node, content) {
  let component;

  function handleMouseleave(e) {
    component.$destroy();
    node.removeEventListener('mouseleave', handleMouseleave)
  }

  function handleMouseenter(e) {
    const target = document.body;
    const x = e.pageX;
    const y = e.pageY + 20;

    component = new CopyTooltip({
      target,
      props: {
        title: node.innerHTML,
        content,
        x, 
        y
      },
      intro: true
    });

    node.addEventListener('mouseleave', handleMouseleave)
  }

  node.addEventListener('mouseenter', handleMouseenter);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseenter);
    },
  };
};
