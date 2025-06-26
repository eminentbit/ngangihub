import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import { Mail, Lock, ArrowLeft } from "lucide-react";
// import SocialBtnLogin from "../components/social.btn.login";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ErrorPopup from "../components/error";
import { toast } from "react-hot-toast";

// Define Zod schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const toastShown = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const invitToken = params.get("inviteToken");
    console.log("Invitation Token from login:", invitToken); // token will be use to redirect user to dashboard if already exists
    if (params.get("alreadyAccepted") === "1" && !toastShown.current) {
      toastShown.current = true; //Avoid toast from showing multiple times
      toast.success("You already have an account. Please log in.", {
        position: "top-right",
      });

      // Remove the param from the URL
      params.delete("alreadyAccepted");
      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true }
      );
    }
  }, [location.search, location.pathname, navigate]);

  // Auto-hide error after 6 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isError } = useLogin(setError);

  const onSubmit = async (data: LoginFormData) => {
    return new Promise<void>((resolve, reject) => {
      mutate(data, {
        onSuccess: () => resolve(),
        onError: () => reject(),
      });
    });
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      {/* Error Popup */}
      {error && <ErrorPopup error={error} onClose={() => setError(null)} />}
      <div
        className="absolute left-4 top-6 text-sm flex items-center gap-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 py-2 px-4 hover:rounded-md transition duration-300 group"
        onClick={() => navigate("/")}
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition duration-300"
        />
        Back to Home
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-2xl relative"
      >
        <h2 className="mb-3 text-3xl font-bold text-center text-blue-700">
          Welcome Back to NjangiHub
        </h2>
        <div className="text-center text-gray-600 mb-6">
          Please Login to access your account
        </div>

        {/* <SocialBtnLogin /> */}

        {/* <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div> */}
        <div>{isError ?? "An error occured"}</div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-blue-500 hover:text-blue-700 underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <input
                type="password"
                id="password"
                placeholder="*********"
                className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            className="mb-2"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader />
                <span className="ml-2">Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
