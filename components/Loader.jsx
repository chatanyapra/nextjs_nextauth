import "./Loader.css";
const Loader = () => {
  return (
    <div id="pageloader">
        <div id="containerMainLoader">
            <div className="ringLoad"></div>
            <div className="ringLoad"></div>
            <div className="ringLoad"></div>
            <div className="ringLoad"></div>
            <div id="h3Load">loading</div>
        </div>
    </div>

  )
}

export default Loader
