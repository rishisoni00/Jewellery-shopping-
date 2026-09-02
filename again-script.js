// --- YAHAN APNI KEYS DALO - Data API wali ---
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co'; // tumhara API URL
const SUPABASE_ANON_KEY = 'YOUR_ANON_OR_PUBLISHABLE_KEY'; // eyJ... ya sb_publishable_... wali

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
    statusMsg.innerText = 'Please fill Full Name and Mobile/Email';
    statusMsg.style.color = 'red';
    return;
  }

  createBtn.innerText = 'Creating...';
  createBtn.disabled = true;
  statusMsg.innerText = 'Please wait...';

  // Mobile hai ya Email, usko handle karo
  let email = contact;
  let phone = null;

  if (!contact.includes('@')) {
    // Mobile number hai to usko dummy email banao
    email = `${contact}@royalcollection.com`;
    phone = contact;
  }

  // Random strong password banao
  const password = `Royal@${contact.slice(-4)}_${Date.now()}`;

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
        original_contact: contact
      }
    }
  });

  if (error) {
    statusMsg.innerText = 'Error: ' + error.message;
    statusMsg.style.color = 'red';
    createBtn.innerText = 'Create Royal Account';
    createBtn.disabled = false;
  } else {
    statusMsg.innerText = `Welcome ${fullName}! Account Created`;
    statusMsg.style.color = 'lightgreen';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 1500);
    console.log('User created:', data);
  }
});
