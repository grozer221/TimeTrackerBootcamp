import {gql} from '@apollo/client';
import {VACATION_REQUEST_FRAGMENT} from "./vacationRequests.fragments";
import {GetEntitiesResponse} from "../../../graphQL/types/getEntitiesResponse";
import {VacationRequest} from "./vacationRequests.types";

export type VacationRequestsGetByIdData = { vacationRequests: { getById: VacationRequest } }
export type VacationRequestsGetByIdVars = { id: string }
export const VACATION_REQUESTS_GET_BY_ID_QUERY = gql`
    ${VACATION_REQUEST_FRAGMENT}
    query VacationRequestsGet($id: Guid!){
        vacationRequests {
            getById(id: $id) {
                ...VacationRequestFragment
            }
        }
    }
`;

export type VacationRequestsGetData = { vacationRequests: { get: GetEntitiesResponse<VacationRequest> } }
export type VacationRequestsGetVars = { vacationRequestsGetInputType: VacationRequestsGetInputType }
export type VacationRequestsGetInputType = {
    pageNumber: number,
    pageSize: number,
}
export const VACATION_REQUESTS_GET_QUERY = gql`
    ${VACATION_REQUEST_FRAGMENT}
    query VacationRequestsGet($vacationRequestsGetInputType: VacationRequestsGetInputType!){
        vacationRequests {
            get(vacationRequestsGetInputType: $vacationRequestsGetInputType) {
                entities {
                    ...VacationRequestFragment
                }
                total
                pageSize
            }
        }
    }
`;

export type VacationRequestsGetAvailableDaysData = { vacationRequests: { getAvailableDays: number } }
export type VacationRequestsGetAvailableDaysVars = {}
export const VACATION_REQUESTS_GET_AVAILABLE_DAYS_QUERY = gql`
    query VacationRequestsGetAvailableDays{
        vacationRequests {
            getAvailableDays
        }
    }
`;
