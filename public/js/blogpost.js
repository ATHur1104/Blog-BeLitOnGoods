async function newFormHandler(event) {
  console.log("inside new form handler");
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();
  
  if (title && content) {

    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //if the dish is added, the 'all' template will be rerendered
    if (response.ok) {
      document.location.replace('/');
    } 
    else {
      alert('Failed to add blog post!');
    }
  }
}

document
.querySelector('.blog-form')
.addEventListener('submit', newFormHandler);
