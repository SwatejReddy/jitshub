export interface ISignUp {
    username: string;
    password: string;
    name: string
    email: string;
    rollNo: string;
    department: ['CSE', 'CSM', 'CSD', 'CSIT', 'ECE', 'EEE', 'MECH', 'CIVIL'];
    year: ['1', '2', '3', '4'];
}

export interface ILogin {
    username: string;
    password: string;
}