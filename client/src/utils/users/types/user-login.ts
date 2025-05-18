export interface userLogin{
    refresh: string;
    access: string;
    user_id: number;
}

export interface user{
    id: number;
    email: string;
    username: string;
    mobile_number: string;
    address: string;
    gender: string;
    dob: string;
    role: string;
    profile_picture: string;
    profile_background: string;
    followers: number[];
}