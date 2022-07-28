import {gql} from "@apollo/client";

export type ExcelExportData = { excelExport: {createReport: number[]} }
export type ExcelExportInputType = {like: string, date: string}
export type ExcelExportVars = {excelExportInputType: ExcelExportInputType}

export const EXCEL_EXPORT_CREATE_QUERY = gql`
    query ExcelExport($excelExportInputType: ExcelExportInputType!) {
    excelExport{
        createReport(excelExportInputType: $excelExportInputType)
        }
    }
`;