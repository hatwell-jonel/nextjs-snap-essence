import {useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {

    const [query, setQuery] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const currentQuery = searchParams.get('q') || '';
        setQuery(currentQuery);
    }, [searchParams]);

    const handleSearch = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (query.trim() === '') {
            // Remove query parameter if search is cleared
            router.push(pathname);
        } else {
            // Update the URL with the new query
            const params = new URLSearchParams(searchParams.toString());
            params.set('q', query);
            router.push(`${pathname}?${params.toString()}`);
        }

        // // Update the URL with the new query
        // const params = new URLSearchParams(searchParams.toString());
        // params.set('q', query);
        // router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch}  className='form_search'>
            <input     
                type="text"
                className="input_search"
                placeholder="Search images..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button type="submit" className="icon_search">
                <FaSearch />
            </button>
            {/* <FaSearch className='icon_search' /> */}
        </form>
    )
}

export default SearchInput