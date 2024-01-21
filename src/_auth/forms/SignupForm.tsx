import { Button } from "@/components/ui/button";
import { SignupValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount , useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
    const {toast}=useToast();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const navigate = useNavigate();
    //query
    const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();
   const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    });

    const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
        try {
          const newUser = await createUserAccount(user);
    
          if (!newUser) {
            toast({ title: "Sign up failed. Please try again.", });
            
            return;
          }
    
          const session = await signInAccount({
            email: user.email,
            password: user.password,
          });
    
          if (!session) {
            toast({ title: "Something went wrong. Please login your new account", });
            
            navigate("/sign-in");
            
            return;
          }
    
          const isLoggedIn = await checkAuthUser();
    
          if (isLoggedIn) {
            form.reset();
    
            navigate("/");
          } else {
            toast({ title: "Login failed. Please try again.", });
            
            return;
          }
        } catch (error) {
          console.log({ error });
        }
      };

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="logo" />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    To use Snapgram, please enter your details
                </p>

                <form onSubmit={form.handleSubmit(handleSignup)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" className="shad-input" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" className="shad-input" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" className="shad-input" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" className="shad-input" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary mt-3">
                        {isCreatingAccount || isSigningInUser || isUserLoading ?  (
                            <div className="flex-center gap-2">
                                <Loader /> Loading...
                            </div>
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Already have an account?{" "}
                        <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default SignupForm;
