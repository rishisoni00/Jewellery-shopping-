const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const fullNameInput = document.getElementById('fullName');
const contactInput = document.getElementById('contactInfo');
const createBtn = document.getElementById('createRoyalBtn');
const statusMsg = document.getElementById('statusMsg');
const modal = document.getElementById('royalModal');

createBtn.addEventListener('click', async () => {
  const fullName = fullNameInput.value.trim();
  const contact = contactInput.value.trim();

  if (!fullName || !contact) {
    statusMsg.innerText = 'Fill all fields';
    return;
  }

  createBtn.innerText = 'Creating...';
  createBtn.disabled = true;

  let email = contact;
  let phone = null;

  if (!contact.includes('@')) {
    email = `${contact}@royalcollection.com`;
    phone = contact;
  }

  const password = `Royal@${Date.now()}`;

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, phone }
    }
  });

  if (error) {
    statusMsg.innerText = error.message;
    createBtn.innerText = 'Create Royal Account';
    createBtn.disabled = false;
  } else {
    statusMsg.innerText = `Welcome ${fullName}`;
    modal.style.display = 'none';
  }
});
