'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import {z } from 'zod';
import { createPitch } from '@/lib/actions';
import router from 'next/router';


const StartupForm = () => {
  const [error, setError] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("Hello")
  const handleFormSubmit = async  ( prevState: any, formData: any) =>{
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      }
      console.log('usu');
      
      const result = await createPitch(prevState,formData,pitch);
      if(result.status == 'SUCCESS'){
        router.push(`/startup/${result.id}`)
      }
      return result;
    } catch (error) {
      if(error instanceof z.ZodError){
        const fieldErrors = error.flatten().fieldErrors;
        setError(fieldErrors as unknown as Record<string,string>)
        return {...prevState,error:'Validation failed',status: 'ERROR'}
      }
      return {
        ...prevState,
        error:'An unknown error occured',
        status: 'ERROR'
      }
    }
  }
  const [state,formAction,isPending] = useActionState(handleFormSubmit,{error:'',status:"INITIAL" });
  return (
    <form action={formAction} className='startup-form' >
      <div>
        <label htmlFor="title" className='startup-form_label'>title</label>
        <Input id='title' name='title' className='startup-form_input' required placeholder='Startup title' />
        {error.title && <p className='startup-form_error' >{error.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className='startup-form_label'>Description</label>
        <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Startup Description' />
        {error.description && <p className='startup-form_error' >{error.description}</p>}
      </div>
      <div>
        <label htmlFor="category" className='startup-form_label'>category</label>
        <Input id='category' name='category' className='startup-form_input' required placeholder='Startup category' />
        {error.category && <p className='startup-form_error' >{error.category}</p>}
      </div>
      <div>
        <label htmlFor="link" className='startup-form_label'>Image URL</label>
        <Input id='link' name='link' className='startup-form_input' required placeholder='Startup Image URL' />
        {error.link && <p className='startup-form_error' >{error.link}</p>}
      </div>
      <div data-color-mode="light" >
        <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
        <MDEditor
        value={pitch}
        onChange={(value) => setPitch(value as string)}
        id='pitch'
        preview='edit'
        height={300}
        style={{borderRadius:20,overflow:'hidden'}}
        textareaProps={{
          placeholder: "brefily describe about your startup"
        }}
        previewOptions={{
          disallowedElements: ['style']
        }}
        />
        {error.pitch && <p className='startup-form_error' >{error.pitch }</p>}
      </div>
      <Button type='submit' className='startup-form_button' disabled={isPending} >
          {isPending ? 'Submiting....' : "Submit your pitch"} 
          <Send className='size-6 ml-2'/>
      </Button>
    </form>
  )
}

export default StartupForm