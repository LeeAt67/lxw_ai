import { memo, useEffect, useRef, useState, useMemo } from "react";
import { debounce } from "@/utils";
import { ArrowLeft, Close } from "@react-vant/icons";
import styles from "./search.module.css";

const SearchBox = (props) => {
  // 单向数据流
  // 子父通信
  const [query, setQuery] = useState("");
  const { handleQuery } = props;
  // 非受控组件
  const queryRef = useRef(null);
  const handleChange = (e) => {
    let val = e.currentTarget.value;
    setQuery(val);
  };
  const clearQuery = () => {
    setQuery("");
    
    queryRef.current.value = "";
    queryRef.current.focus();
  };
  // 1.防抖
  // const handleQueryDebounce = debounce(handleQuery,300) 没下面的好
  // 2.useMemo 缓存debounce闭包结果
  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 300);
  }, [handleQuery]);
  const displayStyle = query ? { display: "block" } : { display: "none" };

  useEffect(() => {
    handleQueryDebounce(query);
  }, [query]);
  return (
    <div className={styles.wrapper}>
      <ArrowLeft onClick={() => history.go(-1)} />
      <input
        type="text"
        className={styles.ipt}
        placeholder="搜索旅游相关"
        ref={queryRef}
        onChange={handleChange}
      />
      {/* 用户体验 */}
      <Close onClick={clearQuery} style={displayStyle} />
    </div>
  );
};

export default memo(SearchBox);
