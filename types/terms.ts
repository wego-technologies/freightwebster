export interface NextUrl {
    term: string;
    slug: string;
}

export interface IndividualTermData {
    term: string;
    definition: string;
    views: number;
    createdAt: Date;
    nextTerm?: NextUrl;
    prevTerm?: NextUrl;
}