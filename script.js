// Content Data Structure
const contentData = {
    home: [],
    activities: [],
    achievements: [],
    campaigns: [],
    ib: [],
    reflection: []
};

function showContent(category) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = contentData[category].map(
        (item) => `<div><h3>${item.title}</h3><p>${item.description}</p></div>`
    ).join('') || `<p>No content available for ${category}.</p>`;
}

function openAdminPanel() {
    document.getElementById('adminPanel').style.display = 'flex';
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

function addContent() {
    const category = document.getElementById('categorySelect').value;
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    if (title && description) {
        contentData[category].push({ title, description });
        localStorage.setItem('contentData', JSON.stringify(contentData));
        showContent(category);
    }
}

function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentsList = document.getElementById('commentsList');
    if (commentInput.value) {
        const newComment = document.createElement('p');
        newComment.textContent = commentInput.value;
        commentsList.appendChild(newComment);
        commentInput.value = '';
    }
}

window.onload = function() {
    const savedData = localStorage.getItem('contentData');
    if (savedData) {
        Object.assign(contentData, JSON.parse(savedData));
    }
    showContent('home');
};
