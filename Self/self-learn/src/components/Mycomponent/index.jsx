import { useRef, useState, useEffect } from "react";
// ❌ 错误示例
export default function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 这里调用 useRef 会导致调用顺序不一致
    const ref = useRef(null); // 错误！
  }, []);

  return <div>...</div>;
}
