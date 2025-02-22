import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Home() {
  const [movies, setMovies] = useState([]);
  const [display, setDisplay] = useState(true);
  const [massage, setMassage] = useState("");
  const [title, setTitle] = useState("");
  const [overview, setOverView] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [userSign, setUserSign] = useState({
    emailAddress: "",
    userName: "",
    password: "",
  });
  const [email, setEmail] = useState(false);
  const [name, setName] = useState(false);
  const [password, setPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [errorMassage,setErrorMassage] = useState(false);

  const [userLogin,setUserLogin] = useState({userName:"",password:""});
  const [loginUserName,setLoginUserName] = useState(false);
  const [loginPassword,setLoginPassword] = useState(false);
  const [errorMassageLogin,setErrorMassageLogin] = useState(false);

  const navigate = useNavigate("");

  const api_key = "0a59508dccbd6c2679bfddba17699cf0";
  const api = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`;

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results);
          handleImage(
            `https://image.tmdb.org/t/p/w500${data.results[19].poster_path}`
          );
          handleTitle(data.results[19].title);
          handleOverView(data.results[19].overview);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function handleImage(childMessage) {
    document.getElementById(
      "background"
    ).style.backgroundImage = `url(${childMessage})`;
    setMassage(childMessage);
  }
  function handleTitle(title) {
    setTitle(title);
  }
  function handleOverView(view) {
    setOverView(view);
  }
  function handleView() {
    setDisplay(false);
  }
  function handleclose() {
    setDisplay(true);
  }
  function signUpDetails() {
    setSignUp(true);
  }
  function handleSignUpClose() {
    setSignUp(false);
    setLogin(false);
  }
  function handleLogin() {
    setLogin(true);
  }

  function handleSignUpChange() {
    let hasError = false;

    if (userSign.emailAddress === "") {
      setEmail(true);
      hasError = true;
    } else {
      setEmail(false);
    }

    if (userSign.userName === "") {
      setName(true);
      hasError = true;
    } else {
      setName(false);
    }

    if (userSign.password === "") {
      setPassword(true);
      hasError = true;
    } else {
      setPassword(false);
    }

    if(hasError){
      setLoading(false);
      return;
    }

    if(userSign.emailAddress !== "a.g.gobalakrishnan@gmail.com" || userSign.userName !== "gobalakrishnan" || userSign.password !== "230520003"){
      setErrorMassage(true);
      setLoading(false);
    }else{
      setErrorMassage(false);
      navigate("/api")
      setLoading(true)
    }

  }


  function handleLoginChange() {
    let hasError = false;

    if (userLogin.userName === "") {
        setLoginUserName(true);
        hasError = true;  // Should be set to true when there's an error
    } else {
        setLoginUserName(false);
    }

    if (userLogin.password === "") {
        setLoginPassword(true);
        hasError = true;  // Should be set to true when there's an error
    } else {
        setLoginPassword(false);
    }

    // If there are validation errors, stop the process
    if (hasError) {
        setLoading(false);
        return;
    }

    // Validate credentials
    if (userLogin.userName !== "gobalakrishnan" || userLogin.password !== "230520003") {
        setErrorMassageLogin(true);
    } else {
        setErrorMassageLogin(false);
        setLoading(true); // Start loading before navigating
        navigate("/api");
    }
    }

   

  return (
    <>
      <div style={{ width: "100%", overflow: "hidden" }} id="background">
        {signUp && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.81)",
              width: "100%",
              height: "100%",
              zIndex: 1,
              position: "fixed",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                width: 300,
                position: "fixed",
                marginTop: 30,
                padding: 30,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2>Sign up</h2>
                <span
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={handleSignUpClose}
                >
                  &times;
                </span>
              </div>
              <label style={{ display: "block", marginTop: 30 }}>
                Email address
              </label>
              <input
                type="email"
                style={{
                  padding: 10,
                  width: "93%",
                  marginTop: 5,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                }}
                value={userSign.emailAddress}
                onChange={(e) =>
                  setUserSign((pre) => {
                    console.log({ ...pre, emailAddress: e.target.value })
                    return { ...pre, emailAddress: e.target.value }
                  })
                }
              ></input>
              {email && <p style={{ color: "red" }}>Email is required</p>}
              <label style={{ display: "block", marginTop: 20 }}>
                Username
              </label>
              <input
                type="text"
                style={{
                  padding: 10,
                  width: "93%",
                  marginTop: 5,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                }}
                value={userSign.userName}
                onChange={(e) => setUserSign((pre) => {
                  console.log({ ...pre, userName: e.target.value })
                  return { ...pre, userName: e.target.value }
                })}
              ></input>
              {name && <p style={{ color: "red" }}>Username is required</p>}
              <label style={{ display: "block", marginTop: 20 }}>
                Password
              </label>
              <input
                type="password"
                style={{
                  padding: 10,
                  width: "93%",
                  marginTop: 5,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  display: "block",
                }}
                value={userSign.password}
                onChange={(e) => setUserSign((pre) => {
                  console.log({ ...pre, password: e.target.value })
                  return { ...pre, password: e.target.value }
                })}
              ></input>
              {password && <p style={{ color: "red" }}>Password is required</p>}
              <input
                type="checkbox"
                style={{ marginTop: 20, display: "inline-block" }}
              ></input>
              <p style={{ display: "inline-block", marginLeft: 10 }}>
                I do not want to receive emails
              </p>
              {loading && <p style={{textAlign:"center",}}>Loading ...</p>}
              {errorMassage && <p style={{color:"red"}}>Invalid email,username or password</p>}
              <div style={{ borderBottom: "1px solid #ccc", padding: 20 }}>
                <button disabled={loading} className="signUp"
                  style={{
                    backgroundColor: "violet",
                    paddingTop: 10,
                    paddingBottom: 10,
                    width: "100%",
                    color: "#FFFFFF",
                    border: "none",
                    marginTop: 20,
                    borderRadius: 30,
                  }}
                  onClick={handleSignUpChange}
                >
                  Sign Up
                </button>
              </div>
              <p style={{ paddingTop: 20 }}>Or signup using your account</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <GoogleOAuthProvider clientId="976265445835-vs940jjvvlhvuur4bkb2bf7herk5c0n8.apps.googleusercontent.com">
                 <GoogleLogin
                    onSuccess={(response) => console.log(response)}
                    onError={() => console.log("Login Failed")}
                 />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
        )}
        {login && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.81)",
              width: "100%",
              height: "100%",
              zIndex: 1,
              position: "fixed",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                width: 300,
                position: "fixed",
                marginTop: 30,
                padding: 30,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2>Login</h2>
                <span
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={handleSignUpClose}
                >
                  &times;
                </span>
              </div>
              <label style={{ display: "block", marginTop: 30 }}>
                Username
              </label>
              <input value={userLogin.userName} onChange={(e)=>setUserLogin((prev)=>{
                return {...prev,userName:e.target.value}
              })}
                type="text"
                style={{
                  padding: 10,
                  width: "93%",
                  marginTop: 5,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                }}
              ></input>
              {loginUserName && <p style={{color:"red"}}>Username is required</p>}
              <label style={{ display: "block", marginTop: 20 }}>
                Password
              </label>
              <input value={userLogin.password} onChange={(e)=>setUserLogin((prev)=>{
                return {...prev,password:e.target.value}
              })}
                type="password"
                style={{
                  padding: 10,
                  width: "93%",
                  marginTop: 5,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  display: "block",
                }}
              ></input>
              {loginPassword && <p style={{color:"red"}}>Password is required</p>}
              <input
                type="checkbox"
                style={{ marginTop: 20, display: "inline-block" }}
              ></input>
              <p style={{ display: "inline-block", marginLeft: 10 }}>
                remember me
              </p>
              {loading && <p style={{textAlign:"center"}}>Loading ...</p>}
              {errorMassageLogin && <p style={{color:"red"}}>Invalid username or password</p>}
              <div style={{ borderBottom: "1px solid #ccc", padding: 20 }}>
                <button onClick={handleLoginChange} disabled={loading} className="signUp"
                  style={{
                    backgroundColor: "violet",
                    paddingTop: 10,
                    paddingBottom: 10,
                    width: "100%",
                    color: "#FFFFFF",
                    border: "none",
                    marginTop: 20,
                    borderRadius: 30,
                  }}
                >
                  Login
                </button>
              </div>
              <p style={{ paddingTop: 20 }}>Or login using your account</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <GoogleOAuthProvider clientId="976265445835-vs940jjvvlhvuur4bkb2bf7herk5c0n8.apps.googleusercontent.com">
                 <GoogleLogin
                    onSuccess={(response) => console.log(response)}
                    onError={() => console.log("Login Failed")}
                 />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "black",
            padding: "15px",
            marginTop: 10,
            marginRight: "50px",
            marginLeft: "50px",
            borderRadius: "5px",
          }}
        >
          <div style={{ display: "flex" }}>
            <h2 style={{ color: "#FFFFFF" }}>MOVI</h2>
            <h2 style={{ color: "orange" }}>ZONE</h2>
          </div>
          <ul
            style={{ display: "flex", listStyleType: "none", gap: "30px" }}
            className="ul"
          >
            <li>
              <Link to={"/"} style={{ color: "orange" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/"}>Movies</Link>
            </li>
            <li>
              <Link to={"/"}>TV Shows</Link>
            </li>
            <li>
              <Link to={"/"}>Anime</Link>
            </li>
            <li>
              <Link to={"/"}>Series</Link>
            </li>
            <li>
              <Link to={"/"}>Trending</Link>
            </li>
          </ul>
          <div style={{ display: "flex", gap: 10, marginRight: 20 }}>
            <button
              onClick={() => handleLogin()}
              style={{
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 20,
                paddingLeft: 20,
                border: "1px solid #FFFFFF",
                background: "transparent",
                color: "#FFFFFF",
                borderRadius: "5px",
              }}
            >
              Login
            </button>
            <button className="signUp"
              onClick={() => signUpDetails()}
              style={{
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 20,
                paddingLeft: 20,
                color: "#FFFFFF",
                borderRadius: "5px",
                backgroundColor: "violet",
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 50,
          }}
        >
          <div style={{ width: 600 }}>
            <h1 style={{ fontSize: 40, color: "#FFFFFF" }}>{title}</h1>
            <p style={{ color: "#FFFFFF", marginTop: 10 }}>{overview}</p>
            <button onClick={signUpDetails}
              style={{
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 50,
                paddingLeft: 50,
                color: "#FFFFFF",
                borderRadius: "5px",
                backgroundColor: "violet",
                border: "none",
                marginTop: 40,
              }}
            >
              <a
                style={{ textDecoration: "none", color: "#ccc" }}
              >
                Watch
              </a>
            </button>
          </div>
          <div>
            <img
              src="icons8-play-30.png"
              style={{ position: "relative", left: 90, bottom: 60 }}
            ></img>
            <img
              id="image"
              src={massage}
              style={{
                border: "1px solid #FFFFFF",
                width: 150,
                height: 150,
                borderRadius: 10,
              }}
            ></img>
          </div>
        </div>
      </div>
      <div className="Treanding">
        <div
          style={{ backgroundColor: "black", padding: 50, overflow: "hidden" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "#FFFFFF" }}>TRENDING NOW</h1>
            {display ? (
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#ccc",
                }}
                onClick={handleView}
              >
                View All
                <img
                  src="icons8-double-right-24.png"
                  style={{ width: 10, height: 10 }}
                ></img>
              </button>
            ) : (
              <button
                onClick={handleclose}
                style={{
                  background: "transparent",
                  color: "#FFFFFF",
                  border: "none",
                }}
              >
                Close
              </button>
            )}
          </div>
          <div
            style={{
              overflow: "hidden",
              display: `${display ? "flex" : "inline-block"}`,
            }}
          >
            {movies.map((movie, i) => (
              <div style={{ display: "inline-block" }} className="img">
                <p
                  style={{
                    color: "#FFFFFF",
                    position: "relative",
                    textAlign: "center",
                    width: 239,
                    top: 379,
                    left: 5,
                    backdropFilter: "blur(10px)",
                    paddingBottom: 50,
                    paddingTop: 50,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  {movie.title}
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  key={i}
                  style={{
                    width: "239px",
                    margin: 5,
                    borderRadius: 5,
                  }}
                  onClick={signUpDetails}
                ></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
