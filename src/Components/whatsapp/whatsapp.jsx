import wa from "../images/wa.png"

export default function Whatsapp(){
    return(
        <div className="whatsapp">
           <a target="_blank" href="https://wa.me/5492615326802" rel="noreferrer" ><img className="wa" src={wa} alt="escribinos" /></a> 
        </div>
    )
}