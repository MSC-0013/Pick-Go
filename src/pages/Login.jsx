import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    if (isLoading) {
      let current = 0;
      const interval = setInterval(() => {
        current += Math.floor(Math.random() * 8) + 5;
        setProgress(current >= 100 ? 100 : current);
        if (current >= 100) clearInterval(interval);
      }, 100);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login successful!",
          description: "Welcome back to RentCars",
        });

        setTimeout(() => {
          if (email === "admin@gmail.com") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        toast({
          title: "Login failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Car className="h-8 w-8" />
            <span className="text-2xl font-bold">Pick</span>
            <span className="text-2xl font-bold">&</span>
            <span className="text-2xl font-bold">Go</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded-xl overflow-hidden relative bg-blue-600 text-white font-semibold transition duration-300 hover:bg-blue-700"
              >
                {isLoading ? (
                  <div className="absolute inset-0 bg-transparent flex items-center justify-center z-10">
                    <span className="z-20">
                      {progress < 100
                        ? `Signing in... ${progress}%`
                        : "Redirecting..."}
                    </span>
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500 animate-none transition-all duration-200 ease-in-out"
                      style={{
                        width: `${progress}%`,
                        borderRadius: "0.75rem",
                      }}
                    />
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
