const username = localStorage.getItem('name');
if (!username) {
  window.location.href = '/';
  throw new Error('Username is required');
}

const lblStatusOnline = document.querySelector('#status-online');
const lblStatusOffline = document.querySelector('#status-offline');

const userNameElement = document.querySelector('#user-name');
const usersUlElement = document.querySelector('#usersList');
const form = document.querySelector('form');
const input = document.querySelector('input');
const chatElement = document.querySelector('#chat');

if (userNameElement) {
  userNameElement.textContent = username;
}

const renderUsers = (users) => {
  usersUlElement.innerHTML = '';
  users.forEach((user) => {
    const liElement = document.createElement('li');
    liElement.innerText = user.name;
    usersUlElement.append(liElement);
  });
};

const renderMessage = (payload) => {
  const { userId, message, name } = payload;

  const divElement = document.createElement('div');
  divElement.classList.add('message');

  if (userId !== socket.id) {
    divElement.classList.add('incoming');
  }

  divElement.innerHTML = message;
  chatElement.appendChild(divElement);

  chatElement.scrollTop = chatElement.scrollHeight;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value;
  input.value = '';
  socket.emit('send-message', message);
});

const socket = io({
  auth: {
    token: 'ABC-123',
    name: username,
  },
});

socket.on('connect', () => {
  lblStatusOnline.classList.remove('hidden');
  lblStatusOffline.classList.add('hidden');
});

socket.on('disconnect', () => {
  lblStatusOnline.classList.add('hidden');
  lblStatusOffline.classList.remove('hidden');
});

socket.on('welcome-message', (data) => {
  console.log(data);
});

socket.on('on-clients-changed', (users) => {
  console.log('Usuarios conectados', users);

  renderUsers(users);
});

socket.on('on-message', renderMessage);

socket.on('user-connected', (data) => {
  const { name } = data;
  const divElement = document.createElement('div');
  divElement.classList.add('message', 'incoming');
  divElement.innerText = `${name} se ha unido al chat.`;
  chatElement.appendChild(divElement);
  chatElement.scrollTop = chatElement.scrollHeight;
});
