var myPostsEl = document.getElementById('myBlogPosts');
var myCommentsEl = document.getElementById('myComments');

var myPostsFlag = false;
var myCommentsFlag = false;

function selector(event) {
  if (event.target.id === 'myBlogPosts') {
    myPostsFlag = !myPostsFlag;
    myCommentsFlag = false;
  } else if (event.target.id === 'myComments') {
    myCommentsFlag = !myCommentsFlag;
    myPostsFlag = false;
  }
  
  console.log(event.target.id);
  console.log("PostFlag", myPostsFlag);
  console.log("CommentFlag", myCommentsFlag);
  
  
}

myPostsEl.addEventListener('click', selector);
myCommentsEl.addEventListener('click', selector);