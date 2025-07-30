import styles from "./waterfall.module.css";
import { useEffect, useRef, useState } from "react";
import ImageCard from "@/components/ImageCard";
const Waterfall = (props) => {
  const { images, fetchMore, loading } = props;
  const loader = useRef(null);
  useEffect(() => {
    // ref 出现了在视窗 intersectionObserver
    // 观察者模式
    const observer = new IntersectionObserver(([entry], obs) => {
      console.log(entry);
      // 判断是否进入视窗
      if (entry.isIntersecting) {
        fetchMore();
      }
      // obs.unobserve(entry.target);
    });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [images]);

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.column}>
          {images
            .filter((_, i) => !(i & 1))
            .map((img) => (
              <ImageCard key={img.id} {...img} />
            ))}
        </div>
        <div className={styles.column}>
          {images
            .filter((_, i) => i & 1)
            .map((img) => (
              <ImageCard key={img.id} {...img} />
            ))}
        </div>
        <div ref={loader} className={styles.loader}>
          {loading && "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Waterfall;
