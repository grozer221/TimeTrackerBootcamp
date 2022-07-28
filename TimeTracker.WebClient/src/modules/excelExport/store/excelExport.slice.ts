import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    ExcelExportInputType,
    ExcelExportData,
} from "../graphQL/excelExport.queries";


type InitialState = {
    file: Uint8Array
}

const initialState: InitialState = {
    file: new Uint8Array()
}

export const excelExportSlice = createSlice({
    name: 'excel',
    initialState,
    reducers: {
        createReportAsync: (state, action: PayloadAction<ExcelExportInputType>) => state,
        saveReport: (state, action: PayloadAction<ExcelExportData>) => {
            state.file = action.payload.excelExport.createReport
        }
    },
})

export const excelExportActions = excelExportSlice.actions
export const excelExportReducer = excelExportSlice.reducer