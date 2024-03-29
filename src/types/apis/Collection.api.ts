import { AxiosResponse } from "axios";
import { CollectionCreateRequest, CollectionModel, CollectionPopulateCollectionProblemPopulateProblemModel, CollectionPopulateCollectionProblemsPopulateProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupAndCollectionGroupPermissionsPopulateGroupModel, CollectionUpdateRequest } from "../models/Collection.model";

export type GetCollectionByAccountResponse = {
    collections: CollectionPopulateCollectionProblemPopulateProblemModel[];
    manageable_collections: CollectionPopulateCollectionProblemPopulateProblemModel[];

}

export type CollectionGroupPermissionCreateRequest = {
    group_id: string;
    permission_manage_collections?: boolean
    permission_view_collections?: boolean
}

export type CollectionServiceAPI = {
    create: (accountId:string,request:CollectionCreateRequest) => Promise<AxiosResponse<CollectionModel>>;
    get: (collectionId:string,accountId:string) => Promise<AxiosResponse<CollectionPopulateCollectionProblemsPopulateProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupAndCollectionGroupPermissionsPopulateGroupModel>>;
    update: (collectionId:string,accountId:string,request:CollectionUpdateRequest) => Promise<AxiosResponse<CollectionModel>>;
    delete: (collectionId:string,accountId:string) => Promise<AxiosResponse<null>>;
    getAllAsCreator: (accountId:string) => Promise<AxiosResponse<GetCollectionByAccountResponse>>;
    addProblem: (collectionId:string,problemIds:string[]) => Promise<AxiosResponse<CollectionModel>>;
    removeProblem: (collectionId:string,problemIds:string[]) => Promise<AxiosResponse<null>>;
    updateProblem: (collectionId:string,problemIds:string[]) => Promise<AxiosResponse<CollectionModel>>;
    updateGroupPermissions: (collectionId:string,accountId:string,groups:CollectionGroupPermissionCreateRequest[]) => Promise<AxiosResponse<CollectionModel>>;
}