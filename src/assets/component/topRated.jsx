import { useEffect, useState} from "react";

function TopRated({setMassage,setTitle,setOverView,setSignUp}) {
  const [movies, setMovies] = useState([]);
  const [display,setDisplay] = useState(true);

  const api_key = "0a59508dccbd6c2679bfddba17699cf0";
    const api = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`;
  
    useEffect(() => {
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          if (data.results) {
            setMovies(data.results);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
  
  
  function handleView(){
    setDisplay(false)
  }
  function handleclose(){
    setDisplay(true);
  }
  function handleImage(childMessage) {
    document.getElementById(
      "background"
    ).style.backgroundImage = `url(${childMessage})`;
    setMassage(childMessage);
  }
  function handleTitle(title) {
    setTitle(title);
  }
  function handleOverView(view){
    setOverView(view)
  }
  function signUpDetails(){
    setSignUp(true);
  }
  return (
    <>
      <div style={{ backgroundColor: "black", padding: 50,overflow:"hidden" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#FFFFFF" }}>TOP RATED</h1>
          {display ? <button
            style={{ border: "none", background: "transparent", color: "#ccc" }}
           onClick={handleView}>
            View All
            <img
              src="icons8-double-right-24.png"
              style={{ width: 10, height: 10 }}
            ></img>
          </button> : <button onClick={handleclose} style={{background:"transparent",color:"#FFFFFF",border:"none"}}>Close</button>}
        </div>
        <div style={{overflow:"hidden",display:`${display ? "flex" : "inline-block"}`}}>
            {movies.map((movie,i)=>(
              <figure style={{display:'inline-block'}}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} key={i} style={{width:"239px",margin:5,borderRadius:5,marginTop:20}} onClick={()=>{handleImage(
                      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    );
                    handleTitle(movie.title);
                    handleOverView(movie.overview);}} className="img"></img>
                <figcaption style={{color:"#FFFFFF",textAlign:"center",width:239,}}>{movie.title}</figcaption>
              </figure>
            ))}
        </div>
      </div>
    </>
  );
}

export default TopRated;
