
import { Label } from "reactstrap";
import Container from "../components/Layout/Container";
import { Input } from "../components/shadcn/components/ui/input";
import { 
	Card,
	CardHeader ,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter
} from "../components/shadcn/components/ui/card";
import { Button } from "../components/shadcn/components/ui/button";

// import { getAuthorization, login } from "../services/auth.service";

const Login = () => {
	

	return (
		<Container>
			<div className="w-[50%] mx-auto">

			<div className="bg-zinc-950 dark:bg-white">
				<h1>Test</h1>
			</div>


			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Login</CardTitle>
					{/* <CardDescription>
					Enter your email below to create your account
					</CardDescription> */}
				</CardHeader>
				<CardContent className="grid gap-4">
					
					
					<div className="grid gap-2">
					<Label>Username</Label>
					<Input/>
					</div>
					<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" />
					</div>
		  
				</CardContent>
				<CardFooter>
					<Button color="" className="w-full">Login</Button>
				</CardFooter>
			</Card>

			</div>

		</Container>
	);
};

export default Login;
