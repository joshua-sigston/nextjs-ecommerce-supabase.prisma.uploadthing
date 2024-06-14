"use server"
import db from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';

export type State = {
  status: 'error' | 'success' | undefined,
  errors?: {
    [key: string]: string[]
  },
  message?: string | null 
}

const productSchema = z.object({
    category: z.string().min(1, {message: 'pick category that product is assocaited with'}),
    name: z.string().min(1, {message: 'name your product'}),
    description: z.string().min(1, {message: 'please add description'}),
    priceInCents: z.coerce.number().int().min(1, {message: 'price is required'}),
    image: z.array(z.string(), { message: "Image is required" }),
})

export async function addProduct(prevState: any, formData: any) {
  
console.log(formData)

  const validatedFields = productSchema.safeParse({
    category: formData.get("category"),
    name: formData.get("name"),
    description: formData.get("description"),
    priceInCents: Number(formData.get('priceInCents')),
    image: JSON.parse(formData.get("image") as string)
  });


  if (!validatedFields.success) {
    const state: State ={
      status: 'error', 
      errors: validatedFields.error.flatten().fieldErrors, 
      message: 'Something went wrong!'}

    return state
  }

  const state: State = {
    status: 'success',
    message: 'Your product has been created'
  }
  
  
  await db.product.create({
    data: {
      category: validatedFields.data.category,
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      priceInCents: validatedFields.data.priceInCents,
      image: validatedFields.data.image as string[]
    }
  })

  console.log(validatedFields)
 
  return redirect('/admin/products')
}

export async function toggleProductAvailability(id: string, isAvailable: boolean) {

  await db.product.update({where: {id}, data: {isAvailable}})
  // revalidatePath('/')
  // revalidatePath('/products')
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({where: {id}})

  if (product === null) return notFound()

  // await fs.unlink(`public${product.imagePath}`)
  // revalidatePath('/')
  // revalidatePath('/products')
}

const editSchema = z.object({
  category: z.string().min(1, {message: 'pick category that product is assocaited with'}),
  name: z.string().min(1, {message: 'name your product'}),
  description: z.string().min(1, {message: 'please add description'}),
  priceInCents: z.coerce.number().int().min(1, {message: 'price is required'}),
  image: z.array(z.string()).optional(),
})

export async function updateProduct(id: string, prevState: any, formData: any) {

  const validatedFields = editSchema.safeParse({
    category: formData.get("category"),
    name: formData.get("name"),
    description: formData.get("description"),
    priceInCents: Number(formData.get('priceInCents')),
    image: JSON.parse(formData.get("image") as string)
  });

  if (!validatedFields.success) {
    const state: State ={
      status: 'error', 
      errors: validatedFields.error.flatten().fieldErrors, 
      message: 'Something went wrong!'}

    return state
  }

  const state: State = {
    status: 'success',
    message: 'Your product has been created'
  }

  const product = await db.product.findUnique({where: {id}})
  if (product == null) return notFound()
  
  await db.product.update({
    where: {id},
    data: {
      category: validatedFields.data.category,
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      priceInCents: validatedFields.data.priceInCents,
      image: validatedFields.data.image as string[]
    }
  })
 
  return redirect('/admin/products')
}