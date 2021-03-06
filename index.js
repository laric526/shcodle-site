const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const post = urlParams.get("post");
fetchAsync('https://script.google.com/macros/s/AKfycbwD3byf7TWfnOuyZ3krKDR51ymEXqOHYwzwjgFGd-GgO_4QXvfq-v1Lkg2C-F3dnKERvw/exec?action=getrecentposts').then(data => {
	document.getElementById('posts').removeChild(document.getElementById('loading-text'));
  data.result.forEach((element, index) => {
  	var clone = document.getElementById('post-template').content.cloneNode(true);
    var post = clone.querySelector('.post');
    post.href = 'post.html?post=' + element.id;
    post.querySelector('.post-title').innerHTML = element.title;
    post.querySelector('.post-metadata').innerHTML = 'id: ' + element.id + ' | time: ' + element.time + ' (' + timeConverter(element.time) + ')';
    document.getElementById('posts').appendChild(post);
  });
});

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
