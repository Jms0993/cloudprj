import { useCallback } from 'react';

export const useSwipe = (onSwipe) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const minSwipeDistance = 50;

  const handleTouchStart = useCallback((e) => {
    setTouchEnd({ x: 0, y: 0 }); // Reset touch end
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const xDiff = touchStart.x - touchEnd.x;
    const yDiff = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(xDiff) > Math.abs(yDiff);

    // Only consider the swipe if the distance is greater than the minimum
    if (Math.abs(xDiff) < minSwipeDistance && Math.abs(yDiff) < minSwipeDistance) {
      return;
    }

    if (isHorizontalSwipe) {
      if (xDiff > 0) {
        onSwipe('left');
      } else {
        onSwipe('right');
      }
    } else {
      if (yDiff > 0) {
        onSwipe('up');
      } else {
        onSwipe('down');
      }
    }
  }, [touchStart, touchEnd, onSwipe]);

  useEffect(() => {
    if (touchEnd.x !== 0 || touchEnd.y !== 0) {
      handleTouchEnd();
    }
  }, [touchEnd, handleTouchEnd]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};
