export interface IndividualTermData {
    term: string;
    definition: string;
    views: number;
    createdAt: Date;
    nextTerm?: string;
    prevTerm?: string;
}