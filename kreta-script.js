import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// YAHAN DALNA HAI - YAHAN DALNA HAI - YAHAN DALNA HAI
const SUPABASE_URL = 'https://enjdvhldvejmcvkxeqhz.supabase.co/rest/v1/'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuamR2aGxkdmVqbWN2a3hlcWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwOTE0NjUsImV4cCI6MjEwMzY2NzQ2NX0.q14CWfBas4OF5opauxveUBocjCty4wNVrxILohBt5d8'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const msg = document.getElementById('msg')

tPhone.onclick=()=>{
  tPhone.classList.add('active'); tEmail.classList.remove('active'); tGoogle.classList.remove('active')
  phoneBox.classList.remove('hide'); emailBox.classList.add('hide'); googleBox.classList.add('hide')
}
tEmail.onclick=()=>{
  tEmail.classList.add('active'); tPhone.classList.remove('active'); tGoogle.classList.remove('active')
  emailBox.classList.remove('hide'); phoneBox.classList.add('hide'); googleBox.classList.add('hide')
}
tGoogle.onclick=()=>{
  tGoogle.classList.add('active'); tPhone.classList.remove('active'); tEmail.classList.remove('active')
  googleBox.classList.remove('hide'); phoneBox.classList.add('hide'); emailBox.classList.add('hide')
}

sendOtp.onclick=async()=>{
  let p=phone.value.trim()
  if(!p.startsWith('+')) p='+91'+p.replace(/ /g,'')
  const {error}=await supabase.auth.signInWithOtp({phone:p})
  if(error) msg.innerText=error.message
  else{msg.innerText='OTP bhej diya!'; otp.classList.remove('hide'); verifyOtp.classList.remove('hide')}
}
verifyOtp.onclick=async()=>{
  let p=phone.value.trim()
  if(!p.startsWith('+')) p='+91'+p.replace(/ /g,'')
  const {error}=await supabase.auth.verifyOtp({phone:p, token:otp.value, type:'sms'})
  if(error) msg.innerText=error.message
  else checkUser()
}

signupEmail.onclick=async()=>{
  const {error}=await supabase.auth.signUp({
    email:email.value, password:pass.value,
    options:{data:{full_name:name.value}}
  })
  msg.innerText=error?error.message:'SignUp Done! Ab Sign In karo'
}
signinEmail.onclick=async()=>{
  const {error}=await supabase.auth.signInWithPassword({email:email.value, password:pass.value})
  if(error) msg.innerText=error.message
  else checkUser()
}

googleBtn.onclick=async()=>{
  await supabase.auth.signInWithOAuth({provider:'google', options:{redirectTo:location.href}})
}

logout.onclick=async()=>{await supabase.auth.signOut(); location.reload()}

async function checkUser(){
  const {data:{user}}=await supabase.auth.getUser()
  if(user){
    authBox.classList.add('hide'); homeBox.classList.remove('hide')
    welcome.innerText='Welcome '+(user.user_metadata.full_name || user.email || user.phone)
    info.innerText=user.email || user.phone
  }
}
checkUser()
