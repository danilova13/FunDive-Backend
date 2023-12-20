
export type Dive = {
    id: number;
    name: string;
    date: Date;
    description: string;
    duration: number;
    location: string;
    userId: number;
}

export type DiveForm = {
    name: string;
    date: Date;
    description: string;
    duration: number;
    location: string;
}
