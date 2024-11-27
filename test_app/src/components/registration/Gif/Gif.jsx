import Giff from "../../../assets/man_walking.gif";
import "./Gif.css";
function Gif() {
  return (
    <div className="gif-wrapper">
      <div className="gif">
        <img src={Giff} alt="" style={{ width: "150px", height: "300px" }} />
      </div>
    </div>
  );
}

export default Gif;
