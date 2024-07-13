document.addEventListener('DOMContentLoaded', function() {
    // Variables to hold elements and state
    let counter = document.getElementById('counter');
    let count = 0;
    let likes = {};
    let timer;
    let isPaused = false;
  
    // Function to start the timer
    function startTimer() {
      timer = setInterval(function() {
        if (!isPaused) {
          count++;
          counter.textContent = count;
        }
      }, 1000);
    }
  
    // Start the timer initially
    startTimer();
  
    // Event listeners for plus and minus buttons
    let plusButton = document.getElementById('plus');
    let minusButton = document.getElementById('minus');
  
    plusButton.addEventListener('click', function() {
      if (!isPaused) {
        count++;
        counter.textContent = count;
      }
    });
  
    minusButton.addEventListener('click', function() {
      if (!isPaused) {
        count = Math.max(0, count - 1); // Ensure count doesn't go negative
        counter.textContent = count;
      }
    });
  
    // Event listener for like button
    let likeButton = document.getElementById('heart');
  
    likeButton.addEventListener('click', function() {
      if (!isPaused) {
        if (!likes[count]) {
          likes[count] = 0;
        }
        likes[count]++;
        let likesList = document.querySelector('.likes');
        let existingLike = document.querySelector(`li[data-count="${count}"]`);
        if (existingLike) {
          existingLike.textContent = `Number ${count} has been liked ${likes[count]} times.`;
        } else {
          let li = document.createElement('li');
          li.textContent = `Number ${count} has been liked ${likes[count]} times.`;
          li.dataset.count = count;
          likesList.appendChild(li);
        }
      }
    });
  
    // Event listener for pause button
    let pauseButton = document.getElementById('pause');
    let resumeButton = document.createElement('button');
    resumeButton.textContent = 'resume';
    pauseButton.parentNode.insertBefore(resumeButton, pauseButton.nextSibling);
  
    pauseButton.addEventListener('click', function() {
      clearInterval(timer);
      isPaused = true;
      pauseButton.disabled = true;
      resumeButton.disabled = false;
      plusButton.disabled = true;
      minusButton.disabled = true;
      likeButton.disabled = true;
      document.getElementById('comment-input').disabled = true;
    });
  
    // Event listener for resume button
    resumeButton.addEventListener('click', function() {
      startTimer();
      isPaused = false;
      pauseButton.disabled = false;
      resumeButton.disabled = true;
      plusButton.disabled = false;
      minusButton.disabled = false;
      likeButton.disabled = false;
      document.getElementById('comment-input').disabled = false;
    });
  
    // Event listener for comment form submission
    let commentForm = document.getElementById('comment-form');
  
    commentForm.addEventListener('submit', function(event) {
      event.preventDefault();
      let commentInput = document.getElementById('comment-input');
      let commentText = commentInput.value.trim();
      if (commentText !== '') {
        let commentsList = document.querySelector('.comments');
        let li = document.createElement('li');
        li.textContent = commentText;
        commentsList.appendChild(li);
        commentInput.value = '';
      }
    });
  });
  