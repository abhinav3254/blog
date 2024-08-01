import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBlogById } from '../Services/blog';
import '../Styles/myblog.scss'; // Import your custom styles

const MyBlog = () => {
  const [visible, setVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>();

  const footerContent = (
    <div className="dialog-footer">
      <Button label="LIKE" icon="pi pi-heart" onClick={() => setVisible(false)} autoFocus />
      <Button label="DELETE" icon="pi pi-trash" onClick={() => setVisible(false)} />
    </div>
  );
  const location = useLocation()
const getBlog=()=>{
  const { id } = location.state || {}
  if(id){
getBlogById(id).then((res:any) => {
  setCurrentBlog(res.data)
  console.log(currentBlog,res)
})
.catch((err) => {
  console.log('err',err);
});
  }
}
useEffect(()=>{
  getBlog()

},[])
  const dialogContent = [
    {
      avatar: "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
      name: "Amy Elsner",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      avatar: "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
      name: "Amy Elsner",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      avatar: "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
      name: "Amy Elsner",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];

  return (<>
    {currentBlog?<> <div className="my-blog">
      <div className="my-blog__image">
      <img src={"http://localhost:8080/"+currentBlog.imageUrl} alt='Image'/>
      </div>
      <div className="my-blog__content">
        <h1 className="my-blog__title">{currentBlog?.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: currentBlog?.content }} /> 
        
        <div className="card flex justify-content-center">
          <Button label="Comments" icon="pi pi-external-link" onClick={() => setVisible(true)} />
          <Dialog visible={visible} modal style={{ width: '50rem' }} onHide={() => setVisible(false)}>
            <div className="dialog-content">
              {dialogContent.map((content, index) => (
                <div className="card-content" key={index}>
                  <div className="inline-flex align-items-center justify-content-center gap-2">
                    <Avatar image={content.avatar} shape="circle" />
                    <span className="font-bold">{content.name}</span>
                  </div>
                  <p className="m-0">
                    {content.text}
                  </p>
                  <div className="dialog-footer">
                     {footerContent}
                  </div>
                </div>
              ))}
            </div>
          </Dialog>
        </div>
      </div>
    </div></>
      :<><div className="my-blog">
      <div className="my-blog__image">
        <img src="https://media-www.sqspcdn.com/images/pages/homepage/aug-2023/grow-your-business/designed-to-sell/designed-to-sell-2-1500w.webp" alt="Blog Image" />
      </div>
      <div className="my-blog__content">
        <h1 className="my-blog__title">SUMMER SALE</h1>
        <p className="my-blog__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lorem ut ligula placerat, in dictum purus efficitur. Phasellus at condimentum felis. Nulla facilisi. Sed vitae risus ac mauris feugiat tincidunt a id odio. Fusce accumsan enim et velit feugiat, et ultricies nisl auctor. Aliquam erat volutpat. Sed sit amet vehicula leo.
        </p>
        <p className="my-blog__description">
          Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.
        </p>
        <p className="my-blog__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lorem ut ligula placerat, in dictum purus efficitur. Phasellus at condimentum felis. Nulla facilisi. Sed vitae risus ac mauris feugiat tincidunt a id odio. Fusce accumsan enim et velit feugiat, et ultricies nisl auctor. Aliquam erat volutpat. Sed sit amet vehicula leo.
        </p>
        <p className="my-blog__description">
          Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.
        </p>
        <p className="my-blog__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lorem ut ligula placerat, in dictum purus efficitur. Phasellus at condimentum felis. Nulla facilisi. Sed vitae risus ac mauris feugiat tincidunt a id odio. Fusce accumsan enim et velit feugiat, et ultricies nisl auctor. Aliquam erat volutpat. Sed sit amet vehicula leo.
        </p>
        <p className="my-blog__description">
          Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.
        </p>

        <div className="card flex justify-content-center">
          <Button label="Comments" icon="pi pi-external-link" onClick={() => setVisible(true)} />
          <Dialog visible={visible} modal style={{ width: '50rem' }} onHide={() => setVisible(false)}>
            <div className="dialog-content">
              {dialogContent.map((content, index) => (
                <div className="card-content" key={index}>
                  <div className="inline-flex align-items-center justify-content-center gap-2">
                    <Avatar image={content.avatar} shape="circle" />
                    <span className="font-bold">{content.name}</span>
                  </div>
                  <p className="m-0">
                    {content.text}
                  </p>
                  <div className="dialog-footer">
                     {footerContent}
                  </div>
                </div>
              ))}
            </div>
          </Dialog>
        </div>
      </div>
    </div></>}
    </>
  );
};

export default MyBlog;
