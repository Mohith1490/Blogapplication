"use client"

import { Link, X } from "lucide-react"

export function SearchFormReset() {
    const reset = () => {
        const form = document.querySelector('search-form') as HTMLFormElement
        if (form) form.reset()
    }
    return (
        <>
            <button type='reset' onClick={reset}>
                <Link href="/" className="search-btn text-white">
                  <X className="size-5" />
                </Link>
            </button>
        </>
    )
}