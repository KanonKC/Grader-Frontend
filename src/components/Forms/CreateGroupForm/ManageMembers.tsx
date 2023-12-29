import React, { useEffect, useState } from "react";
import { CreateCollectionRequestForm } from "../../../types/forms/CreateCollectionRequestForm";
import { ReactSortable } from "react-sortablejs";
import { Button } from "../../shadcn/Button";
import AddProblemDialog from "../../AddProblemDialog";
import { Separator } from "../../shadcn/Seperator";
import { Input } from "../../shadcn/Input";
import { ProblemService } from "../../../services/Problem.service";
import {
	ProblemHashedTable,
	ProblemModel,
	ProblemSecureModel,
} from "../../../types/models/Problem.model";
import { ItemInterface } from "./../../../../node_modules/react-sortablejs/dist/index.d";
import MyProblemCard from "../../MyProblemCard";
import CardContainer from "../../CardContainer";
import SortableCardContainer from "../../SortableCardContainer";
import MyProblemMiniCard from "../../MyProblemMiniCard";
import { ScrollArea } from "../../shadcn/ScrollArea";
import { Item } from "@radix-ui/react-context-menu";
import { transformProblemModel2ProblemHashedTable } from "../../../types/adapters/Problem.adapter";
import { CreateGroupRequestForm } from "../../../types/forms/CreateGroupRequestForm";
import MyCollectionMiniCard from "../../MyCollectionMiniCard";
import { CollectionService } from "../../../services/Collection.service";
import { transformCollectionModel2CollectionHashedTable } from "../../../types/adapters/Collection.adapter";
import {
	CollectionHashedTable,
	CollectionPopulateProblemSecureModel,
} from "../../../types/models/Collection.model";
import AccountCheckboxCard from "../../AccountCheckboxCard";
import { AccountHashedTable, AccountSecureModel } from "../../../types/models/Account.model";
import { GroupHashedTable } from "../../../types/models/Group.model";
import { GroupService } from "../../../services/Group.service";
import { AccountService } from "../../../services/Account.service";
import { transformAccountModels2AccountHashedTable } from "../../../types/adapters/Account.adapter";
import AccountMiniCard from "../../AccountMiniCard";

const ManageMembers = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateGroupRequestForm;
	setCreateRequest: React.Dispatch<
		React.SetStateAction<CreateGroupRequestForm>
	>;
}) => {
	const accountId = Number(localStorage.getItem("account_id"));

	const [allAccountsSortable, setAllAccountsSortable] = useState<
		ItemInterface[]
	>([]);
	const [selectedAccountsSortable, setSelectedAccountsSortable] = useState<
		ItemInterface[]
	>([]);
	const [allAccounts, setAllAccounts] = useState<AccountHashedTable>({});

	const [initial, setInitial] = useState(true);
	const [selectedAccountsSortableIds, setSelectedAccountsSortableIds] =
		useState<number[]>([]);

	useEffect(() => {
		setSelectedAccountsSortableIds(
			selectedAccountsSortable?.map((item) => item.id as number)
		);
	}, [selectedAccountsSortable]);

	const handleRemoveSelectedCollection = (id: number) => {
		setSelectedAccountsSortable([
			...selectedAccountsSortable.filter((item) => item.id !== id),
		]);
	};

	const handleQuickToggleSelectedCollection = (item: ItemInterface) => {
		if (selectedAccountsSortableIds.includes(item.id as number)) {
			handleRemoveSelectedCollection(item.id as number);
		} else {
			setSelectedAccountsSortable([...selectedAccountsSortable, item]);
		}
	};

	useEffect(() => {
		setCreateRequest({
			...createRequest,
			membersInterface: selectedAccountsSortable,
		});
	}, [selectedAccountsSortable]);

	useEffect(() => {
		AccountService.getAll().then((response) => {
			setAllAccounts(transformAccountModels2AccountHashedTable(response.data.accounts))

			setAllAccountsSortable(
				response.data.accounts.map((account) => ({
					id: account.account_id,
					name: account.username,
				}))
			)
		})
	}, [accountId]);

	useEffect(() => {
		if (initial) {
			setSelectedAccountsSortable(createRequest.membersInterface);
			setInitial(false);
		}

		console.log("Create Request", createRequest);
	}, [createRequest]);

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Manage Collections</h1>

				<Button>Add Collections</Button>
			</div>

			<div className="flex">
				<div className="w-1/2">
					<div className="mt-6 pr-5">
						<div className="grid gap-y-3">
							<ScrollArea className="mt-6 h-[80vh] md:h-[65vh] pr-5">
								<ReactSortable
									animation={150}
									group="shared"
									list={selectedAccountsSortable}
									setList={setSelectedAccountsSortable}
									className="grid gap-y-3 p-2 rounded-md"
									sort={false}
								>
									{selectedAccountsSortable?.map((item) => (
										<AccountMiniCard
											disabledHighlight
											onClick={() => handleRemoveSelectedCollection(item.id as number)}
											key={item.id}
											account={allAccounts[item.id as number] as AccountSecureModel}
										/>
									))}
								</ReactSortable>
							</ScrollArea>
						</div>
					</div>
				</div>

				<div className="mx-3">
					<Separator orientation="vertical" />
				</div>

				<div className="w-1/2">
					<Input className="mt-2" />
					<ScrollArea className="mt-6 h-[80vh] md:h-[65vh] pr-5">
						<ReactSortable
							group={{
								name: "shared",
								pull: "clone",
								put: false,
							}}
							animation={150}
							sort={false}
							list={allAccountsSortable}
							setList={setAllAccountsSortable}
							filter=".selected"
							className="grid gap-y-3 p-2 rounded-md min-h-[20vh]"
						>
							{allAccountsSortable?.map((item) => (
								<div
									className={
										selectedAccountsSortable?.includes(item)
											? "selected"
											: ""
									}
								>
									<AccountMiniCard
											disabled={selectedAccountsSortableIds.includes(item.id as number)}
											onClick={() => handleQuickToggleSelectedCollection(item)}
											key={item.id}
											account={allAccounts[item.id as number] as AccountSecureModel}
										/>
								</div>
							))}
						</ReactSortable>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
};

export default ManageMembers;
