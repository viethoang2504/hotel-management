export type User = {
    _id: string;
    name: string;
    email: string;
    isAdming: boolean;
    about: string | null;
    _createdAt: string
    image: string;
}