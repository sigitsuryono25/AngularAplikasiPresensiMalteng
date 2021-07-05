declare var faceapi: any
import { environment } from 'src/environments/environment';
const detector = {
  async detectWajah(imageId: any, labels: any) {
    await faceapi.nets.faceRecognitionNet.load(`${environment.baseUrlDebug}assets/klasifikasi/models`);
    await faceapi.nets.faceLandmark68Net.loadFromUri(`${environment.baseUrlDebug}assets/klasifikasi/models`);
    await faceapi.nets.ssdMobilenetv1.loadFromUri(`${environment.baseUrlDebug}assets/klasifikasi/models`);

    const input = document.getElementById(imageId);
    const results = await this.loadLabeledImages(labels);
    const faceMatcher = new faceapi.FaceMatcher(results);
    const singleResult = await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (singleResult) {
      const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
      // console.log(bestMatch.toString())
      var r = bestMatch.toString();
      var s = r.split(" ")
      var n = s[0];
      var b = s[1];

      return { nip: n, bobot: b };
    }
    return null;
  }, loadLabeledImages(labels: []) {
    // const labels = ['199402252017071001']
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 4; i++) {
          const img = await faceapi.fetchImage(environment.baseUrlDebug + `assets/klasifikasi/labeled/${label}/${i}.jpg`);
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }

        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }
}

export default detector;
