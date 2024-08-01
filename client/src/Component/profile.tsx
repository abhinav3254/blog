import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

import * as userService from "../Services/user";
import "../Styles/profile.scss";
let initialUserData = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  profilePicture:"",
  gender: "",
  dateOfBirth: "",
  city: "",
  country: "",
  bio: ""
};
const Profile = () => {
  const gender = ["Male", "Female"];
  const [userData,setuserData] =useState<any>(initialUserData)
  const toast:any = useRef(null);

  const showToast = (type:string,message:string) => {
      toast.current.show({ severity: type, detail: message });
  };
  const onUpload = () => {
    toast.current.show({
      severity: "Success",
      summary: "Success",
      detail: "Profile picture Uploaded !",
    });
  };
  useEffect(()=>{
    getUser()
    console.log(userData,"jn")
  },[])
  const getUser=()=>{
    let userId = localStorage.getItem('userId')
    userService.getProfile().then((res:any)=>{
      setuserData(res.data)
      if(res.data.dateOfBirth!=''){
        setuserData((prev:any)=>({...prev,['dateOfBirth']:new Date(res.data.dateOfBirth)}))
      }
    }).catch((err:any)=>{
     
    })
  }
  const handleOnchange=(e:any)=>{
const {name,value,type}  = e.target
console.log(name,value,type,e)
  setuserData((prev:any)=>({...prev,[name]:value}))
  }
  const handleSubmit=()=>{
    console.log(userData)
    userService.updatProfile(userData).then((res:any)=>{
      showToast('success',"Updated Successfully!")
    }).catch((err:any)=>{
      showToast('error',"Error!")
    })
console.log(userData)
  }
  return (
    <div className="body">
      <div className="container">
        <div className="row flexRow">
          <div className="col-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Profile picture"
                      />
                    </div>
                    <div className="card flex justify-content-center">
                      <Toast ref={toast}></Toast>
                      <FileUpload
                        mode="basic"
                        name="demo[]"
                        url="/api/upload"
                        accept="image/*"
                        maxFileSize={1000000}
                        onUpload={onUpload}
                      />
                    </div>
                    <h5 className="user-name">{userData?.username}</h5>
                    <h6 className="user-email">{userData?.email}</h6>
                  </div>
                  <div className="about">
                    <h5>About</h5>
                      <InputTextarea name='bio'
                      value={userData?.bio}  autoResize  rows={5} cols={60} 
                      onChange={(e:any)=>handleOnchange(e)} /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card h-100">
            <div className="about">
            <h5>Personal Details</h5></div>
              <div className="flexRow">
                <div className="row1">
                  <div className="flex justify-content-center ">
                    <FloatLabel>
                      <InputText id="firstName" name="firstName" value={userData?.firstName} onChange={(e:any)=>handleOnchange(e)}/>
                      <label htmlFor="firstName">First Name</label>
                    </FloatLabel>
                  </div>
                </div>
                <div className="row1">
                  <div className="flex justify-content-center ">
                    <FloatLabel>
                      <InputText id="lastName" name="lastName" value={userData?.lastName} onChange={(e:any)=>handleOnchange(e)}/>
                      <label htmlFor="lastName">Last Name</label>
                    </FloatLabel>
                  </div>
                </div>
              </div>
              <div className="flexRow">
                <div className="row1">
                  <div className="flex justify-content-center ">
                    <FloatLabel>
                      <Calendar id="dateOfBirth" name='dateOfBirth' value={userData?.dateOfBirth} onChange={(e:any)=>handleOnchange(e)}/>
                      <label htmlFor="dateOfBirth">Date of birth</label>
                    </FloatLabel>
                  </div>
                </div>
                <div className="row2">
                  <div className="flex justify-content-center p-float-label">
                    <Dropdown
                      id="gender"
                      inputId="dropdown"
                      value={userData?.gender}
                      options={gender}
                      optionLabel="name"
                      name="gender"
                      placeholder="Select a Gender"
                      className="w-full"
                      onChange={(e:any)=>handleOnchange(e)}
                    />
                    <label htmlFor="dropdown">Dropdown</label>
                  </div>
                </div>
              </div>
              <div className="flexRow">
                <div className="row1">
                  <div className="flex justify-content-center ">
                    <FloatLabel>
                      <InputText id="phoneNumber"  value={userData?.phoneNumber} name="phoneNumber" onChange={(e:any)=>handleOnchange(e)}/>
                      <label htmlFor="phoneNumber">Phone Number</label>
                    </FloatLabel>
                  </div>
                </div>
                <div className="row1">
                  <div className="flex justify-content-center ">
                    <FloatLabel>
                      <InputText id="city" name="city" value={userData?.city} onChange={(e:any)=>handleOnchange(e)}/>
                      <label htmlFor="city">City</label>
                    </FloatLabel>
                  </div>
                </div>
              </div>
              <div className="flexRow">
                <div className="row1">
                  <div className="flex justify-content-center ">
                    <FloatLabel>
                      <InputText id="country" name="country" value={userData?.country} onChange={(e:any)=>handleOnchange(e)}/>
                      <label htmlFor="country">Country</label>
                    </FloatLabel>
                  </div>
                </div>
                <div className="row1"></div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right">
                    <Button label="Cancel" className="mr-2" />
                    <Button label="Update" onClick={handleSubmit} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default Profile;
