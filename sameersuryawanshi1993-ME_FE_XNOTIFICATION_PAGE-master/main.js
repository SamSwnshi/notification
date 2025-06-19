const notifications = window.data || data; 
const list = document.getElementById('list');
const counter = document.querySelector('.notifications-counter');
const markAllBtn = document.querySelector('.mark-all-button');


let unreadIndexes = new Set([0, 1, 2]);

function renderNotifications() {
  list.innerHTML = '';
  notifications.forEach((notif, idx) => {
    const li = document.createElement('li');
    li.classList.add('notification-item');
    if (unreadIndexes.has(idx)) {
      li.classList.add('new-notification');
    }

    // Avatar
    const avatar = document.createElement('img');
    avatar.src = notif.img;
    avatar.alt = notif.info.name;
    avatar.className = 'notification-avatar';
    li.appendChild(avatar);

    // Info container (required by assessment)
    const infoDiv = document.createElement('div');
    infoDiv.className = 'notification-infos';

    // Inline notification text
    const textDiv = document.createElement('div');
    textDiv.className = 'notification-text';

    // Name (profile link, bold)
    const nameLink = document.createElement('a');
    nameLink.href = '#';
    nameLink.className = 'profile-link';
    nameLink.innerHTML = `<strong>${notif.info.name}</strong>`;
    textDiv.appendChild(nameLink);

    // Action
    const actionSpan = document.createElement('span');
    actionSpan.className = 'notification-action';
    actionSpan.textContent = ` ${notif.info.action} `;
    textDiv.appendChild(actionSpan);

    // Post name (if any, bold)
    if (notif.info.postName) {
      const postLink = document.createElement('a');
      postLink.href = '#';
      postLink.className = 'notification-link-post';
      postLink.innerHTML = `<strong>${notif.info.postName}</strong>`;
      textDiv.appendChild(postLink);
    }

    infoDiv.appendChild(textDiv);

    // Time (below text)
    const timeDiv = document.createElement('div');
    timeDiv.className = 'notification-time';
    timeDiv.textContent = notif.info.time;
    infoDiv.appendChild(timeDiv);

    // Private message (if any)
    if (notif.info.privateMessage) {
      const pmDiv = document.createElement('div');
      pmDiv.className = 'notification-text-private-message';
      pmDiv.textContent = notif.info.privateMessage;
      pmDiv.style.display = 'none';
      infoDiv.appendChild(pmDiv);
      // Click to toggle private message
      li.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'a') return;
        pmDiv.style.display = pmDiv.style.display === 'none' ? 'block' : 'none';
        if (unreadIndexes.has(idx)) {
          unreadIndexes.delete(idx);
          renderNotifications();
        }
      });
    } else {
      li.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'a') return;
        if (unreadIndexes.has(idx)) {
          unreadIndexes.delete(idx);
          renderNotifications();
        }
      });
    }

    li.appendChild(infoDiv);

    // Notification picture (if any)
    if (notif.info.picture) {
      const pic = document.createElement('img');
      pic.src = notif.info.picture;
      pic.alt = 'Notification related';
      pic.className = 'notification-picture';
      li.appendChild(pic);
    }

    // Dot for unread (at the end)
    if (unreadIndexes.has(idx)) {
      const dot = document.createElement('span');
      dot.className = 'notification-dot';
      dot.title = 'Unread';
      li.appendChild(dot);
    }

    list.appendChild(li);
  });
  // Update counter
  counter.textContent = unreadIndexes.size;
  counter.style.display = 'inline-block';
}

// Mark all as read
markAllBtn.addEventListener('click', function () {
  unreadIndexes.clear();
  renderNotifications();
});

// Initial render
renderNotifications();
