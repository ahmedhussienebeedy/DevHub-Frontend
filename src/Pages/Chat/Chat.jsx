import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

export default function Chat() {

  const { id } = useParams();

  const { user } = useAuth();


  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");



  useEffect(() => {

    fetchProject();
    fetchMessages();

  }, []);





  const fetchProject = async () => {

    try {

      const { data } = await axios.get(
        `http://localhost:8000/api/projects/${id}`
      );


      setProject(data.project);


    } catch(error){

      console.log(error);

    }

  };





  const fetchMessages = async () => {

    try {

      const token = localStorage.getItem("token");


      const { data } = await axios.get(
        `http://localhost:8000/api/messages/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      setMessages(data.messages);


    } catch(error){

      console.log(error);

    }

  };






  const sendMessage = async () => {

    if(!text.trim()) return;


    if(!project) return;



    try {

      const token = localStorage.getItem("token");



      const receiverId =
        user.role === "client"
          ? project.freelancer
          : project.client._id;



      const { data } = await axios.post(

        "http://localhost:8000/api/messages",

        {
          projectId: id,
          receiverId,
          message: text,
        },

        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }

      );



      console.log(data);



      setMessages((prev)=>[
        ...prev,
        data.data,
      ]);



      setText("");



    } catch(error){

      console.log(error);

    }

  };






  return (

    <div className="max-w-4xl mx-auto">


      <div className="bg-slate-900 rounded-2xl p-6">


        <h1 className="text-3xl font-bold mb-6">
          Project Chat 💬
        </h1>





        <div className="h-[450px] overflow-y-auto space-y-3">



          {
            messages.map((msg)=>(

              <div
                key={msg._id}
                className="bg-slate-800 p-4 rounded-xl"
              >

                <p className="font-bold">
                  {msg.sender?.name}
                </p>


                <p className="text-slate-300">
                  {msg.message}
                </p>


              </div>

            ))
          }



        </div>






        <div className="flex gap-3 mt-5">


          <input

            value={text}

            onChange={(e)=>setText(e.target.value)}

            placeholder="Write message..."

            className="flex-1 bg-slate-800 rounded-xl px-4 py-3"

          />



          <button

            onClick={sendMessage}

            className="bg-violet-600 hover:bg-violet-700 px-6 rounded-xl"

          >

            Send

          </button>



        </div>



      </div>


    </div>

  );

}