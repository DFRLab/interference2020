import { tweened } from 'svelte/motion';
import { cubicInOut } from 'svelte/easing';

export const createTweenedPos = () => tweened(undefined, {
  delay: 0,
  duration: 800,
  easing: cubicInOut
});
