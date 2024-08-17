import React, { useEffect, useState } from 'react'
import MyAwaitInput from '../../my-ui/MyAwaitInput'
import MyFieldSelect from '../../my-ui/MyFieldSelect'
import MyFloatingInput from '../../my-ui/MyFloatingInput'
import MyFloatingSelect from '../../my-ui/MyFloatingSelect'
import { axiosInstance } from '../../util/apis'
import AppyTagButton from './AppyTagButton'
import TagSelector from './TagSelector'

const SearchBarV2 = ({ searchData, setSearchData }) => {

    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [chapters, setChapters] = useState([])
    const [authors, setAuthors] = useState([])

    const handleTypeChange = (event) => {
        const selectedType = event.target.value;
        if (selectedType === 'ALL') {
            setSearchData(prev => ({ ...prev, pageNo: 0, type: null }));
        } else {
            setSearchData(prev => ({ ...prev, pageNo: 0, type: event.target.value }));
        }
    }

    const handleAnySelectChange = (event) => {
        // Get the name attribute and selected value
        const value = event.target.value;
        if (value === 'ALL' || value === 'None' || value === 'DEFAULT') {
            setSearchData(prev => ({ ...prev, pageNo: 0, [event.target.name]: null }));
        } else {
            const { name, value } = event.target;
            setSearchData(prev => ({ ...prev, pageNo: 0, [name]: value }));
        }
    }

    const getAllCats = async () => {
        try {
            const response = await axiosInstance.get('categories');
            console.info(response.data);
            response.data.unshift({ id: 0, name: 'ALL' })
            setCategories(response.data.map(c => c.name));
        } catch (err) {
            console.info('Error', err);
        }
    }

    const getAllBooks = async () => {
        try {
            const response = await axiosInstance.get('books');
            console.info(response.data);
            response.data.unshift({ id: 0, title: 'ALL' })
            setBooks(response.data);
        } catch (err) {
            console.info('Error', err);
        }
    }

    const getAllChapters = () => {
        const chapters = Array.from({ length: 50 }, (_, i) => i + 1);
        chapters.unshift('None');
        setChapters(chapters);
    }

    const getAllAuthors = async () => {
        try {
            const response = await axiosInstance.get('authors');
            console.info(response.data);
            response.data.unshift({ id: 0, name: 'ALL' })
            setAuthors(response.data);
        } catch (err) {
            console.info('Error', err);
        }
    }

    useEffect(() => {
        getAllCats();
        getAllBooks();
        getAllAuthors();
        getAllChapters();
    }, [])

    const handleSortByChange = (event) => {
        const sortBy = event.target.value;
        if (sortBy === 'DEFAULT') {
            setSearchData(prev => ({ ...prev, pageNo: 0, sortBy: null }));
        } else {
            setSearchData(prev => ({ ...prev, pageNo: 0, sortBy }));
        }
    }

    const handleQutoeSearch = (searchValue) => {
        const quote = searchValue.trim();
        if (quote.length > 0) {
            setSearchData(prev => ({ ...prev, pageNo: 0, quote }));
        } else {
            setSearchData(prev => ({ ...prev, pageNo: 0, quote: null }));
        }
        console.info("Inisde SearchBar(Parent) ", searchValue);
    }

    const handleTagSearch = (tagsArray) => {
        setSearchData(prev => ({ ...prev, pageNo: 0, tags : tagsArray }));
    }

    const type = searchData.type || 'ALL';
    console.info('Search DATA ', searchData)
    return (
        <>
            <>
                <div class="form-group row mt-3">
                    <div class="col-sm-3">
                        <MyFieldSelect label='Type' onChange={handleTypeChange} value={searchData.type} options={['ALL', 'BIBLE', 'BOOK', 'INDIVIDUAL', 'OWN']} />
                    </div>
                    <div class="col-sm-3">
                        <MyFieldSelect label='Category' onChange={handleAnySelectChange} value={searchData.category} options={categories} />
                    </div>
                    <div class="col-sm-6">
                        <MyAwaitInput label='Quote' onChange={handleQutoeSearch} />
                    </div>
                </div>

                <div class="form-group row">

                    <div class="col-sm-3">
                        <MyFieldSelect label='Book' onChange={handleAnySelectChange} value={searchData.book} options={books.map(b => b.title)} />
                    </div>

                    <div class="col-sm-3">
                        <MyFieldSelect label='Author' onChange={handleAnySelectChange} value={searchData.author} options={authors.map(a => a.name)} />
                    </div>
                    <div class="col-sm-2">
                        <MyFieldSelect label='Chapter' onChange={handleAnySelectChange} value={searchData.chapter} options={chapters} />
                    </div>
                    <div class="col-sm-2">
                        <MyFieldSelect label='Sort By' onChange={handleSortByChange} value={searchData.sortBy} options={["DEFAULT", "quote",
                            "author",
                            "category",
                            "type",
                            "dateCreated",
                            "lastUpdated",
                            "book",
                            "chapter",
                            "verse"]} />
                    </div>
                    <div class="col-sm-2">
                        <MyFieldSelect label='Sort Order' onChange={handleAnySelectChange} value={searchData.sortOrder} options={['DEFAULT', 'ASC', 'DESC']} />
                    </div>
                </div>

                <div class="form-group row mt-3">
                    <div class="col-sm-6">
                        <TagSelector label='Tags' variant='simple' onChange={handleTagSearch} />
                    </div>
                    <div class="col-sm-6">
                        <AppyTagButton searchData={searchData} />
                    </div>
                </div>

            </>



        </>

    )
}

export default SearchBarV2