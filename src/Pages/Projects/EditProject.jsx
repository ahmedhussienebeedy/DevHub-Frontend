import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
    skills: "",
    status: "open",
  });

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `http://localhost:8000/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const project = data.project;

      setFormData({
        title: project.title,
        description: project.description,
        budget: project.budget,
        deadline: project.deadline.split("T")[0],
        category: project.category,
        skills: project.skills.join(", "),
        status: project.status,
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load project");
      navigate("/client");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/api/projects/${id}`,
        {
          ...formData,
          budget: Number(formData.budget),
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project updated successfully");

      navigate("/client");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white mt-20">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Edit Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl space-y-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
        />

        <input
          type="text"
          name="skills"
          placeholder="React, Node, MongoDB"
          value={formData.skills}
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-xl font-bold"
        >
          {saving ? "Updating..." : "Update Project"}
        </button>
      </form>
    </section>
  );
}