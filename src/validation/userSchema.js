import { object, string, minLength, nonEmpty, pipe} from 'valibot';



export const userSchema = object({
    username : pipe(string(), nonEmpty('Title is required'), minLength(3, 'Title must have at least 3 characters')),
    password : pipe(string(), nonEmpty('Price is required'), minLength(4, 'Password must be at least 4 characters')),
})