import { useCallback, useEffect, useRef } from 'react';

const useScroll = <T extends HTMLElement>(duration: number, delay: number) => {
    const dom = useRef<T | null>(null);

    const onScroll = useCallback(([entry]) => {
        const { current } = dom;

        if(entry.isIntersecting && current) {
            current.style.transitionProperty = "opacity transform";
            current.style.transitionDuration = `${duration}s`;
            current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
            current.style.transitionDelay = `${delay}s`;
            current.style.opacity = "1";
            current.style.transform = "translate3d(0, 0, 0)";
        }
    }, [delay, duration]);

    useEffect(() => {
        let observer: IntersectionObserver;
        const { current } = dom;

        if(current) {
            observer = new IntersectionObserver(onScroll, { threshold: 0.7 });
            observer.observe(current);

            return () => observer && observer.disconnect();
        }
    }, [onScroll]);

    return {
        ref: dom,
        style: {
            opacity: 0,
            transform: "translate3d(0, 50%, 0)",
        }
    }
}

export default useScroll;