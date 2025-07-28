import SearchBox from "@/components/SearchBox";
import useSearchStore from "@/store/useSearchStore";
const Search = () => {
  const { suggestList, setSuggestList } = useSearchStore();
  // 单向数据流
  // 反复生成 useCallback
  const handleQuery = (query) => {
    // api 请求
    console.log("debounce后", query);
    if (!query) {
      return;
    }
    
    setSuggestList(query);
  };

  return (
    <>
      <SearchBox handleQuery={handleQuery} />
    </>
  );
};

export default Search;
