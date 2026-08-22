import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://devhub-backend-production-113b.up.railway.app/api";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  MessageCircle,
  DollarSign,
  User,
  CalendarDays,
  FolderKanban,
  Tag,
  Mail
} from "lucide-react";



export default function MyWork() {


const [projects,setProjects] = useState([]);
const [loading,setLoading] = useState(true);



useEffect(()=>{

fetchMyWork();

},[]);




const fetchMyWork = async()=>{

try{

const token = localStorage.getItem("token");


const {data} = await axios.get(

`${API_URL}/projects/my-work`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setProjects(data.projects);



}catch(error){

console.log(error);

}

finally{

setLoading(false);

}

};






if(loading){

return (

<div className="grid gap-6">


{
[1,2,3].map(item=>(

<div

key={item}

className="
h-60
rounded-3xl
bg-white/5
border
border-white/10
animate-pulse
"

/>

))

}


</div>

)

}





return (

<div className="relative">



<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.7
}}

>



<h1

className="
text-5xl
font-bold
bg-gradient-to-r
from-violet-400
to-blue-400
bg-clip-text
text-transparent
"

>

My Work 💻

</h1>



<p

className="
text-slate-400
mt-3
text-lg
"

>

Projects you are currently working on.

</p>






<div className="
mt-12
grid
gap-8
">



{
projects.length === 0 ? (


<motion.div

initial={{
opacity:0,
scale:.9
}}

animate={{
opacity:1,
scale:1
}}

className="
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-10
text-center
text-white
"

>


<FolderKanban

size={60}

className="
mx-auto
text-violet-400
"

/>



<h2 className="
text-2xl
font-bold
mt-5
">

No Active Projects

</h2>



<p className="
text-slate-400
mt-3
">

You haven't been hired yet.

</p>



</motion.div>



) : (


projects.map((project,index)=>(


<motion.div


key={project._id}


initial={{
opacity:0,
x:-50
}}


animate={{
opacity:1,
x:0
}}


transition={{
delay:index * .1
}}



whileHover={{
scale:1.02,
y:-8
}}



className="
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-8
shadow-2xl
hover:border-violet-500
transition-all
"

>
  <div className="
flex
items-center
justify-between
gap-5
flex-wrap
">


<div>

<h2 className="
text-3xl
font-bold
text-white
">

{project.title}

</h2>


</div>



<span

className="
bg-green-500/20
border
border-green-500/30
text-green-400
px-4
py-2
rounded-full
font-semibold
"

>

{project.status}

</span>


</div>






<p className="
text-slate-300
mt-5
leading-relaxed
">

{project.description}

</p>







{/* INFO CARDS */}


<div className="
grid
md:grid-cols-2
gap-4
mt-8
">





<div className="
flex
items-center
gap-4
bg-white/5
rounded-2xl
p-4
">

<DollarSign

size={24}

className="text-green-400"

/>


<div>

<p className="
text-slate-400
text-sm
">

Budget

</p>


<p className="
text-white
font-bold
">

${project.budget}

</p>


</div>


</div>








<div className="
flex
items-center
gap-4
bg-white/5
rounded-2xl
p-4
">


<User

size={24}

className="text-violet-400"

/>


<div>

<p className="
text-slate-400
text-sm
">

Client

</p>


<p className="
text-white
font-bold
">

{project.client?.name}

</p>


</div>


</div>








<div className="
flex
items-center
gap-4
bg-white/5
rounded-2xl
p-4
">


<Mail

size={24}

className="text-blue-400"

/>


<div>

<p className="
text-slate-400
text-sm
">

Email

</p>


<p className="
text-white
font-bold
">

{project.client?.email}

</p>


</div>


</div>








<div className="
flex
items-center
gap-4
bg-white/5
rounded-2xl
p-4
">


<CalendarDays

size={24}

className="text-yellow-400"

/>


<div>

<p className="
text-slate-400
text-sm
">

Deadline

</p>


<p className="
text-white
font-bold
">

{
new Date(
project.deadline
).toLocaleDateString()

}

</p>


</div>


</div>






</div>







{/* SKILLS */}



<div className="
flex
flex-wrap
gap-3
mt-8
">


{

project.skills.map((skill,index)=>(


<motion.span

key={index}


whileHover={{
scale:1.1
}}


className="
flex
items-center
gap-2
bg-violet-500/20
border
border-violet-500/30
text-violet-300
px-4
py-2
rounded-xl
text-sm
"

>


<Tag size={16}/>

{skill}


</motion.span>


))


}


</div>








{/* CHAT BUTTON */}


<div className="
mt-10
">


<motion.div

whileHover={{
scale:1.05
}}

whileTap={{
scale:.95
}}

>


<Link

to={`/project/${project._id}/chat`}


className="
flex
items-center
justify-center
gap-3
w-fit
bg-violet-600
hover:bg-violet-700
px-7
py-3
rounded-xl
text-white
font-semibold
shadow-lg
shadow-violet-500/30
transition
"

>


<MessageCircle size={22}/>


Open Chat


</Link>


</motion.div>


</div>






</motion.div>



))

)


}



</div>



</motion.div>


</div>


);

}