import { object, string, minLength, url, nonEmpty, number, pipe} from 'valibot';



export const productSchema = object({
    title : pipe(string(), nonEmpty('Title is required'), minLength(3, 'Title must have at least 3 characters')),
    price : pipe(number(), nonEmpty('Price is required')),
    category : pipe(string(), nonEmpty('Category is required')),
    image : pipe(string(), nonEmpty('Image is required'), url('Must be a valid image URL')),
    description : pipe(string(), nonEmpty('Description is required'), minLength(10, 'Must have atleast 10 characters'))
})