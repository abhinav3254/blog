import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBlog, updateBlog } from "../Services/blog";
import "../Styles/createBlog.scss";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [description, setdescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [editBlog, setEditBlog] = useState<any>();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const navigate = useNavigate()

  const toast: any = useRef(null);
  const location = useLocation()

  useEffect(()=>{
    if(location.state){
      console.log(location.state)
      setEditBlog(location.state)
    }
    setTitle(editBlog?.title)
    setCategory(editBlog?.category)
    setdescription(editBlog?.description)
    setcontent(editBlog?.content)
    setPreviewImage("http://localhost:8080/" + editBlog?.imageUrl)

  },[editBlog])
  const showToast = (type: string, message: string) => {
    toast.current.show({ severity: type, detail: message });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData:any = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('description', description);
    if (uploadedImage) {
      formData.append('imageUrl', uploadedImage); 
    }
if(editBlog){
  updateBlog(formData,editBlog._id)
  .then((res: any) => {
    console.log("res", res);
    showToast("success", res.data.message);
   setTimeout(() => {
      navigate('/blog');
    }, 2000); 
  })
  .catch((err: any) => {
    showToast("error", err.data.message);
    console.log("err", err);
  });
}else{
  createBlog(formData)
  .then((res: any) => {
    console.log("res", res);
    showToast("success", res.data.message);
   setTimeout(() => {
      navigate('/blog');
    }, 2000); 
  })
  .catch((err: any) => {
    showToast("error", err.data.message);
    console.log("err", err);
  });
}
 
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadedImage(file);
console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const blogCategories = [
    "Technology",
    "Health & Wellness",
    "Travel",
    "Food & Drink",
    "Lifestyle",
    "Education",
    "Finance",
    "Entertainment",
    "Fashion",
    "Sports",
    "DIY & Crafts",
    "Parenting",
    "Business",
    "Personal Development",
    "News",
    "Gaming",
    "Science",
    "Politics",
    "Art & Design",
    "Books & Literature",
  ];

  return (
    <div className="create-blog">
      <div className="background">
        <img
          src="https://img.freepik.com/premium-photo/soft-white-wrinkled-fabric-background_226189-1228.jpg"
          alt="Background"
        />
      </div>
      <div className="create-blog__content">
        <div className="card">
          <h1>Create a New Blog</h1>
          <form onSubmit={handleSubmit} className="create-blog__form">
            <div className="flex">
              <div className="p-float-label title">
                <InputText
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <label htmlFor="title">Blog Title</label>
              </div>

              <div className="p-float-label CatDropdown jusitfy-content-left">
                <Dropdown
                  id="category"
                  inputId="dropdown"
                  value={category}
                  options={blogCategories}
                  optionLabel="name"
                  name="category"
                  placeholder="Select a Category"
                  className="w-full"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor="category">Category</label>
              </div>
            </div>
            <div className="p-float-label w-100">
             <InputTextarea name='description'
             required
                      value={description}  autoResize  rows={5}  
                      onChange={(e:any)=>setdescription(e.target.value)} />  
                        <label htmlFor="description">Description</label>
            </div>
            <div className="form-group">
             
              <InputText type="file" id="fileInput" onChange={handleImageUpload}  accept=".jpeg,.jpg,.png,.gif"/>
              <label htmlFor="fileInput">Upload Image</label>
              <InputText
                type="text"
                placeholder="Or provide an image link"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Image Preview"
                  className="image-preview"
                />
              )}
            </div>
            <div className="card">
              <Editor
                value={content}
                
                onTextChange={(e: any) => setcontent(e.htmlValue)}
                style={{ height: "320px" }}
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default CreateBlog;
