import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import SocialBtnLogin from "../components/social.btn.login";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";

// Define Zod schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
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

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
    // Proceed with login logic (API call, auth, etc.)
  };

  return (
    <section className="flex relative items-center justify-center min-h-screen bg-gray-50 p-6">
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
      <div className="w-full max-w-md p-4 rounded-md shadow-xl sm:p-8 max-sm:mt-20">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Welcome Back to NAAS
        </h2>

        {/* Social Login */}
        <SocialBtnLogin />

        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="relative mt-1">
                <Mail
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="form-input pl-10"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Link to="/forget-password" className="text-xs underline text-blue-500 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1">
                <Lock size={18} className="form-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="*********"
                  className="form-input pl-10"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" fullWidth disabled={isSubmitting}>
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
      </div>
    </section>
  );
}
