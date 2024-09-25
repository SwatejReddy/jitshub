import { z } from "zod";

export const UserSignUpSchema = z.object({
    name: z.string(),
    username: z.string().min(4).max(20),
    email: z.string().email(),
    password: z.string().min(6),
    rollNo: z.string().min(8).max(12),
    department: z.enum(['CSE', 'CSM', 'CSD', 'CSIT', 'ECE', 'EEE', 'MECH', 'CIVIL']),
    year: z.enum(['1', '2', '3', '4'])
})

export const FacultySignUpSchema = z.object({
    name: z.string(),
    username: z.string().min(4).max(20),
    email: z.string().email(),
    password: z.string().min(6),
    department: z.enum(['CSE', 'CSM', 'CSD', 'CSIT', 'ECE', 'EEE', 'MECH', 'CIVIL']),
    designation: z.enum(['Assistant Professor', 'Associate Professor', 'Professor', 'HOD', 'Principal', 'Vice Principal', 'Faculty']),
})

export const LoginSchema = z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(6)
})