"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companions.actions"
import { useRouter } from "next/navigation" // Changed from redirect
import { useState } from "react" // Add loading state

const formSchema = z.object({
  name: z.string().min(1, { message: 'Companion is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  topic: z.string().min(1, { message: 'Topic is required' }),
  voice: z.string().min(1, { message: 'Voice is required' }),
  style: z.string().min(1, { message: 'Style is required' }),
  duration: z.number().min(1, { message: 'Duration is required' }),
})

const CompanionForm = () => {
    const router = useRouter() // Use router for navigation
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setError(null)
        
        try {
            console.log('🔍 Submitting form with values:', values)
            
            const companion = await createCompanion(values)
            
            console.log('✅ Companion created:', companion)
            
            if (companion && companion.id) {
                // Use router.push instead of redirect for client-side navigation
                router.push(`/companions/${companion.id}`)
            } else {
                throw new Error('Companion creation failed - no ID returned')
            }
            
        } catch (error) {
            console.error('❌ Error creating companion:', error)
            
            // Handle different error types
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('An unexpected error occurred while creating the companion')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Companion name</FormLabel>
                      <FormControl>
                        <Input 
                            placeholder="Enter the companion name" 
                            {...field} 
                            className="input"
                            disabled={isLoading} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                      <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                            disabled={isLoading}
                      >
                            <SelectTrigger className="input capitalize">
                            <SelectValue placeholder="Select the subject" />
                            </SelectTrigger>
                            <SelectContent>
                               {subjects.map ((subject) =>(
                                <SelectItem 
                                value= {subject}
                                key={subject}
                                className="capitalize"
                                >
                                    {subject}
                                </SelectItem>
                               ) )}
                            </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What should the companion help with?</FormLabel>
                      <FormControl>
                        <Textarea 
                            placeholder="Ex. Derivatives and Integral" 
                            {...field} 
                            className="input"
                            disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="voice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voice</FormLabel>
                      <FormControl>
                      <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                            disabled={isLoading}
                      >
                            <SelectTrigger className="input">
                            <SelectValue placeholder="Select the voice" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">
                                   Male
                              </SelectItem>
                              <SelectItem value="female">
                                   Female
                              </SelectItem>
                            </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style</FormLabel>
                      <FormControl>
                      <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                            disabled={isLoading}
                      >
                            <SelectTrigger className="input">
                            <SelectValue placeholder="Select the style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="formal">
                                   Formal
                              </SelectItem>
                              <SelectItem value="casual">
                                   Casual
                              </SelectItem>
                            </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated session duration in minutes</FormLabel>
                      <FormControl>
                        <Input 
                            type="number"
                            placeholder="15"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)}
                            className="input"
                            disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                    type="submit" 
                    className="w-full cursor-pointer" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Companion...' : 'Build Your Companion'}
                </Button>
              </form>
            </Form>
        </div>
    )
}

export default CompanionForm