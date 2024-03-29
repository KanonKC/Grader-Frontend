import { FileDown } from "lucide-react";
import { RuntimeResult } from "../types/apis/Problem.api";
import { TestcaseModel } from "../types/models/Problem.model";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./shadcn/Accordion";
import { Badge } from "./shadcn/Badge";
import { Label } from "./shadcn/Label";
import { Textarea } from "./shadcn/Textarea";

const minimizer = (text: string | null): string => {
	const LIMIT = 250;

	if (!text) return "";

	if (text.length > LIMIT) {
		return text.slice(0, LIMIT) + ` ... (${text.length - LIMIT} more)`;
	}
	return text;
};

const downloadTextfile = (filename: string, text: string | null) => {
	if (!text) return;

	const element = document.createElement("a");
	const file = new Blob([text], { type: "text/plain" });
	element.href = URL.createObjectURL(file);
	element.download = filename;
	document.body.appendChild(element); // Required for this to work in FireFox
	element.click();
};

const DownloadMiniButton = ({...args}:{
	className?: string;
	onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}) => {
	return (
		<p  className="flex items-center cursor-pointer hover:text-green-500" {...args}><FileDown size={16} className="mr-1" /> Download .txt</p>
	)
}

const TestcaseValidationInstance = ({
	value,
	inputValue,
	outputValue,
	status,
}: {
	value: string;
	inputValue: string;
	outputValue: string | null;
	status: string;
}) => {
	// const [inputValue, setInputValue] = useState("1 2 3");
	// const [outputValue, setOutputValue] = useState("Hello World!");

	// useEffect(() => {
	// 	console.log(inputValue, outputValue, status);
	// }, [outputValue]);

	return (
		<AccordionItem value={value}>
			<AccordionTrigger>
				Testcase #{value}
				{status === "OK" ? (
					<Badge className="bg-green-500">OK</Badge>
				) : status === "ERROR" ? (
					<Badge className="bg-gray-500">ERROR</Badge>
				) : status === "TIMEOUT" ? (
					<Badge className="bg-yellow-400">TIMEOUT</Badge>
				) : (
					<Badge className="bg-red-400">FAILED</Badge>
				)}
			</AccordionTrigger>
			<AccordionContent>
				<div className="flex gap-5 px-1">
					<div className="w-1/2">
						<div className="flex justify-between">
							<Label>Input</Label>
							<DownloadMiniButton onClick={() => downloadTextfile("input.txt", inputValue)}/>
						</div>
						<Textarea
							rows={minimizer(inputValue)?.split("\n").length}
							readOnly
							className="mt-1 font-mono cursor-pointer"
							value={minimizer(inputValue)}
							onClick={() =>
								navigator.clipboard.writeText(inputValue)
							}
						/>
					</div>
					<div className="w-1/2">
					<div className="flex justify-between">
							<Label>Output</Label>
							<DownloadMiniButton onClick={() => downloadTextfile("output.txt", outputValue)}/>
						</div>
						<Textarea
							rows={minimizer(outputValue)?.split("\n").length}
							readOnly
							className="mt-1 font-mono cursor-pointer"
							value={minimizer(outputValue)}
							onClick={() =>
								navigator.clipboard.writeText(outputValue ?? "")
							}
						/>
						
					</div>
					{/* <div className="w-2/12">
						<Label>Runtime Status</Label>
						<p
							className={`text-xl font-bold text-${
								TestcaseStatusIndicatorColor[
									status as TestcaseGradingResultStatus
								]
							}`}
						>
							{status}
						</p>
					</div> */}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

const TestcaseValidationAccordian = ({
	runtimeResults = [],
}: {
	runtimeResults?: RuntimeResult[] | TestcaseModel[];
}) => {
	return (
		<Accordion type="multiple">
			{runtimeResults?.map((result, index) => (
				<TestcaseValidationInstance
					key={index}
					value={String(index + 1)}
					inputValue={result.input}
					outputValue={result.output}
					status={
						result.runtime_status ? result.runtime_status : "OK"
					}
				/>
			))}
		</Accordion>
	);
};

export default TestcaseValidationAccordian;
