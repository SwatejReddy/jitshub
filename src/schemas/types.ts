export interface IUserSignUp {
    username: string;
    password: string;
    name: string
    email: string;
    rollNo: string;
    department: ['CSE', 'CSM', 'CSD', 'CSIT', 'ECE', 'EEE', 'MECH', 'CIVIL'];
    year: ['1', '2', '3', '4'];
}

export interface IFacultySignUp {
    username: string;
    password: string;
    name: string;
    email: string;
    department: ['CSE', 'CSM', 'CSD', 'CSIT', 'ECE', 'EEE', 'MECH', 'CIVIL'];
    phone: string;
    designation: string;
}

export interface ILogin {
    username: string;
    password: string;
}