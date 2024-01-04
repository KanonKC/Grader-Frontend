import React, { useContext, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { Input } from "../../../components/shadcn/Input";
import { Button } from "../../../components/shadcn/Button";
import { Card, CardContent, CardTitle } from "../../../components/shadcn/Card";
import MyProblemCard from "../../../components/Cards/ProblemCards/MyProblemCard";
import { useNavigate } from "react-router-dom";
import { ProblemService } from "../../../services/Problem.service";
import { ProblemModel, ProblemPopulateTestcases } from "../../../types/models/Problem.model";
import CardContainer from "../../../components/CardContainer";
import { NavSidebarContext } from "../../../contexts/NavSidebarContext";
import DeleteProblemConfirmationDialog from "../../../components/DeleteProblemConfirmationDialog";
import { FilePlus } from "lucide-react";

const MyProblems = () => {
	const accountId = String(localStorage.getItem("account_id"));
	const navigate = useNavigate();

	const [allProblems, setAllProblems] = useState<ProblemPopulateTestcases[]>([]);
	const [problems, setProblems] = useState<ProblemPopulateTestcases[]>([]);
	const {section,setSection} = useContext(NavSidebarContext)
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		ProblemService.getAllAsCreator(accountId).then((response) => {
			setAllProblems(response.data.problems);
			setProblems(response.data.problems);
		});

		setSection("PROBLEMS")
	}, []);

	useEffect(() => {
		if (searchInput.length > 0) {
			const filteredProblems = allProblems.filter((problem) =>
				problem.title.toLowerCase().includes(searchInput.toLowerCase())
			);
			setProblems(filteredProblems);
		}
		else {
			setProblems(allProblems);
		}
	}, [searchInput]);

	return (
		<NavbarSidebarLayout>
			<div className="w-[96%] mx-auto mt-10">
				<div className="flex justify-between gap">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							My Problems
						</h1>
					</div>
					<div className="w-9/12 md:w-7/12">
						<Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search ..." />
					</div>
					<div>
						<Button onClick={() => navigate("/my/problems/create")}>
							<FilePlus size={20} className="mr-2" />
							Create Problem
						</Button>
					</div>
				</div>

				<CardContainer>
					{problems.map((problem, index) => (
						<MyProblemCard problem={problem} key={index} />
					))}
				</CardContainer>
			</div>
		</NavbarSidebarLayout>
	);
};

export default MyProblems;
