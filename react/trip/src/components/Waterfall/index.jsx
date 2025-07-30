import styles from "./waterfall.module.css";
import { useEffect, useRef } from "react";
import ImageCard from "@/components/ImageCard";
const Waterfall = (props) => {
  const { images, fetchMore, loading } = props;
  const loader = useRef(null);
  useEffect(() => {
    // ref 出现了在视窗 intersectionObserver
    // 观察者模式
    const observer = new IntersectionObserver(([entry]) => {
      console.log(entry);
      // 判断是否进入视窗
      if (entry.isIntersecting) {
        fetchMore();
      }
    });
    if (loader.current) observer.observe(loader.current);
  }, []);

  return (
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
        加载中
      </div>
    </div>
  );
};

export default Waterfall;
