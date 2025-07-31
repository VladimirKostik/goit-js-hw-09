const form = document.querySelector('.feedback-form');

let formData = {
  message: '',
  email: '',
};

handleDOMLoad();

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

function handleFormInput(e) {
  const { name, value } = e.target;

  if (!['email', 'message'].includes(name)) return;

  formData[name] = value.trim();
  saveToLS('feedback-form-state', formData);
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill all fields please');
    return;
  }

  console.log({ ...formData });

  localStorage.removeItem('feedback-form-state');
  form.reset();
  formData = {
    message: '',
    email: '',
  };
}

function handleDOMLoad() {
  const lsData = getFromLS('feedback-form-state');
  if (lsData && typeof lsData === 'object') {
    form.elements.email.value = lsData.email || '';
    form.elements.message.value = lsData.message || '';
    formData = { ...lsData };
  }
}

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLS(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}