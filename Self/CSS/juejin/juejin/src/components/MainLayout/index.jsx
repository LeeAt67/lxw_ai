import { Outlet } from "react-router-dom";
import { Tabs } from "react-vant";
import { useState } from "react";
const MainLayout = () => {
  const tabs = [
    {
      title: "推荐",
      path: "/recommended",
    },
    {
      title: "关注",
      path: "/following",
    },
    {
      title: "热榜",
      path: "/rank",
    },
    {
      title: "后端",
      path: "/backend",
    },
    {
      title: "前端",
      path: "/frontend",
    },
    {
      title: "Android",
      path: "/android",
    },
    {
      title: "iOS",
      path: "/ios",
    },
    {
      title: "AI",
      path: "/ai",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <div>
      <Outlet />
      <Tabs
        value={active}
        onChange={(key) => {
          setActive(key);
          navigate(tabs[key].path);
        }}
      >
        {tabs.map((tab, index) => (
          <Tabs.TabPane key={index} title={tab.title}></Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default MainLayout;
