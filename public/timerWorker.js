let intervalId;
let timeCnt = 0;

self.onmessage = function(event) {
  const { type, cnt } = event.data;

  if (type === 'start') {
    timeCnt = cnt
    intervalId = setInterval(() => {
      timeCnt += 1000;
      self.postMessage({ type: 'tick', counter: timeCnt });
    }, 1000);
  } else if (type === 'stop') {
    clearInterval(intervalId);
  } else if (type === 'reset') {
    timeCnt = 0
  }
};
