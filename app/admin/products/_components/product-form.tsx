'use client';
import { UploadDropzone } from '@/utils/uploadthing';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useFormState } from 'react-dom';
import { ZodErrors } from '@/components/zod-errors';
import { addProduct, State, updateProduct } from '../../actions';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/currencyFormats';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import SubmitButton from '@/components/submit-button';
import { Product } from '@prisma/client';
import Image from 'next/image';

const INITIAL_STATE: State = {
  message: '',
  status: undefined,
};

export default function ProductForm({ product }: { product?: Product | null }) {
  const [formState, formAction] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    INITIAL_STATE,
  );
  const [price, setPrice] = useState<number | undefined>(product?.priceInCents);
  const [image, setImage] = useState<string[] | undefined>(product?.image);
  console.log(product);

  return (
    <div className=" flex items-center justify-center">
      <form action={formAction} className="min-w-[350px] mt-5">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Create Product</CardTitle>
            <CardDescription>Enter your product details</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Select
                name="category"
                defaultValue={product?.category || ''}
                required
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="set">Sets</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              <ZodErrors error={formState?.errors?.category} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                minLength={5}
                defaultValue={product?.name || ''}
                required
              />
              <ZodErrors error={formState?.errors?.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                defaultValue={product?.description || ''}
                minLength={10}
                required
              />
              <ZodErrors error={formState?.errors?.description} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceInCents">Price</Label>
              <Input
                id="priceInCents"
                name="priceInCents"
                type="number"
                value={price}
                minLength={3}
                required
                onChange={(e) => setPrice(Number(e.target.value) || undefined)}
              />
              <div className="text-muted-foreground">
                {formatCurrency((price || 0) / 100)}
              </div>
              <ZodErrors error={formState?.errors?.priceInCents} />
            </div>

            <div className="">
              {product !== null && (
                <Image
                  src={`${product?.image}`}
                  height={400}
                  width={400}
                  alt="Product Image"
                />
              )}
              <input
                type="hidden"
                id="image"
                name="image"
                required={product == undefined}
                value={JSON.stringify(image)}
              />
              <Label>Product Image</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImage(res.map((item) => item.url));
                }}
                onUploadError={(error: Error) => {
                  throw new Error(`${error}`);
                }}
              />
              <ZodErrors error={formState?.errors?.image} />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
