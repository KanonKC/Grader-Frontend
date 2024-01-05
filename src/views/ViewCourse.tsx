import { LibraryBig } from "lucide-react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import TopicCollectionAccordionCard from "../components/Cards/CollectionCards/TopicCollectionAccordionCard";
import ReadOnlyPlate from "../components/ReadOnlyPlate";
import { CourseNavSidebarContext } from "../contexts/CourseNavSidebarContexnt";
import CourseNavbarSidebarLayout from "../layout/CourseNavbarSidebarLayout";

const ViewCourse = () => {
	const accountId = String(localStorage.getItem("account_id"));
	const { courseId } = useParams();

	// const [course, setCourse] =
	// 	useState<TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel>();

	// const [course,setCourse]

	const {course,setCourse} = useContext(CourseNavSidebarContext);

	// useEffect(() => {
	// 	TopicService.getPublicByAccount(accountId, String(courseId)).then(
	// 		(response) => {
	// 			console.log(response.data);
	// 			setCourse(response.data);
	// 		}
	// 	);
	// }, [accountId, courseId]);

	return (
		<CourseNavbarSidebarLayout>
			<div className="mt-10 mx-auto w-[95%]">
				<h1 className="text-3xl font-bold flex items-center">
					<LibraryBig size={36} className="text-purple-400 mr-2" />
					{course?.name}
				</h1>
				{course && (
					<ReadOnlyPlate
						value={JSON.parse(String(course.description))}
					/>
				)}
				{/* <CardContainer> */}
				{/* <ScrollArea className="mt-6 pr-5 "> */}
				{/* <TopicCollectionsAccordion
						collections={course?.collections as TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[]}
					/> */}

				<div className="grid gap-y-2 ">
					{course?.collections.map((tc) => (
						<TopicCollectionAccordionCard
							collection={tc.collection}
						/>
					))}
				</div>
				{/* </ScrollArea> */}

				{/* </CardContainer> */}
			</div>
		</CourseNavbarSidebarLayout>
	);
};

export default ViewCourse;
