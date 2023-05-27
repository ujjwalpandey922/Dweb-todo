import "./sidebar.css";
import close from "../../assets/closing icon.png";
import toggle from "../../assets/toggle.png";
import language from "../../assets/Language.png";
import avatar from "../../assets/avatar.jpeg";
import home from "../../assets/Category-home.png";
import sec1 from "../../assets/sec1.png";
import sec2 from "../../assets/sec2.png";
import sec3 from "../../assets/sec3.png";
const SideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        <div className="sidebar-personal-info">
          <div className="personal-details">
            <img src={avatar} alt="Avatar" />
            <span>NAME</span>
          </div>
          <img src={close} alt="close" />
        </div>
        <div className="sidebar-sections">
          <li>
            <img src={home} alt="home" />
            <span>Home</span>
          </li>
          <li>
            <img src={sec1} alt="home" />
            <span>Section 1</span>
          </li>
          <li>
            <img src={sec2} alt="home" />
            <span>Section 2</span>
          </li>
          <li className="selected">
            <img src={sec3} alt="home" />
            <span>Section 3</span>
          </li>
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer-buttons">
          <button className=" sidebar-footer-buttons-info">
            <img src={avatar} alt="" />
            $0.90
          </button>
          <button className=" sidebar-footer-buttons-buy">Buy $XYZ</button>
        </div>
        <div className="sidebar-footer-logos">
          <img
            src={language}
            alt=""
            className="sidebar-footer-logos-language"
          />
          <img src={toggle} alt="" className="sidebar-footer-logos-toggle" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
