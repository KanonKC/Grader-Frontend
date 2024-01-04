import { AccountSecureModel } from "./Account.model"
import { SubmissionPopulateSubmissionTestcasesSecureModel } from "./Submission.model"

export type TestcaseModel = {
    testcase_id: string
    input: string
    output: string | null
    problem: number
    runtime_status: string
}

export type ProblemModel = {
    problem_id: string
    language: string
    title: string
    description: string | null
    solution: string
    time_limit: number
    is_active: boolean
    is_private: boolean
    submission_regex: string
    creator: string
    testcases: TestcaseModel[]
    created_date: string;
    updated_date: string;
}

export type ProblemSecureModel = {
    problem_id: string
    title: string
    description: string
    creator: AccountSecureModel
    created_date: string;
    updated_date: string;
}

export type ProblemPoplulateCreatorModel = ProblemModel & {
    creator: AccountSecureModel
}

export type ProblemPopulateAccountSecureModel = {
    problem_id: string
    title: string
    description: string | null
    creator: AccountSecureModel
}


export type ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel = ProblemPoplulateCreatorModel & {
    best_submission: SubmissionPopulateSubmissionTestcasesSecureModel | null
}

export type ProblemPopulateTestcases = ProblemModel & {
    testcases: TestcaseModel[]
}

export type ProblemHashedTable = {
    [id:string]: ProblemModel | ProblemPopulateTestcases
}

export type ProblemHealth = {
    has_source_code: boolean
    testcase_count: number
    no_runtime_error: boolean
}