import { useEffect, useState } from 'react'
import ky from 'ky'

type Content = {
    url: string,
    author: string,
    type: 'image' | 'video',
}

type Page = {
    nextContinuationToken: string | null,
    contents: Content[]
}

export default function usePages(): {
    contents: Content[],
    currentPage: number,
    reset(): Promise<void>,
    previousPageDisabled: boolean,
    goToPreviousPage(): Promise<void>,
    nextPageDisabled: boolean,
    goToNextPage(): Promise<void>,
} {
    const [currentPage, setCurrentPage] = useState(0)

    const [pages, setPages] = useState<Page[]>([])

    useEffect(() => {
        if (currentPage === -1) {
            return setCurrentPage(0)
        }

        (async () => {
            const currentArrayLength = pages.length
            const nextContinuationToken = pages[currentArrayLength - 1]?.nextContinuationToken ?? '';
    
            // If end of data or data already there
            if (currentArrayLength !== 0 && (pages[currentArrayLength] || !nextContinuationToken)) {
                return
            }
    
            const data = await ky.get(`/api/contents?nextContinuationToken=${nextContinuationToken}`).json<Page>()
    
            setPages(arr => {
                // NOTE: use previously queried length to prevent race conditions
                arr[currentArrayLength] = data
                return Array.from(arr)
            })
        })()
    }, [currentPage])

    async function goToPreviousPage() {
        if (currentPage !== 0) {
        setCurrentPage(currentPage - 1)
        }
    }

    async function goToNextPage() {
        const page = pages[currentPage]

        if (page?.nextContinuationToken) {
            setCurrentPage(currentPage + 1)
        }
    }

    async function reset() {
        // trigger refetch
        setCurrentPage(-1)
        setPages([])
    }

    return {
        contents: pages[currentPage]?.contents ?? [],
        reset,
        currentPage,
        previousPageDisabled: currentPage === 0,
        goToPreviousPage,
        nextPageDisabled: pages[currentPage]?.nextContinuationToken != null,
        goToNextPage,
    }
}