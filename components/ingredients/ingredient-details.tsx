'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReloadIcon } from "@radix-ui/react-icons"

const ingredientSchema = z.object({
  name: z.object({
    en: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
  }),
  producer: z.string().optional(),
  category: z.string().optional(),
  energy_kcal: z.number().min(0),
  protein_g: z.number().min(0),
  fat_g: z.number().min(0),
  carbohydrates_g: z.number().min(0),
  fiber_g: z.number().min(0),
  tags: z.array(z.string()).optional(),
})

type IngredientFormValues = z.infer<typeof ingredientSchema>

async function fetchIngredient(id: string) {
  const response = await fetch(`/api/ingredients/${id}`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch ingredient')
  }
  return response.json()
}

async function updateIngredient(id: string, data: IngredientFormValues) {
  const response = await fetch(`/api/ingredients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to update ingredient')
  }
  return response.json()
}

export default function IngredientDetail() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const { 
    data: ingredient, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['ingredient', params.id],
    queryFn: () => fetchIngredient(params.id as string),
    retry: 2,
    retryDelay: 1000,
  })

  const updateMutation = useMutation({
    mutationFn: (data: IngredientFormValues) => updateIngredient(params.id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredient', params.id] })
      toast({
        title: "Success",
        description: "The ingredient has been successfully updated.",
      })
      setIsEditing(false)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update the ingredient. Please try again.",
        variant: "destructive",
      })
    },
  })

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    values: ingredient || {
      name: { en: '' },
      producer: '',
      category: '',
      energy_kcal: 0,
      protein_g: 0,
      fat_g: 0,
      carbohydrates_g: 0,
      fiber_g: 0,
      tags: [],
    },
  })

  function onSubmit(data: IngredientFormValues) {
    updateMutation.mutate(data)
  }

  if (isLoading) return <div>Loading...</div>
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {(error as Error).message || 'An unexpected error occurred'}
          <Button onClick={() => refetch()} variant="outline" className="mt-2">
            <ReloadIcon className="mr-2 h-4 w-4" /> Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!ingredient) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>
          The requested ingredient could not be found.
          <Button onClick={() => router.back()} variant="outline" className="mt-2">
            Go Back
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Button onClick={() => router.back()} className="mb-4">Back to Ingredients</Button>
      <h1 className="text-2xl font-bold mb-4">Ingredient Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name.en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name (English)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="producer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producer</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="energy_kcal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Energy (kcal)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="protein_g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protein (g)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fat_g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fat (g)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carbohydrates_g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carbohydrates (g)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fiber_g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiber (g)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    disabled={!isEditing}
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map(tag => tag.trim()))}
                  />
                </FormControl>
                <FormDescription>Enter tags separated by commas</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEditing ? (
            <Button type="submit">Save Changes</Button>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </form>
      </Form>
    </div>
  )
}
