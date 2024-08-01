import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { Ref, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { filter, login, logout } from "../appSlice";
import logo from '../assets/logo.svg';
import userDp from "../assets/userDp.png";
import { RootState } from "../store";
import "../Styles/header.scss";

const Header = () => {
  const loggedIn =  useSelector((state: RootState) => state.App.loggedIn);
  // localStorage.getItem('userId')!=undefined
  const userId =  useSelector((state: RootState) => state.App.userId);
  const searchValue = useSelector((state: RootState) => state.App.searchValue);
  const dispatch = useDispatch();
  const profileBar: Ref<any> = useRef(null);
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
console.log(loggedIn,"login")

if(localStorage.getItem('userId')!=undefined){
  dispatch(login({usedId:localStorage.getItem('userId')}))
}
  },[loggedIn])
  return (
    <div className="header">
      <div className="name">
        <img src={logo} alt="Blog Logo" className="logo__image" />
        <h3><Link to={"/"}>Blogify</Link></h3>
      </div>
      <div className="filter">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText v-model="va" placeholder="Search" onChange={(e)=>dispatch(filter(e.target.value))} />
        </IconField>
      </div>
      {loggedIn ? <>
      <div className="profileSec">
         <Button label="BLOGS"  onClick={()=>navigate('/blog')} />
         <Button label="CREATE +"  onClick={()=>navigate('/create')} />
        <div className="profile" onClick={(e) => profileBar.current.toggle(e)}>
          <img src={userDp} alt="profile" />
        </div>
      </div>
      
      <OverlayPanel ref={profileBar} className="profileOverlay">
        <div className="nav" onClick={()=>navigate('/profile')}>Profile</div>
        <div className="nav" onClick={()=>navigate('/blog',{state:{userId}})}>My Posts</div>
        <div className="nav" onClick={()=>navigate('/myblog')}>Bookmarks</div>
        <div className="nav">Settings</div>
        <div className="nav"  onClick={(e)=>dispatch(logout())}>Sign Out</div>
      </OverlayPanel></>:
      <>
      <div className="profileSec">
      {location.pathname!='/login' &&<Button label="LOG IN" onClick={()=>navigate('/login')}/>}
       <Button label="GET STARTED" onClick={()=>navigate('/signup')}/>
       </div>
      </>
      }
    </div>
  );
};

export default Header;
