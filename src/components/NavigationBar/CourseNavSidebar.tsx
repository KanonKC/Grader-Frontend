import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseNavSidebarContext } from "../../contexts/CourseNavSidebarContexnt";
import { TopicService } from "../../services/Topic.service";
import { Separator } from "../shadcn/Seperator";
import { ChevronLeft, ChevronRight, Folder, LibraryBig } from "lucide-react";
import NavbarCollectionsProblemsAccordion from "../NavbarCollectionsProblemsAccordion";
import { TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "../../types/models/Topic.model";
import { ScrollArea } from "../shadcn/ScrollArea";

const CourseNavSidebar = () => {
	const navigate = useNavigate();
	const accountId = Number(localStorage.getItem("account_id"));
	const { courseId } = useParams();

	const courseNavSidebarContext = useContext(CourseNavSidebarContext);
	const { isOpen, setIsOpen, section, setSection, course, setCourse,recentOpenCollection,setRecentOpenCollection } = courseNavSidebarContext;



	useEffect(() => {
		TopicService.getPublicByAccount(accountId, Number(courseId)).then(
			(response) => {
				console.log(response.data);
				setCourse(response.data);
			}
		);
	}, [accountId, courseId]);

	useEffect(() => {
		console.log('open',isOpen)
	},[isOpen])

	// useEffect(()=>{
	// 	// localStorage.setItem("recent_open_collection",JSON.stringify(recentOpenCollection))
	// 	console.log('recent',recentOpenCollection)
	// },[recentOpenCollection])

	useEffect(() => {
		const courseNavSidebarContextStorage = localStorage.getItem("courseNavSidebarContext")
		if (courseNavSidebarContextStorage) {
			setCourse(JSON.parse(courseNavSidebarContextStorage).course)
			setIsOpen(JSON.parse(courseNavSidebarContextStorage).isOpen)
			setSection(JSON.parse(courseNavSidebarContextStorage).section)
			setRecentOpenCollection(JSON.parse(courseNavSidebarContextStorage).recentOpenCollection)
		}
	},[])

	useEffect(() => {
		localStorage.setItem("courseNavSidebarContext",JSON.stringify(courseNavSidebarContext))
	},[ courseNavSidebarContext ])



	return (
		<>
			<div className="h-screen pt-10 sticky top-0">
				{isOpen ? (
					<div>
						<div className="flex">
							<div
								onClick={() => navigate(`/courses/${courseId}`)}
								className="flex items-center px-2 py-4 cursor-pointer w-11/12"
							>
								<LibraryBig
									size={20}
									className="text-purple-400 mx-1"
								/>
								<p className="font-medium text-base w-11/12 line-clamp-1 text-left">
									{course?.name}
								</p>
							</div>
							<div
								onClick={() => setIsOpen(false)}
								className="cursor-pointer border-l py-4"
							>
								<ChevronLeft />
							</div>
						</div>
						<Separator />
						<ScrollArea className="h-[80vh]">
							<NavbarCollectionsProblemsAccordion
								collections={
									course?.collections as TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[]
								}
							/>
						</ScrollArea>
					</div>
				) : (
					<div>
						<div onClick={() => setIsOpen(true)} className="p-2 border-b cursor-pointer">
							<ChevronRight />
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default CourseNavSidebar;
