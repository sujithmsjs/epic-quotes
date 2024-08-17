import React, { useEffect, useState } from 'react'
import MyFieldSelect from '../../my-ui/MyFieldSelect'
import MyFloatingInput from '../../my-ui/MyFloatingInput'
import MyFloatingSelect from '../../my-ui/MyFloatingSelect'
import { axiosInstance } from '../../util/apis'

const SearchBar = ({ searchData, setSearchData }) => {

    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
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
        if (event.target.value === 'ALL') {
            
            setSearchData(prev => ({ ...prev, pageNo: 0, [event.target.name]: null }));
        } else {
            const { name, value } = event.target;
            setSearchData(prev => ({ ...prev, pageNo: 0, [name]: value}));
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
    }, [])

    const handleSortByChange = (event) => {
        const sortBy = event.target.value;
        if (sortBy === 'DEFAULT') {
            setSearchData(prev => ({ ...prev, pageNo: 0, sortBy : null }));
        } else {
            setSearchData(prev => ({ ...prev, pageNo: 0, sortBy }));
        }
    }

    const type = searchData.type || 'ALL';
    console.info('Search DATA ', searchData)
    return (
        <>
            <>
                <div class="form-group row mt-3">
                    <div class="col-sm-3">
                        <MyFieldSelect label='Type' onChange={handleTypeChange} options={['ALL', 'BIBLE', 'BOOK', 'INDIVIDUAL', 'OWN']} />
                    </div>
                    <div class="col-sm-3">
                        <MyFieldSelect label='Category' onChange={handleAnySelectChange} options={categories} />
                    </div>
                    <div class="col-sm-6">
                        <MyFieldSelect label='Quote' />
                    </div>
                </div>

                <div class="form-group row mt-3">
                    {type === 'BIBLE' && <>
                        <div class="col-sm-4">
                             <MyFieldSelect label='Book' onChange={handleAnySelectChange} value={searchData.book} options={books.map(b => b.title)} />
                        </div>
                        <div class="col-sm-4">
                            <MyFloatingSelect label='Chapter' options={['DEFAULT', 'VERSE', 'QUOTE']} />
                        </div>
                    </>
                    }

                    {(type === 'ALL' || type === 'BOOK') &&
                        <>
                            <div class="col-sm-4">
                                <MyFieldSelect label='Book' onChange={handleAnySelectChange} value={searchData.book} options={books.map(b => b.title)} />
                            </div>
                            <div class="col-sm-4">
                                <MyFieldSelect label='Author' options={authors.map(a => a.name)} />
                            </div>
                        </>
                    }
                    {type === 'INDIVIDUAL' &&
                        <>

                            <div class="col-sm-8">
                                <MyFieldSelect label='Author' />
                            </div>
                        </>
                    }


                    <div class="col-sm-2">
                        <MyFieldSelect label='Sort By' onChange={handleSortByChange} options={['DEFAULT', 'VERSE', 'QUOTE']} />
                    </div>
                    <div class="col-sm-2">
                        <MyFloatingSelect label='Sort Order' onChange={handleAnySelectChange} options={['ASC', 'DESC']} />
                    </div>
                </div>

            </>



        </>

    )
}

export default SearchBar