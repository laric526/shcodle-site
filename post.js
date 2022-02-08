const serverUrl = 'https://script.google.com/macros/s/AKfycbwD3byf7TWfnOuyZ3krKDR51ymEXqOHYwzwjgFGd-GgO_4QXvfq-v1Lkg2C-F3dnKERvw/exec'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const post = urlParams.get("post");
fetchAsync(serverUrl + '?action=getpost&post=' + post).then(data => {
  createPost(data, true);
	document.getElementById('post').removeChild(document.getElementById('loading-text'));
});

function createPost(data, root) {
  var clone = document.getElementById('post-template').content.cloneNode(true);
  var post = clone.querySelector('.post');
  post.href = 'post.html?post=' + data.result.id;
  post.querySelector('.post-title').innerHTML = data.result.title;
  post.querySelector('.post-metadata').innerHTML = 'id: ' + data.result.id + ' | time: ' + data.result.time + ' (' + timeConverter(data.result.time) + ')';
  post.querySelector('.post-content').innerHTML = data.result.content;
  post.id = 'post-' + data.result.id;
  
  data.result.comments.forEach((element, index) => {
    fetchAsync(serverUrl + '?action=getpost&post=' + element).then(data => {
			createPost(data, false);
    });
  });
	
  if (root) {
  	document.getElementById('post').appendChild(post);
  } else {
  	document.getElementById('post-' + data.result.parent).querySelector('.post-frame').appendChild(post);
  }
}

async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function timeConverter(timestamp) {
  var date = new Date(timestamp * 1000);
  var time = date.toString().split(' ').slice(0, -4).join(' ');
  return time;
}
