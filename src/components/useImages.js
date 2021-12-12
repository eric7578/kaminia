import { useCallback, useEffect, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import { useSprings } from '@react-spring/web';

export function useFadeIn(images) {
  const ref = useRef();
  const { inViewport } = useInViewport(ref);
  const [springProps, api] = useSprings(images.length, i => ({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    },
    delay: i * 100 + 300
  }));

  const renderer = useCallback(
    i => {
      const props = springProps[i];
      return {
        key: i,
        src: images[i],
        style: props
      };
    },
    [springProps, images]
  );

  useEffect(() => {
    if (inViewport) {
      api.resume();
    } else {
      api.pause();
    }
  }, [inViewport]);

  return [ref, renderer];
}
