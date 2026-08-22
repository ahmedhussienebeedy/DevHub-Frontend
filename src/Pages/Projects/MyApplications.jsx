import { useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

import {
  Briefcase,
  DollarSign,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  Hourglass
} from "lucide-react";



export default function MyApplications() {


const [applications,setApplications] = useState([]);
const [loading,setLoading] = useState(true);




useEffect(()=>{

fetchApplications();

},[]);





const fetchApplications = async()=>{


try{


const token = localStorage.getItem("token");


const { data } = await axios.get(
  "https://devhub-backend-production-113b.up.railway.app/api/applications/my-applications",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


setApplications(data.applications);



}catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};







return (

<div>


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



<h1 className="
text-5xl
font-bold
bg-gradient-to-r
from-violet-400
to-blue-400
bg-clip-text
text-transparent
">

My Applications

</h1>



<p className="
text-slate-400
mt-3
text-lg
">

Track your submitted proposals.

</p>








<div className="
mt-12
grid
gap-8
">





{
loading ? (


[1,2,3].map(item=>(


<div

key={item}

className="
h-64
rounded-3xl
bg-white/5
border
border-white/10
animate-pulse
"

/>


))


) : applications.length===0 ? (



<motion.div

initial={{
scale:.9,
opacity:0
}}

animate={{
scale:1,
opacity:1
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


<Briefcase

size={60}

className="
mx-auto
text-violet-400
"

/>



<h3 className="
text-2xl
font-bold
mt-5
">

No Applications Yet

</h3>



<p className="
text-slate-400
mt-3
">

Start applying to projects.

</p>



</motion.div>



) : (



applications.map((app,index)=>(


<motion.div


key={app._id}


initial={{
opacity:0,
x:-40
}}


animate={{
opacity:1,
x:0
}}


transition={{
delay:index*.1
}}



whileHover={{
scale:1.02,
y:-6
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
justify-between
items-center
flex-wrap
gap-5
">





<div>

<h2 className="
text-3xl
font-bold
text-white
">

{app.project?.title}

</h2>


</div>







<span

className={`
flex
items-center
gap-2
px-4
py-2
rounded-full
font-semibold
text-sm

${
app.status==="accepted"

?
"bg-green-500/20 text-green-400 border border-green-500/30"

:

app.status==="rejected"

?

"bg-red-500/20 text-red-400 border border-red-500/30"

:

"bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"

}

`}

>



{
app.status==="accepted"

?
<CheckCircle size={16}/>

:

app.status==="rejected"

?

<XCircle size={16}/>

:

<Hourglass size={16}/>

}



{app.status}


</span>




</div>










<div className="
grid
md:grid-cols-3
gap-4
mt-8
">





<div className="
bg-white/5
rounded-2xl
p-4
flex
items-center
gap-3
">


<DollarSign

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

${app.project?.budget}

</p>


</div>


</div>








<div className="
bg-white/5
rounded-2xl
p-4
flex
items-center
gap-3
">


<DollarSign

className="text-violet-400"

/>


<div>

<p className="
text-slate-400
text-sm
">

Your Offer

</p>


<p className="
text-white
font-bold
">

${app.price}

</p>


</div>


</div>








<div className="
bg-white/5
rounded-2xl
p-4
flex
items-center
gap-3
">


<Clock

className="text-blue-400"

/>


<div>

<p className="
text-slate-400
text-sm
">

Delivery

</p>


<p className="
text-white
font-bold
">

{app.deliveryTime} days

</p>


</div>


</div>





</div>








<div className="
mt-8
bg-white/5
rounded-2xl
p-5
">


<div className="
flex
items-center
gap-2
text-white
font-semibold
mb-3
">


<FileText size={20}/>

Your Proposal


</div>



<p className="
text-slate-300
leading-relaxed
">

{app.coverLetter}

</p>



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