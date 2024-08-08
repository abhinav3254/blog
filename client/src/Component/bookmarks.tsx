import "../Styles/blog.scss";
import Blog from './blog';
const Bookmarks = () => {
    const userId = localStorage.getItem('userId') || ''
  return (
    <><div>
        <h3>My Bookmarks</h3>
        </div>
    <Blog  pageDetails = 'bookmarks'></Blog></>
  )
}

export default Bookmarks