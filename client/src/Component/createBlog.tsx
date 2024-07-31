import React, { useState } from 'react';
import '../Styles/createBlog.scss';
import { Editor } from "primereact/editor";

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const blogData = { title, description, category, imageLink, uploadedImage };
    console.log(blogData);
    // Handle blog data submission (e.g., send to an API)
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-blog">
      <div className="background">
        <img src="https://img.freepik.com/premium-photo/soft-white-wrinkled-fabric-background_226189-1228.jpg" alt="Background" />
      </div> 
      <div className="create-blog__content">
        <div className="card">
          <h1>Create a New Blog</h1>
          <form onSubmit={handleSubmit} className="create-blog__form">
            <div className="form-group">
              <label htmlFor="title">Blog Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageUpload}
              />
              <input
                type="text"
                placeholder="Or provide an image link"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
              {previewImage && (
                <img src={previewImage} alt="Image Preview" className="image-preview" />
              )}
            </div>
            <div className="card">
              <Editor value={text} onTextChange={(e:any) => setText(e.htmlValue)} style={{ height: '320px' }} />
            </div>      
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
