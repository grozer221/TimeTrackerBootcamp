import {gql} from "@apollo/client";
import {UserFilter} from "../../users/graphQL/users.types";

export type ExcelExportData = { excelExport: {createReport: number[]} }
export type ExcelExportInputType = {filter: UserFilter, date: string}
export type ExcelExportVars = {excelExportInputType: ExcelExportInputType}

export const EXCEL_EXPORT_CREATE_QUERY = gql`
    query ExcelExport($excelExportInputType: ExcelExportInputType!) {
    excelExport{
        createReport(excelExportInputType: $excelExportInputType)
        }
    }
`;