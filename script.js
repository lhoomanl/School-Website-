// Content Data Structure
const contentData = {
    activities: [],
    achievements: [],
    campaigns: [],
    ib: []
};

// Show Content based on Category
function showContent(category) {
    const contentDiv = document.getElementById('content');
    let contentHTML = '';

    if (category === 'all') {
        for (let key in contentData) {
            contentHTML += generateContentHTML(contentData[key], key);
        }
    } else {
        contentHTML = generateContentHTML(contentData[category], category);
    }

    contentDiv.innerHTML = contentHTML;
}

function generateContentHTML(items, category) {
    let html = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
    items.forEach((item, index) => {
        html += `<div class="content-item">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            ${category === 'comments' ? '' : `<button onclick="deleteContent('${category}', ${index})">Delete</button>`}
        </div>`;
    });
    return html;
}

// Open and Close Modals
function openLoginPanel() {
    document.getElementById('adminLogin').style.display = 'flex';
}

function closeLoginPanel() {
    document.getElementById('adminLogin').style.display = 'none';
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

// Admin Login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'yaraknk' && password === 'batata4eva') {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'flex';
        updateContentList();
    } else {
        alert('Incorrect login credentials');
    }
}

// Add Content
function addContent() {
    const category = document.getElementById('categorySelect').value;
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;

    if (title && description) {
        contentData[category].push({ title, description });
        updateContentList();
        showContent('all');
    }
}

// Update Content List for Deletion
function updateContentList() {
    const list = document.getElementById('contentList');
    list.innerHTML = '';
    for (let category in contentData) {
        contentData[category].forEach((item, index) => {
            list.innerHTML += `<li>${item.title} (${category}) <button onclick="deleteContent('${category}', ${index})">Delete</button></li>`;
        });
    }
}

// Delete Content (Only for Admin)
function deleteContent(category, index) {
    contentData[category].splice(index, 1);
    updateContentList();
    showContent('all');
}

// Comment System
function submitComment() {
    const commentBox = document.getElementById('commentBox');
    const comment = commentBox.value;
    if (comment) {
        const commentHTML = `<p>${comment}</p>`;
        document.getElementById('commentsList').innerHTML += commentHTML;
        commentBox.value = '';
        alert("Hope you said something kind to make someone smile today!");
    }
}
