import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { Ref, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filter, login, logout } from "../appSlice";
import userDp from "../assets/userDp.png";
import { RootState } from "../store";
import "../Styles/style.scss";
const Header = () => {
  const loggedIn = useSelector((state: RootState) => state.App.loggedIn);
  const searchValue = useSelector((state: RootState) => state.App.searchValue);
  const dispatch = useDispatch();
  const profileBar: Ref<any> = useRef(null);
  return (
    <div className="header">
      <div className="name">
        <h3><Link to={"/Home"}>Blog</Link></h3>
      </div>
      <div className="filter">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText v-model="va" placeholder="Search" onChange={(e)=>dispatch(filter(e.target.value))} />
        </IconField>
      </div>
      {loggedIn ?<>
      <div className="profileSec">
         <Button label="Create +" />
        <div className="profile" onClick={(e) => profileBar.current.toggle(e)}>
          <img src={userDp} alt="profile" />
        </div>
      </div>
      
      <OverlayPanel ref={profileBar} className="profileOverlay">
        <div className="nav"><Link to={"/profile"}>Profile</Link></div>
        <div className="nav">My Posts</div>
        <div className="nav">Settings</div>
        <div className="nav"  onClick={(e)=>dispatch(logout())}>Sign Out</div>
      </OverlayPanel></>:
      <>
      <div className="profileSec">
       <Button label="Sign In" />
       <Button label="Login" onClick={(e)=>dispatch(login())}/>
       </div>
      </>
      }
    </div>
  );
};

export default Header;
