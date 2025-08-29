 
    const form=document.getElementById('loginForm');
    const user=document.getElementById('user');
    const pass=document.getElementById('pass');
    const otp=document.getElementById('otp');
    const userError=document.getElementById('userError');
    const passError=document.getElementById('passError');
    const otpError=document.getElementById('otpError');
    const lockoutMsg=document.getElementById('lockoutMsg');
    const switchMode=document.getElementById('switchMode');
    const loginMode=document.getElementById('loginMode');
    const passwordFields=document.getElementById('passwordFields');
    const otpFields=document.getElementById('otpFields');

    let isOtp=false;
    let attempts=0;
    const maxAttempts=3;

    switchMode.addEventListener('click',()=>{
      isOtp=!isOtp;
      if(isOtp){
        passwordFields.style.display='none';
        otpFields.style.display='block';
        loginMode.textContent='Login with OTP';
        switchMode.textContent='Use Password Instead';
      }else{
        passwordFields.style.display='block';
        otpFields.style.display='none';
        loginMode.textContent='Login with Password';
        switchMode.textContent='Use OTP Instead';
      }
    });

    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      if(attempts>=maxAttempts){lockoutMsg.textContent='Too many failed attempts. Account locked.';return;}

      let valid=true;
      userError.textContent=''; passError.textContent=''; otpError.textContent='';

      if(user.value.trim()===''){userError.textContent='Enter account or email';valid=false;}
      if(isOtp){
        if(!/^\d{6}$/.test(otp.value)){otpError.textContent='Enter 6-digit OTP';valid=false;}
      }else{
        if(pass.value.length<6){passError.textContent='Password must be at least 6 characters';valid=false;}
      }

      if(!valid)return;

      // mock auth check
      if((!isOtp && pass.value==='neon123')||(isOtp && otp.value==='654321')){
        alert('Welcome neon warrior ✨');
        lockoutMsg.textContent='';
        attempts=0;
      }else{
        attempts++;
        if(attempts>=maxAttempts){
          lockoutMsg.textContent='Too many failed attempts. Account locked.';
        }else{
          if(isOtp){otpError.textContent='Invalid OTP';}else{passError.textContent='Invalid password';}
        }
      }
    });
  