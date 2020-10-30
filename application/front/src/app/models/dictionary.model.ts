export interface Dictionary {
    name: string;
    entries: DictionaryEntry[];
}

export interface DictionaryEntry {
    key: string;
    value: string;
}
