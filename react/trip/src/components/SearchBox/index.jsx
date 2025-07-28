import { memo } from "react";
const SearchBox = (props) => {
  // 单向数据流
  // 子父通信
  const { handleQuery } = props;
  return <div>SearchBox</div>;
};

export default memo(SearchBox);
