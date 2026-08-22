import { motion } from "framer-motion";
import { useAuth } from "../../Context/AuthContext";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Globe
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);


  const [formData,setFormData] = useState({
    email:"",
    password:"",
  });



  const handleChange=(e)=>{

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{

      setLoading(true);


      const {data}=await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );


      const currentUser = await login(data);



      if(currentUser?.role==="client"){

        navigate("/client");

      }

      else if(currentUser?.role==="freelancer"){

        navigate("/freelancer");

      }

      else{

        navigate("/");

      }



    }catch(error){

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

    finally{

      setLoading(false);

    }

  };



return (

<section

className="
relative
min-h-screen
overflow-hidden
bg-slate-950
flex
items-center
justify-center
px-5
py-12
"


>



{/* Background Glow */}


<div

className="
absolute
-top-40
-left-40
w-96
h-96
bg-violet-600
rounded-full
blur-[150px]
opacity-30
animate-pulse
"

/>



<div

className="
absolute
bottom-0
right-0
w-96
h-96
bg-blue-600
rounded-full
blur-[150px]
opacity-20
"

/>






<motion.div


initial={{
opacity:0,
y:70
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:.7
}}


className="
relative
z-10
w-full
max-w-md
"


>



<div

className="
bg-white/5
backdrop-blur-2xl
border
border-white/10
rounded-3xl
p-8
shadow-2xl
hover:border-violet-500/50
transition-all
"


>



<div className="flex items-center gap-3">


<Sparkles

className="text-violet-400"

size={30}

/>



<h1

className="
text-4xl
font-bold
bg-gradient-to-r
from-violet-400
to-blue-400
bg-clip-text
text-transparent
"

>

Welcome Back 👋

</h1>


</div>



<p

className="
text-slate-400
mt-3
"

>

Login to continue building amazing projects.

</p>
<form 
onSubmit={handleSubmit}
className="
mt-10
space-y-6
"
>


{/* Email */}

<div>


<label
className="
text-slate-300
mb-2
block
"
>

Email

</label>



<div className="relative">


<Mail

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-500
"

size={20}

/>



<motion.input

whileFocus={{
scale:1.02
}}

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Enter your email"


className="
w-full
bg-white/5
border
border-white/10
rounded-xl
py-3
pl-12
pr-4
text-white
placeholder:text-slate-500
outline-none
focus:border-violet-500
transition
"

/>


</div>


</div>






{/* Password */}


<div>


<label

className="
text-slate-300
mb-2
block
"

>

Password

</label>




<div className="relative">


<Lock

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-500
"

size={20}

/>



<motion.input


whileFocus={{
scale:1.02
}}



type={
showPassword
?
"text"
:
"password"
}



name="password"



value={formData.password}



onChange={handleChange}



placeholder="Enter your password"



className="
w-full
bg-white/5
border
border-white/10
rounded-xl
py-3
pl-12
pr-12
text-white
placeholder:text-slate-500
outline-none
focus:border-violet-500
transition
"



/>




<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-slate-400
hover:text-white
transition
"

>


{
showPassword
?
<EyeOff size={20}/>
:
<Eye size={20}/>
}


</button>



</div>


</div>







{/* Options */}


<div

className="
flex
items-center
justify-between
text-sm
"

>


<label

className="
flex
items-center
gap-2
text-slate-400
"

>


<input

type="checkbox"

/>


Remember me


</label>




<Link

to="/forgot-password"

className="
text-violet-400
hover:text-violet-300
"

>

Forgot Password?

</Link>


</div>







{/* Login Button */}


<motion.button


type="submit"



disabled={loading}



whileHover={{
scale:1.05
}}



whileTap={{
scale:.95
}}



className="
w-full
flex
items-center
justify-center
gap-3
bg-gradient-to-r
from-violet-600
to-blue-600
hover:from-violet-700
hover:to-blue-700
py-3
rounded-xl
font-semibold
text-white
shadow-lg
shadow-violet-500/30
transition
disabled:opacity-50
"



>



{
loading
?
<>

<div

className="
w-5
h-5
border-2
border-white
border-t-transparent
rounded-full
animate-spin
"

/>

Logging in...

</>

:

"Login"

}



</motion.button>



</form>






{/* Divider */}


<div className="relative my-8">


<div className="
border-t
border-white/10
">


</div>



<span

className="
absolute
left-1/2
-translate-x-1/2
-top-3
bg-slate-950
px-4
text-slate-400
"

>

OR

</span>


</div>







{/* Google Button */}



<motion.button

whileHover={{
scale:1.03
}}

whileTap={{
scale:.97
}}

className="
w-full
flex
items-center
justify-center
gap-3
border
border-white/10
bg-white/5
backdrop-blur-xl
py-3
rounded-xl
text-white
hover:bg-white/10
transition
"

>


<Globe size={20}/>


Continue with Google


</motion.button>



<p

className="
text-center
mt-8
text-slate-400
"

>

Don't have an account?


<Link

to="/register"

className="
text-violet-400
ml-2
hover:text-violet-300
"

>

Register

</Link>


</p>


</div>


</motion.div>


</section>


);


}