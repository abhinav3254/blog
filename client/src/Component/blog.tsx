
import { Paginator } from 'primereact/paginator';
import { useEffect, useState } from 'react';
import { FaBookmark, FaHeart } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBlogById, getBlogs } from '../Services/blog';
import '../Styles/blog.scss';

const Blog = () => {


  const navigate = useNavigate()

  const handleCardClick = (id:any) => {
    if(id){
      navigate('/myblog',{state:{id}})
    }
   
  };
  const[blogs,setBlogs]=useState<any>()
  const[currentPage,setcurrentPage]=useState<any>(1)
  const[totalPages,setTotalPages]=useState<any>(0)
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  const onPageChange = (event:any) => {
      setFirst(event.first);
      setRows(event.rows);
  };

  const location = useLocation()
  useEffect(()=>{
    const { id } = location.state || {}
    if(id){
      getAllByIdBlogs(id)
    }else{
      getAllByAllBlogs()
    }
    
  },[])
  
  const getAllByIdBlogs=(id:any)=>{
    getBlogById(id,currentPage).then((res:any) => {
      console.log(res)
      setBlogs(res.data.blogs)
      setTotalPages(res.data.totalPages)
      console.log(blogs)
    })
    .catch((err) => {
      // showToast('error',err.data.message)
      console.log('err',err);
    });
  }
const getAllByAllBlogs=()=>{
  getBlogs(currentPage).then((res:any) => {
    console.log(res)
    setBlogs(res.data.blogs)
    setTotalPages(res.data.totalPages)
    console.log(blogs)
  })
  .catch((err) => {
    // showToast('error',err.data.message)
    console.log('err',err);
  });
}
  return (
    <div className="blog">
   
      {
blogs&&blogs.map((blog:any)=>{
  return(<div className="blog-card" onClick={()=>{handleCardClick(blog._id)}}>
        <section className="blog-section">
          <div className="blog-section__content">
            <h2>{blog.title}</h2>
            {/* <div dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
            {blog.description}
            <div className="blog-section__footer">
              <button className="view-more">View More</button>
              <button className="heart-button">
                <FaHeart />
              </button>
              <button className="bookmark-button">
                <FaBookmark />
              </button>
            </div>
          </div>
          <div className="blog-section__image">
            <div className="background-image"></div>
            <img src={"http://localhost:8080/"+blog.imageUrl} alt='Image'/>
          </div>
        </section>
      </div>)
})
      }
      <div className="blog-card" >
        <section className="blog-section">
          <div className="blog-section__content">
            <h2>Heading 1</h2>
            <p> Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
            <p> Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
            <p> Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
            <div className="blog-section__footer">
              <button className="view-more">View More</button>
              <button className="heart-button">
                <FaHeart />
              </button>
              <button className="bookmark-button">
                <FaBookmark />
              </button>
            </div>
          </div>
          <div className="blog-section__image">
            <div className="background-image"></div>
            <img src="https://www.brandignity.com/wp-content/uploads/2020/12/digital-marketing-photography.jpg" alt="Image 1" />
          </div>
        </section>
      </div>

      <div className="blog-card" >
        <section className="blog-section blog-section--reverse">
          <div className="blog-section__content">
            <h2>Heading 2</h2>
            <p>Description for the second section. This text will be on the left side with the image on the right.Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.Morbi ac eros eu elit volutpat dictum.interdum pretium a nec dolor.Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
            <div className="blog-section__footer">
              <button className="view-more">View More</button>
              <button className="heart-button">
                <FaHeart />
              </button>
              <button className="bookmark-button">
                <FaBookmark />
              </button>
            </div>
          </div>
          <div className="blog-section__image">
            <div className="background-image"></div>
            <img src="https://cdn-ffcgi.nitrocdn.com/ZhDYBbXPoHrCHvLPGOdQmXKAjZXwoPng/assets/images/optimized/rev-bea8d4d/jamesmaherphotography.com/wp-content/uploads/2020/01/City-Urban-landscape-Photography-25.jpg" alt="Image 2" />
          </div>
        </section>
      </div>

      <div className="blog-card" >
        <section className="blog-section">
          <div className="blog-section__content">
            <h2>Heading 3</h2>
            <p>Description for the third section. This text will be on the right side with the image on the left.Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
            <div className="blog-section__footer">
              <button className="view-more">View More</button>
              <button className="heart-button">
                <FaHeart />
              </button>
              <button className="bookmark-button">
                <FaBookmark />
              </button>
          </div>
          </div>
          <div className="blog-section__image">
            <div className="background-image"></div>
            <img src="https://cdn-ffcgi.nitrocdn.com/ZhDYBbXPoHrCHvLPGOdQmXKAjZXwoPng/assets/images/optimized/rev-bea8d4d/jamesmaherphotography.com/wp-content/uploads/2020/01/City-Urban-landscape-Photography-26.jpg" alt="Image 3" />
          </div>
        </section>
      </div>

      <div className="blog-card" >
        <section className="blog-section blog-section--reverse">
          <div className="blog-section__content">
            <h2>Heading 4</h2>
            <p>Description for the second section. This text will be on the left side with the image on the right.Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.Morbi ac eros eu elit volutpat dictum.interdum pretium a nec dolor.Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
            <div className="blog-section__footer">
              <button className="view-more">View More</button>
              <button className="heart-button">
                <FaHeart />
              </button>
              <button className="bookmark-button">
                <FaBookmark />
              </button>
            </div>
          </div>
          <div className="blog-section__image">
            <div className="background-image"></div>
            <img src="https://wallpapers.com/images/hd/lakeside-car-full-desktop-screen-hd-ffduevjvagzqhrhy.jpg" alt="Image 2" />
          </div>
        </section>
      </div>
      <div className="card">
            <Paginator first={first} rows={rows} totalRecords={totalPages}
            //  rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange} />
        </div>
      {/* <div  className='btn-container'>
      <Button onClick={()=>{setcurrentPage(currentPage-1);getAllByAllBlogs()}} disabled={currentPage==1}>previous page</Button>
      <div className='page-Num'>{currentPage}</div>
      <Button onClick={()=>{setcurrentPage(currentPage+1);getAllByAllBlogs()}} disabled={currentPage>=totalPages}>Next page</Button>
      </div> */}
    </div>
  );
};

export default Blog;
