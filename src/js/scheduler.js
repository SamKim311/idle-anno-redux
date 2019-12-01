export default class Scheduler {
  constructor(functionToRun, targetInterval) {
    this.targetFunction = functionToRun;
    this.targetInterval = targetInterval;
    this.running = false;
  }

  start() {
    if (this.running) {
      return;
    }
    let lastTick = Date.now();
    this.running = true;
    let repeater = () => {
      if (!this.running) {
          return;
      }
      let currentTime = Date.now();
      let elapsedTime = currentTime - lastTick;
      this.targetFunction(elapsedTime);
      lastTick = currentTime;
      setTimeout(repeater.bind(this), this.targetInterval);
    }
    setTimeout(repeater.bind(this), this.targetInterval);
  }

  stop() {
    this.running = false;
  }
}
