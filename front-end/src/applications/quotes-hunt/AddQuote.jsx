import React, { useEffect, useState } from 'react'
import MyFloatingInput from '../../my-ui/MyFloatingInput';
import MyFloatingPassword from '../../my-ui/MyFloatingPassword';
import countriesMock from '../../util/countriesMock';
import MyDropdwonBox from '../../my-ui/MyDropdwonBox';
import MyFloatingSelect from '../../my-ui/MyFloatingSelect';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { toast } from 'react-toastify';
import MyFloatingTextarea from '../../my-ui/MyFloatingTextarea';
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../util/apis';
import { MyDiaglog } from './AddTag';

const MockData = countriesMock;

const schema = z.object({
    product: z.string().min(4).max(20),
    cost: z.coerce.number().gte(10, 'Must be 18 and above'),
    date: z.coerce.date(),
    type: z.string()
}
)

const quoteTypes = [,
    'BOOK',
    'INDIVIDUAL',
    'OWN',
    'BIBLE'
];

export const AddQuote = () => {

    useSearchParams();
    const [type, setType] = useState('BOOK')
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [authors, setAuthors] = useState([])
    const params = useParams();
    const quoteId = params.quoteId;
    const title = quoteId === undefined ? 'Create Quote' : 'Edit Quote';

    const getUserById = async () => {
        try {

            console.info('Quote Id: ', quoteId);
            const response = await axiosInstance.get(`quotes/${quoteId}`);
            setType(response.data.type);
            response.data.tags = response.data.tags === null ? [] : response.data.tags.join(',');
            return response.data;
        } catch (err) {
            console.info('Error', err);
            return {};
        }
    }

    const navigate = useNavigate();
    const form = useForm({
        defaultValues: getUserById
        // resolver: zodResolver(schema)
    }
    );
    const { register, control, handleSubmit, reset, getValues, formState } = form;
    const { errors, isDirty, isValid } = formState;

    const handleTypeChange = (event) => {
        console.info(event.target.value);
        setType(event.target.value);
        reset({ type: event.target.value });
    }

    useEffect(() => {
        getAllCats();
        getAllBooks();
        getAllAuthors();
        //console.info('USE EFFECT ', getValues('type'))

        // setType( getValues('type'));
    }, [])

    const onSubmit = async (data) => {
        console.info('Submitted data:', data);
        console.info('Submitted data:', typeof data.tags.constructor.name);
        data.tags = data.tags.split(',');
        try {

            // If quote ID presents, call update api
            if (quoteId) {
                const response = await axiosInstance.put(`quotes/${quoteId}`, data);
                toast.success(`Quote updated successfully`);
            } else {
                const response = await axiosInstance.post('quotes', data);
                toast.success(`Quote created successfully.`);
            }

            console.info('Saved quote Id: ');
            navigate('..');
        } catch (err) {
            if (quoteId) {
                toast.error(`Quote updated Failed`);
            } else {
                toast.error(`Quote created Failed`);
            }
        }
    }

    const getAllCats = async () => {
        try {
            const response = await axiosInstance.get('categories');
            console.info(response.data);
            setCategories(response.data.map(c => c.name));
        } catch (err) {
            console.info('Error', err);
        }
    }

    const getAllBooks = async () => {
        try {
            const response = await axiosInstance.get('books');
            console.info(response.data);
            setBooks(response.data);
        } catch (err) {
            console.info('Error', err);
        }
    }

    const getAllAuthors = async () => {
        try {
            const response = await axiosInstance.get('authors');
            console.info(response.data);
            setAuthors(response.data);
        } catch (err) {
            console.info('Error', err);
        }
    }

    const bibleAuthors = authors.filter(a => a.isBibleAuthor).map(a => a.name);
    const indauthors = authors.filter(a => !a.isBibleAuthor).map(a => a.name);
    const bibleBooks = books.filter(a => a.isBibleBook).map(a => a.title);
    const generalBooks = books.filter(a => !a.isBibleBook).map(a => a.title);
    console.info('General Books: ', bibleBooks)
    return (


        <form onSubmit={handleSubmit(onSubmit)}>
             {/* <AddBookDialog show={dialog === 'BOOK'} onSave={handleBookSave} onHide={handleClose} /> */}
             
            <div className="container-md mt-4">
                <h3>{title}</h3>
                <div className="row">
                    <div className="col-md-12 col-sm-12 my-2">
                        <MyFloatingTextarea label='Quote' register={register} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 my-1">
                        <MyFloatingSelect label='Type' register={register} onChange={handleTypeChange} type='date' options={quoteTypes} />
                    </div>

                    {
                        type !== 'OWN' &&
                        <div className="col-md-4 my-1">
                            {
                                type === 'INDIVIDUAL' && <MyFloatingSelect key='ind' label='Author' register={register} type='date' options={indauthors} />
                            }
                            {
                                type === 'BIBLE' && <MyFloatingSelect key='bible' label='Author' register={register} type='date' options={bibleAuthors} />
                            }
                            {
                                type === 'BOOK' && <MyFloatingSelect key='book' label='Book' register={register} type='date' options={generalBooks} />
                            }
                        </div>
                    }
                    <div className="col-md-4 my-1">
                        <MyFloatingSelect label='Category' register={register} type='date' options={categories} />
                    </div>
                </div>
                {
                    type === 'BIBLE' && <div className="row">
                        <div className="col-md-4 my-1">
                            <MyFloatingSelect label='Book' register={register} type='date' options={bibleBooks} />
                        </div>
                        <div className="col-md-4 my-1">
                            <MyFloatingInput register={register} label='Chapter' />
                        </div>
                        <div className="col-md-4 my-1">
                            <MyFloatingInput register={register} label='Verse' />
                        </div>
                    </div>
                }

                <div className="row">
                    <div className="col-md-12 my-1">
                        <MyFloatingInput register={register} label='Tags' />
                    </div>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary order-first" type="submit">{quoteId === undefined ? 'Add New' : 'Update  '}</button>
                    <button class="btn btn-danger me-md-2" onClick={() => navigate('..')} type="button">Back</button>
                </div>
            </div>
            <DevTool control={control} />
        </form>
    )
}

