import "../styles/ProvHomePage.css";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

function ProvHomePage() {
  return (
    <div className="container-fluid w-100">
      <div className="d-flex flex-column align-items-center text-center">
        <div>
          <a href="https://vite.dev" target="_blank">
            <img
              src={viteLogo}
              className="logo spinning-image unselectable"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className="logo react spinning-image unselectable"
              alt="React logo"
            />
          </a>
        </div>
        <h1>React</h1>
        <p className="read-the-docs">PascalMentor will soon be available...</p>
      </div>
    </div>
  );
}

export default ProvHomePage
