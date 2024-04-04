import { useState } from "react"


export const App = () => {
  const [img, setImg]  = useState("")
  const [lode, setLode] = useState(false)
  const [name, setName] = useState("")
  const [size, setSize] = useState("")

async function generateQr (){
    setLode(true)
    try{
      const url =`https://api.qrserver.com/v1/create-qr-code/?size=${size}*${size}&data=${encodeURIComponent(name)}`
      setImg(url)
    }catch (error){
      console.error("Error",error)

    }finally{
      setLode(false)
    }
    
  }
  function downlode (){
    fetch(img).then((Response)=>{
      Response.blob()
      .then((blob)=>{

        const link = document.createElement("a");

        link.href=URL.createObjectURL(blob)
        link.download="QR code.png"
        document.body.appendChild(link)
        link.click();
        document.removeChild(link)
      })
    })

  

  }
  return (
    <>
    <div className="app-cantainer">
      <h1>QR Code Generater</h1>
      {img &&<img src={img} alt="" />}
      {lode && <p>Pleace wait..</p>}
      <div>
      <label htmlFor="dataInput" className="input-label">Data for QR code</label>
      <input type="text" id="dataInput" value={name} placeholder="Enter data for QR code" onChange={(e)=>setName(e.target.value)}/>
      <label htmlFor="dataInput"  className="input-label">Image size (e.g., 150)</label>
      <input type="text" id="sizeInput" value={size} placeholder="Image Size" onChange={(e)=>setSize(e.target.value)}/>
      <button className="generate-button" onClick={generateQr} disabled={lode}>Generate QR Code</button>
      <button className="downlode-button" onClick={downlode}>Downlode QR Code</button>
    </div>
    <p className="footer">Designed By <a href="https://stev-developer.github.io/My-Website/" target="_blank">Stephen</a></p>
    </div>
    </>

  )
}

