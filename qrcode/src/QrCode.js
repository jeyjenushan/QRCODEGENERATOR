import {useState} from "react";

const QrCode = () => {
    const[img,setImg]=useState("");
    const[loading,setLoading]=useState(false);
    const[qrData,setQrData]=useState("");
    const[qrSize,setQrSize]=useState("");
    async function generateQR() {
        setLoading(true);
        try{
           const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${encodeURIComponent(qrData)}`;
           setImg(url); 
        }catch(error){
            console.error("Error generating QR code",error);

        }finally{
           setLoading(false); 
        }
    }
    function downloadQr(){
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);// binary image convert pannurom
            link.download="qrcode.png";
            document.body.appendChild(link)
            link.click();//image automatica click panna vikirom
            document.body.removeChild(link)
        }).catch((error)=>{
            console.error("Error downloading qrcode",error);
        })
    }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img &&<img src={img} className="qr-code-image" width="200px"/>}
<div>
    <label htmlFor="dataInput" className="input-label" >
        Data for QR code:
    </label>
    <input type="text" id="dataInput"  value={qrData} placeholder="Enter data for QR code" onChange={(e)=>setQrData(e.target.value)} />
    <label htmlFor="sizeInput" className="input-label">
        Image size (e.g., 150):
    </label>
    <input type="text" id="sizeInput" value={qrSize} placeholder="Enter image size" onChange={(e)=>setQrSize(e.target.value)}/>
<button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
<button className="download-button" onClick={downloadQr}>Download QR Code</button>

</div>
<p className="footer">Designed By <a href="https://www.google.com">Jenushan</a></p>
    </div>
  )
}

export default QrCode
