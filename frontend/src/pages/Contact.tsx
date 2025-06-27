import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { securePost } from "../utils/axiosClient";
import { AxiosError } from "axios";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  interface ContactFormData {
    fullName: string;
    email: string;
    message: string;
  }

  // interface Feedback {
  //   type: string;
  //   message: string;
  // }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });
    setLoading(true);

    try {
      await securePost("/contact", formData);

      setFeedback({ type: "success", message: "Message sent successfully!" });
      setFormData({ fullName: "", email: "", message: "" });
    } catch (err) {
      if (err instanceof AxiosError) {
        setFeedback({
          type: "error",
          message:
            err?.response?.data?.error ||
            err?.message ||
            "Something went wrong.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex relative flex-col min-h-screen bg-gray-50">
      <div
        className="absolute left-4 top-6 text-sm flex items-center gap-1 cursor-pointer hover:bg-blue-100 hover:text-blue-600 py-2 px-4 hover:rounded-md transition-colors duration-300 group"
        onClick={() => navigate("/")}
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-all duration-300"
        />
        Back to Home
      </div>

      <section className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-sm:pt-20">
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-8 text-center">
            Get in Touch with NjangiHub
          </h2>

          {feedback.message && (
            <div
              className={`mb-6 text-center py-3 px-4 rounded-lg ${
                feedback.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            {/* Message */}
            <div className="sm:col-span-2 flex flex-col">
              <label htmlFor="message" className="text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} NAAS. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default ContactPage;
