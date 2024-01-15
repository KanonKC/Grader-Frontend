import React, { ReactNode } from "react";
import { ProblemPopulateTestcases } from "../../types/models/Problem.model";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../shadcn/Table";
import { DataTable } from "../DataTable";
import { readableDateFormat } from "../../utilities/ReadableDateFormat";
import { Check, FileSpreadsheet, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../shadcn/Badge";
import { checkRuntimeStatus } from "../../utilities/CheckRuntimeStatus";
import { ProgrammingLanguageOptions } from "../../constants/ProgrammingLanguage";

const columns: ColumnDef<ProblemPopulateTestcases>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => {
			console.log(row.original.allowed_languages);

			return (
				<div className="font-mono flex items-center">
					<FileSpreadsheet className="mr-2 text-blue-400" size={20} />
					<Link to={`/my/problems/${row.original.problem_id}/edit`}>
						{row.original.title}
					</Link>
				</div>
			);
		},
	},

	{
		accessorKey: "testcases",
		header: "Testcases",
		cell: ({ row }) => (
			<div className="font-medium">{row.original.testcases.length}</div>
		),
	},

	{
		accessorKey: "time_limit",
		header: "Time Limit",
		cell: ({ row }) => (
			<div className="font-medium">{row.original.time_limit}</div>
		),
	},

	{
		accessorKey: "testcases",
		header: "Status",
		cell: ({ row }) => {
			const CheckBadge = ({
				checked = false,
				children,
			}: {
				checked?: boolean;
				children?: ReactNode;
			}) => {
				return checked ? (
					<Badge className="cursor-pointer ">
						<Check className="mr-1" size={12} />
						{children}
					</Badge>
				) : (
					<Badge className="cursor-pointer bg-red-500 hover:bg-red-400">
						<X className="mr-1" size={12} />
						{children}
					</Badge>
				);
			};

			return (
				<div className="gap-y-1">
					<CheckBadge checked={row.original.solution !== ""}>
						Source Code
					</CheckBadge>
					<span className="mx-1">
						<CheckBadge checked={row.original.testcases.length > 0}>
							Testcases
						</CheckBadge>
					</span>
					<CheckBadge
						checked={checkRuntimeStatus(row.original.testcases)}
					>
						No Runtime Error
					</CheckBadge>
				</div>
			);
		},
	},

	{
		accessorKey: "allowed_languages",
		header: "Allowed Languages",
		cell: ({ row }) => (
			<div className="font-medium">
				{row.original.allowed_languages.split(",").map((lang) => (
					<span className="mx-0.5">
						{
							ProgrammingLanguageOptions.find(
								(option) => option.value === lang
							)?.badge
						}
					</span>
				))}
			</div>
		),
	},

	{
		accessorKey: "updated_date",
		header: "Updated Date",
		cell: ({ row }) => (
			<div className="">
				{readableDateFormat(row.original.updated_date)}
			</div>
		),
	},
	{
		accessorKey: "created_date",
		header: "Created Date",
		cell: ({ row }) => (
			<div className="">
				{readableDateFormat(row.original.created_date)}
			</div>
		),
	},
];

const MyProblemsTable = ({
	problems,
}: {
	problems: ProblemPopulateTestcases[];
}) => {
	return (
		<div>
			<DataTable columns={columns} data={problems} />
		</div>
	);
};

export default MyProblemsTable;