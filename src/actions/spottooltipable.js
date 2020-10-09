import SpotTooltip from '../components/SpotTooltip.svelte';
import { get } from 'svelte/store';

export function spottooltipable(node, { data, target, top }) {
  let component;

  function handleMouseleave(e) {
    component.$destroy();
    node.removeEventListener('mouseleave', handleMouseleave)
  }

  function handleMouseenter(e) {
    if (!target) return;
    
    const { left } = node.getBoundingClientRect();

    component = new SpotTooltip({
      target,
      props: {
        data,
        x: left, 
        y: top
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
