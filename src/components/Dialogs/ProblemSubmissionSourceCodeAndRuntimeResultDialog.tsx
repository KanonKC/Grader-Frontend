import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../shadcn/Dialog";
import { Maximize2 } from "lucide-react";
import { Button } from "../shadcn/Button";
import { SubmissionPopulateSubmissionTestcaseAndAccountModel } from "../../types/models/Submission.model";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import TestcaseValidationAccordian from "../TestcaseValidationAccordion";
import { Separator } from "../shadcn/Seperator";
import { ScrollArea } from "../shadcn/ScrollArea";
import { ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel } from "../../types/models/Problem.model";

const ProblemSubmissionSourceCodeAndRuntimeResultDialog = ({
	submission,
	children,
  problem
}: {
	submission: SubmissionPopulateSubmissionTestcaseAndAccountModel;
	children?: React.ReactNode;
  problem: ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel
}) => {
	const [sourceCode, setSourceCode] = React.useState<string>(
		submission.submission_code
	);

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className="max-w-[96%]">
				<div className="flex">
					<div className="w-1/2">
						<MonacoEditor
							theme="vs-dark"
							// height="35vh"
							value={sourceCode}
							onChange={() =>
								setSourceCode(submission.submission_code)
							}
							language={submission.language}
						/>
					</div>

					<div className="mx-3">
						<Separator orientation="vertical" />
					</div>

					<div className="w-1/2">
						<ScrollArea className=" h-[60vh] pr-5">
							<TestcaseValidationAccordian
								runtimeResults={submission.runtime_output.map((output,index) => ({
                  ...output,
                  input: problem.testcases[index].input
                }))}
							/>
						</ScrollArea>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProblemSubmissionSourceCodeAndRuntimeResultDialog;
