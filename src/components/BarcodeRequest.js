import axios from "axios";

export default function BarcodeRequest(barcode) {
  return axios
    .get(`https://murmuring-depths-70450.herokuapp.com/product/${barcode}`)
    .then(res => {
      if (res) {
        //console.log(res);
        return res.data;
      } else {
        return "no response from barcode database!";
      }
    });
}
