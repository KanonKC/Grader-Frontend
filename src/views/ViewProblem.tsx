import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import ProblemViewLayout, {
	OnSubmitProblemViewLayoutCallback,
} from "../components/ProblemViewLayout";
import NavbarMenuLayout from "../layout/NavbarMenuLayout";
import { ProblemService } from "../services/Problem.service";
import { SubmissionService } from "../services/Submission.service";
import { ProblemPoplulateCreatorModel } from "../types/models/Problem.model";
import {
	GetSubmissionByAccountProblemResponse,
	SubmissionPopulateSubmissionTestcasesSecureModel
} from "../types/models/Submission.model";



const ViewProblem = () => {
	const navigate = useNavigate();
	const { problemId } = useParams();
	const accountId = String(localStorage.getItem("account_id"));

	const [selectedLanguage, setSelectedLanguage] = useState("python");
	const [problem, setProblem] = useState<ProblemPoplulateCreatorModel>();

	const [grading, setGrading] = useState<boolean>(false);
	const [submitCodeValue, setSubmitCodeValue] = useState<any>("");

	const [previousSubmissions, setPreviousSubmissions] =
		useState<GetSubmissionByAccountProblemResponse>();
	const [lastedSubmission, setLastedSubmission] =
		useState<SubmissionPopulateSubmissionTestcasesSecureModel>();

	const handleSelectPreviousSubmission = (submissionId: string) => {
		let submission = null;
		if (
			submissionId === previousSubmissions?.best_submission?.submission_id
		) {
			submission = previousSubmissions?.best_submission;
		} else {
			previousSubmissions?.submissions?.forEach((sub) => {
				if (sub.submission_id === submissionId) {
					submission = sub;
					return;
				}
			});
		}

		if (submission) {
			setSubmitCodeValue(submission.submission_code);
			setLastedSubmission(submission);
			setSelectedLanguage(submission.language);
		}
	};

	useEffect(() => {
		ProblemService.get(String(problemId)).then((response) => {
			setProblem(response.data);
		});

		SubmissionService.getByAccountProblem(
			accountId,
			String(problemId)
		).then((response) => {
			setPreviousSubmissions(response.data);
		});
	}, []);

	const handleSubmit = ({
		setGrading,
		setLastedSubmission,
		selectedLanguage,
		submitCodeValue,
	}: OnSubmitProblemViewLayoutCallback) => {
		setGrading(true);
		SubmissionService.submit(accountId, String(problemId), {
			language: selectedLanguage,
			submission_code: String(submitCodeValue),
		}).then((response) => {
			console.log(response.data);
			setLastedSubmission(response.data);
			SubmissionService.getByAccountProblem(
				accountId,
				String(problemId)
			).then((response) => {
				setPreviousSubmissions(response.data);
			});
			setGrading(false);
		});
	};

	return (
		<NavbarMenuLayout xPad={false}>
			<div className="ml-10">
				<ProblemViewLayout
					onSubmit={(e) => handleSubmit(e)}
					problem={problem as ProblemPoplulateCreatorModel}
					previousSubmissions={
						previousSubmissions as GetSubmissionByAccountProblemResponse
					}
				/>
			</div>
		</NavbarMenuLayout>
	);
};

const MonacoEditorWrapper = styled.div`
	height: 80vh;

	@media (max-height: 900px) {
		height: 75vh;
	}
`;
export default ViewProblem;
