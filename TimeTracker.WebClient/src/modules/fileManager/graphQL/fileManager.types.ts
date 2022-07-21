export type FileManagerItem = {
    name: string,
    path: string,
    createdAt: string,
    kind: FileManagerItemKind,
}

export enum FileManagerItemKind {
    File = 'FILE',
    Folder = 'FOLDER',
}