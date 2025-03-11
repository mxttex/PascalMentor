import "../styles/Navbar.css";

function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg w-100">
        <button
  className="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarTogglerDemo03"
  aria-controls="navbarTogglerDemo03"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className="navbar-toggler-icon"></span>
</button>

        <a className="navbar-brand" href="#">
          <img src="/logo.svg" alt="PascalMentor" />
        </a>
  
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav d-flex w-100 mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link disabled" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Prenota Ripetizioni
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Visualizza Recensioni
              </a>
            </li>
            <li className="flex-grow-1"></li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-box-arrow-in-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  

export default Navbar;
