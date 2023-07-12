async function newFormHandler(event) {
  event.preventDefault();
  const blog_title = document.querySelector('#blog_title').value;
  const content = document.querySelector('#content').value;
  
  
  const response = await fetch(`/api/blog`, {
    method: 'POST',
    body: JSON.stringify({
      blog_title,
      content
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //if the dish is added, the 'all' template will be rerendered
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add dish');
  }
}

document
.querySelector('.blog-form')
.addEventListener('submit', newFormHandler);
  