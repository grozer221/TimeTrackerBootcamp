export type FileManagerItem = {
    name: string,
    path: string,
    createdAt: string,
    kind: FileManagerItemKind,
    permissions: FileManagerItemPermissions,
}

export enum FileManagerItemKind {
    File = 'FILE',
    Folder = 'FOLDER',
}

export enum FileManagerItemPermissions {
    Read = 'READ',
    ReadAndWrite = 'READ_AND_WRITE',
}