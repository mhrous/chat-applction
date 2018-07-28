class Record {
  constructor() {
   this.mediaRecorder;
   this.recordedBlobs;
 
  navigator.mediaDevices
    .getUserMedia({
      audio: true
    })
    .then(this.handleSuccess)

  }

  startRecording=()=> {
    this.recordedBlobs = [];
    this.mediaRecorder = new MediaRecorder(window.stream, { mimeType: "" });
    this.mediaRecorder.ondataavailable = this.handleDataAvailable;
    this.mediaRecorder.start(10);
  }
   handleDataAvailable=(event)=> {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }

   handleSuccess=(stream)=> {
    window.stream = stream;
  }


  getFile=()=>{
    this.mediaRecorder.stop();
    const blob = new Blob(this.recordedBlobs, { type: "audio/webm" });
    const name="recode"+(Date.now())+".mp3"
    return new File([blob],name,{type: "audio/webm", lastModified: Date.now()})
  }

}
const voice = new Record();
export default voice;
