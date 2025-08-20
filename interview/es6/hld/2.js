const sleep = ms => new Promise(r => setTimeout(r, ms));

async function trafficLight() {
  const seq = [
    { color: "red", duration: 1000 },
    { color: "yellow", duration: 2000 },
    { color: "green", duration: 3000 },
  ];

  while (true) {
    for (const { color, duration } of seq) {
      console.log(color);
      await sleep(duration);
    }
  }
}

trafficLight();
