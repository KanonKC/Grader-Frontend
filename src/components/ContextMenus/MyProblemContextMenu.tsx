import React, { useState } from "react";
import {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
} from "../shadcn/ContextMenu";
import DeleteProblemConfirmationDialog from "../Dialogs/DeleteProblemConfirmationDialog";
import {
	ProblemModel,
	ProblemPopulateTestcases,
	ProblemSecureModel,
} from "../../types/models/Problem.model";
import { CopyPlus, PencilIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { transformProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel2CreateProblemRequestForm } from "./../../types/adapters/Problem.adapter";
import { ProblemService } from "../../services/Problem.service";
import { transformCreateProblemRequestForm2CreateProblemRequest } from "../../types/adapters/CreateProblemRequestForm.adapter";
import { toast } from "../shadcn/UseToast";
import { create } from "sortablejs";

const MyProblemContextMenu = ({
	children,
	problem,
}: {
	children: React.ReactNode;
	problem: ProblemModel | ProblemPopulateTestcases | ProblemSecureModel;
}) => {
	const accountId = String(localStorage.getItem("account_id"));
	const navigate = useNavigate();
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const handleCloneProblem = async () => {
		const response = await ProblemService.get(
			accountId,
			problem.problem_id
		);

		let createRequest = transformProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel2CreateProblemRequestForm(
			response.data
		)

		createRequest.title += " (Copy)"

		const { request, groups } =
			transformCreateProblemRequestForm2CreateProblemRequest(
				createRequest
			);

		ProblemService.create(accountId, request)
			.then((response) => {
				return ProblemService.updateGroupPermissions(
					response.data.problem_id,
					accountId,
					groups
				);
			})
			.then((response) => {
				// setLoading(false);
				toast({
					title: `Cloned ${response.data.title}`,
				});
				window.open(`/my/problems/${response.data.problem_id}`, "_blank");
			});
	};

	return (
		<ContextMenu>
			<DeleteProblemConfirmationDialog
				problem={problem}
				open={openDeleteDialog}
				setOpen={setOpenDeleteDialog}
				afterDelete={() => window.location.reload()}
			/>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem disabled>
					<div className="font-medium">{problem.title}</div>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem
					onClick={() =>
						navigate(`/my/problems/${problem.problem_id}`)
					}
				>
					<PencilIcon className="mr-2" size={16} />
					Edit Problem
				</ContextMenuItem>
				<ContextMenuItem onClick={handleCloneProblem}>
					<CopyPlus className="mr-2" size={16} />
					Clone Problem
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => setOpenDeleteDialog(true)}
					className="text-red-400"
				>
					<Trash className="mr-2" size={16} />
					Delete Problem
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};

export default MyProblemContextMenu;