import { useRef } from "react";
import MyComponent from "./components/Mycomponent";

export default function CatFriends() {
  const listRef = useRef(null);

  function scrollToIndex(index) {
    const listNode = listRef.current;
    console.log(listNode);

    // This line assumes a particular DOM structure:
    const imgNode = listNode.querySelectorAll("li > img")[index];
    console.log(imgNode);
    imgNode.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <>
      <MyComponent />
      <nav>
        <button onClick={() => scrollToIndex(0)}>Neo</button>
        <button onClick={() => scrollToIndex(1)}>Millie</button>
        <button onClick={() => scrollToIndex(2)}>Bella</button>
      </nav>
      <div>
        <ul ref={listRef}>
          <li>
            <img src="https://placecats.com/neo/300/200" alt="Neo" />
          </li>
          <li>
            <img src="https://placecats.com/millie/200/200" alt="Millie" />
          </li>
          <li>
            <img src="https://placecats.com/bella/199/200" alt="Bella" />
          </li>
        </ul>
      </div>
    </>
  );
}
