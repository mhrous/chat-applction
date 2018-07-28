class ReadText {
  constructor() {
    if ("speechSynthesis" in window) {
      this.speech = window.speechSynthesis;
      this.speech.onend = () => {
        this.speech.cancel();
      };
      this.speech.onstart = () => {
        this.speech.cancel();
      };
    } else {
      console.warn(
        "The current browser does not support the speechSynthesis API."
      );
    }
  }

  speak = text => {
    this.speech.cancel();
    let read = new SpeechSynthesisUtterance(text);
    this.speech.speak(read);
  };
  cancel = () => {};
}
const readText = new ReadText();
export default readText;
