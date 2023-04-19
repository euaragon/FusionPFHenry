
import mode from "../images/mode.png"

export default function DarkMode(props){
    return(
        <div className="dark-btn">
           <a href="#" onClick={props.toggleDarkMode}><img src={mode} alt="modo claro / modo oscuro" /></a> 
        </div>
    )
}