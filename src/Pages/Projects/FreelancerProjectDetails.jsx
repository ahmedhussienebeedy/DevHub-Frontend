import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function FreelancerProjectDetails() {

  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [coverLetter, setCoverLetter] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const [message, setMessage] = useState("");



  useEffect(() => {
    fetchProject();
  }, []);



  const fetchProject = async () => {

    try {

      const { data } = await axios.get(
        `http://localhost:8000/api/projects/${id}`
      );

      setProject(data.project);


    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  };





  const applyProject = async (e) => {

    e.preventDefault();


    try {

      const token = localStorage.getItem("token");


      const { data } = await axios.post(

        `http://localhost:8000/api/applications/${id}`,

        {
          coverLetter,
          price,
          deliveryTime,
        },

        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }

      );


      setMessage(data.message);

      setCoverLetter("");
      setPrice("");
      setDeliveryTime("");


    } catch(error){

      setMessage(
        error.response?.data?.message || "Something went wrong"
      );

    }

  };





  if(loading){

    return (
      <p className="text-slate-400">
        Loading...
      </p>
    );

  }




  if(!project){

    return (
      <p>
        Project not found
      </p>
    );

  }





  return (

    <div className="max-w-4xl mx-auto">


      <div className="bg-slate-900 rounded-2xl p-8">


        <div className="flex justify-between">


          <h1 className="text-4xl font-bold">
            {project.title}
          </h1>


          <span className="bg-violet-600 px-4 py-2 rounded-full">
            {project.status}
          </span>


        </div>




        <p className="text-slate-400 mt-5">
          {project.description}
        </p>




        <div className="mt-6 space-y-3">


          <p>
            <b>Budget:</b> ${project.budget}
          </p>


          <p>
            <b>Category:</b> {project.category}
          </p>


          <p>
            <b>Client:</b> {project.client?.name}
          </p>


          <p>
            <b>Deadline:</b>{" "}
            {new Date(project.deadline).toLocaleDateString()}
          </p>


        </div>




        <div className="flex flex-wrap gap-2 mt-6">

          {
            project.skills.map((skill,index)=>(

              <span
                key={index}
                className="bg-slate-800 px-3 py-1 rounded-lg"
              >
                {skill}
              </span>

            ))
          }

        </div>




        {/* Chat Button */}

        <Link
          to={`/project/${project._id}/chat`}
          className="inline-block mt-6 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl"
        >
          Chat 💬
        </Link>



      </div>






      {/* Apply Form */}

      <div className="bg-slate-900 rounded-2xl p-8 mt-8">


        <h2 className="text-2xl font-bold mb-5">
          Submit Proposal
        </h2>




        {
          message && (

            <p className="mb-4 text-green-400">
              {message}
            </p>

          )
        }





        <form
          onSubmit={applyProject}
          className="space-y-5"
        >



          <textarea

            value={coverLetter}

            onChange={(e)=>setCoverLetter(e.target.value)}

            placeholder="Write your proposal..."

            className="w-full bg-slate-800 rounded-xl p-4"

            rows="5"

            required

          />




          <input

            type="number"

            value={price}

            onChange={(e)=>setPrice(e.target.value)}

            placeholder="Your price"

            className="w-full bg-slate-800 rounded-xl p-4"

            required

          />




          <input

            type="number"

            value={deliveryTime}

            onChange={(e)=>setDeliveryTime(e.target.value)}

            placeholder="Delivery time (days)"

            className="w-full bg-slate-800 rounded-xl p-4"

            required

          />





          <button

            className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl"

          >
            Apply Now
          </button>




        </form>


      </div>


    </div>

  );

}