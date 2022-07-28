import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    ExcelExportInputType,
    ExcelExportData,
} from "../graphQL/excelExport.queries";


type InitialState = {
    file: number[]
}

const initialState: InitialState = {
    file: []
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