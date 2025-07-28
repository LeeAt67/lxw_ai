import SearchBox from "@/components/SearchBox";
import useSearchStore from "@/store/useSearchStore";
import styles from "./search.module.css";
import { useState, useEffect, memo } from "react";

const HotListItems = memo((props) => {
  const { hotList } = props;
  console.log("-------");
  return (
    <div className={styles.hot}>
      <h1>热门推荐</h1>
      {hotList.map((item) => {
        return (
          <div key={item.id} className={styles.item}>
            {item.city}
          </div>
        );
      })}
    </div>
  );
});
const Search = () => {
  const [query, setQuery] = useState("");
  const { suggestList, setSuggestList, hotList, setHotList } = useSearchStore();
  useEffect(() => {
    setHotList();
  }, []);
  // 单向数据流
  // 反复生成 useCallback
  const handleQuery = (query) => {
    // api 请求
    setQuery(query);
    console.log("debounce后", query);
    if (!query) {
      return;
    }
    setSuggestList(query);
  };
  const suggestListStyle = {
    display: query == "" ? "none" : "block",
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SearchBox handleQuery={handleQuery} />
        {/*维护性*/}
        <HotListItems hotList={hotList}></HotListItems>
        <div className={styles.list} style={suggestListStyle}>
          {suggestList.map((item) => (
            <div key={item} className={styles.item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
