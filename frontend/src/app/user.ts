/**
 * User data model in our simple full-stack demo application.
 */


export interface User {
    pid: number;
    first_name: string;
    last_name: string;
}

export interface Checkin {
    user: User;
    created_at: Date
}

export interface CheckinRequest {
    pid: number;
    
}
