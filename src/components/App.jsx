import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./BarcodeRequest";
import BarcodeRequest from "./BarcodeRequest";

var Quagga = require("quagga");

function App() {
  const [code, setCode] = useState(0);

  function handleTakePhoto(dataURI) {
    Quagga.decodeSingle(
      {
        src: dataURI,
        numOfWorkers: 0, // Needs to be 0 when used within node
        inputStream: {
          size: 800 // restrict input-size to be 800px in width (long-side)
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader"
          ]
        }
      },
      function(result) {
        if (!result) {
          console.log("no barcode was detected at all!");
          setCode(0);
          return null;
        }
        if (result.codeResult) {
          //   setCode("result", result.codeResult.code);

          //   setCode(result.codeResult.code);
          BarcodeRequest(result.codeResult.code).then(res => {
            setCode(res.product.product_name);
          });
          console.log("here");
        } else {
          console.log("not detected");
          setCode(0);
          return null;
        }

        // make httprequest using Axios in BarcodeRequest file
        // const data = await BarcodeRequest(code);
        // console.log(data);
      }
    );
  }

  return (
    <div>
      <Camera
        onTakePhoto={dataURI => {
          handleTakePhoto(dataURI);
        }}
        idealFacingMode={"environment"}
        isImageMirror={false}
        sizeFactor={1}
      />
      <h1>{code}</h1>
    </div>
  );
}

export default App;
