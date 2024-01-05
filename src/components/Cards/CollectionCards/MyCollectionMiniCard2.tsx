import {
	Folder,
	PencilIcon,
	Trash
} from "lucide-react";
import React, { useState } from "react";
import {
	CollectionPopulateCollectionProblemPopulateProblemModel,
	CollectionPopulateProblemSecureModel
} from "../../../types/models/Collection.model";
import {
	ProblemModel,
	ProblemPopulateTestcases,
	ProblemSecureModel,
	TestcaseModel,
} from "../../../types/models/Problem.model";
import DeleteProblemConfirmationDialog from "../../DeleteProblemConfirmationDialog";
import { Card } from "../../shadcn/Card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../../shadcn/ContextMenu";

const checkRuntimeStatus = (testcases: TestcaseModel[]) => {
	for (const testcase of testcases) {
		if (testcase.runtime_status !== "OK") {
			return false;
		}
	}
	return true;
};

const MyCollectionContextMenu = ({
	children,
	problem,
}: {
	children: React.ReactNode;
	problem: ProblemPopulateTestcases | ProblemSecureModel | ProblemModel;
}) => {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
				<ContextMenuItem>
					<PencilIcon className="mr-2" size={16} />
					Edit
				</ContextMenuItem>
				<ContextMenuItem onClick={() => setOpenDeleteDialog(true)}>
					<Trash className="mr-2" size={16} />
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};

const MyCollectionMiniCard2 = ({
	// problem,
	collection,
	disabled = false,
	disabledHighlight = false,
	onClick = () => {},
}: {
	// problem: ProblemPopulateTestcases | ProblemSecureModel | ProblemModel;
	collection: CollectionPopulateProblemSecureModel | CollectionPopulateCollectionProblemPopulateProblemModel;
	disabled?: boolean;
	disabledHighlight?: boolean;
	onClick?: () => void;
}) => {

	const [highlightTitle, setHighlightTitle] = useState(false);

	const handleMouseOver = () => {
		setHighlightTitle(true);
	};
	const handleMouseOut = () => {
		setHighlightTitle(false);
	};

	const customCardCSS = (): string => {
		let className = "p-2 cursor-pointer ";

		if (disabled) {
			className += "opacity-50 ";
		} else {
			if (highlightTitle && !disabledHighlight) {
				className += "border-green-500 bg-green-100 ";
			}
		}
		return className;
	};

	return (
		collection && (
			// <MyCollectionContextMenu problem={problem}>
			<Card
				onClick={() => onClick()}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				className={customCardCSS()}

				// className={`pt-6 px-5 ${disabled ? "opacity-50" : }`}`}
			>
				<div className="flex items-center justify-between font-medium text-base ">
					<div className="flex items-center w-11/12">
						<Folder size={20} className="text-yellow-400 mr-2" />
						<p className="line-clamp-1">{collection.name}</p>
					</div>
					<div className="bg-blue-600 w-4 h-4 text-center text-white rounded-full text-xs">
						{collection.problems.length}
					</div>
				</div>
			</Card>
			// </MyCollectionContextMenu>
		)
	);
};

export default MyCollectionMiniCard2;
