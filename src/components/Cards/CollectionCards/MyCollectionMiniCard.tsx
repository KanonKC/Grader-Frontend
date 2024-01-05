import {
	FileSpreadsheet,
	Folder,
	PencilIcon,
	Trash
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionPopulateProblemSecureModel } from "../../../types/models/Collection.model";
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

const MyCollectionMiniCard = ({
	// problem,
    collection,
	disabled=false,
	disabledHighlight=false,
	onClick=()=>{}
}: {
	// problem: ProblemPopulateTestcases | ProblemSecureModel | ProblemModel;
    collection:CollectionPopulateProblemSecureModel
	disabled?: boolean;
	disabledHighlight?: boolean;
	onClick?: () => void;
}) => {
	const navigate = useNavigate();

	const [highlightTitle, setHighlightTitle] = useState(false);
	const [toolVisible, setToolVisible] = useState(true);

	const handleMouseOver = () => {
		setHighlightTitle(true);
		setToolVisible(true);
	};
	const handleMouseOut = () => {
		setHighlightTitle(false);
		setToolVisible(false);
	};

	const customCardCSS = ():string => {
		let className = "py-3 px-5 cursor-pointer ";

		if (disabled) {
			className += "opacity-50 ";
		}
		else{
			if (highlightTitle && !disabledHighlight) {
				className += "border-green-500 bg-green-100 ";
			}
		} 
		return className;
	}

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
				{/* <CardContent> */}
					<div className="flex items-stretch justify-between">
						<div className="flex items-center w-1/2">
							<Folder className="text-yellow-400 mr-2" />
							{(!highlightTitle || disabled || disabledHighlight) && (
								<h1 className="	font-bold">{collection.name}</h1>
							)}
							{(highlightTitle && !disabled && !disabledHighlight) && (
								<h1 className="font-bold text-green-600">
									{collection.name}
								</h1>
							)}
						</div>

						<div className="flex gap-1 text-sm font-medium self-center">
                            <div className="flex">
                                <FileSpreadsheet className="text-blue-400 mr-2" />
                                <p>Problems ({collection.problems.length})</p>
                            </div>
						
						</div>
					</div>
				{/* </CardContent> */}
			</Card>
		// </MyCollectionContextMenu>
		)
	);
};

export default MyCollectionMiniCard;
