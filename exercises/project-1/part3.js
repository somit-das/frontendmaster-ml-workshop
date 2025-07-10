import "@tensorflow/tfjs"
import "@mediapipe/face_detection"
import "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-backend-webgl"
import * as faceDetection from "@tensorflow-models/face-detection"
import { startWebcam, takePicture } from "./utils"


const webcamButton = document.getElementById("webcam");
const captureButton = document.getElementById("pause");
const video = document.querySelector("video");
let model,detector;

const init = async()=>{
    //here loading facedetection model is different that cocoSsd model
    model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    detector = await faceDetection.createDetector(model,{"runtime":"tfjs"})
}


webcamButton.onclick = () => startWebcam(video)
captureButton.onclick = () => takePicture(video,predict);
const predict = async(photo) =>{
    const faces = await detector.estimateFaces(photo,{flipHorizontal:false});
    console.log(faces);
}

init()