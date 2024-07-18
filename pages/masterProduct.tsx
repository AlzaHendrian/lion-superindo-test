import React, { useRef, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { Bounce, toast } from "react-toastify";

type Props = {};

export default function MasterProduct({}: Props) {
    const nameRef = useRef<HTMLInputElement>(null);
    const [dataCategory, setDataCategory] = useState<any>([]);
    const [categoryId, setCategoryId] = useState();
    dataCategory;

    const router = useRouter();
    const handleSelect = (e: any) => {
        setCategoryId(e.target.value);
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const values = {
            name: nameRef.current?.value,
            active: true,
            updated_user: "admin",
            updated_date: new Date(),
            created_user: "admin",
            created_date: new Date().valueOf(),
            product_category_id: categoryId,
            plu: "null",
        };
        axios
            .post("/api/masterProduct", values)
            .then((res) => {
                res;
                toast.success('Produk berhasil ditambahkan!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
            })
            .catch((err) => {
                err;
                toast.error('Gagal menambahkan produk!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/login");
        axios
            .get("/api/masterCategory")
            .then((res) => {
                setDataCategory(res.data);
            })
            .catch((err) => {
                err;
            });
    }, []);
    return (
        <div>
            <Navbar />
            <header className='bg-white shadow'>
                <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                        Master Prodcut
                    </h1>
                </div>
            </header>
            <main>
                <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
                    <div className='bg-white'>
                        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
                            <h2 className='font-semibold'>Masukkan Product</h2>

                            <div>
                                <form onSubmit={handleSubmit} className=''>
                                    <div className='p-2'>
                                        <label
                                            htmlFor='Nama Categori'
                                            className='block text-sm font-medium leading-6 text-gray-900'>
                                            Nama Product
                                            <span className="ms-2 text-red-500">*</span>
                                        </label>
                                        <div className='mt-2'>
                                            <input
                                                ref={nameRef}
                                                id='product'
                                                name='product'
                                                type='text'
                                                required
                                                className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            />
                                        </div>
                                    </div>
                                    <div className='p-2'>
                                        <label>
                                            Status
                                            <span className="ms-2 text-red-500">*</span>
                                            <select
                                                onChange={handleSelect}
                                                name='selectCategoryProd' className="mx-4 px-1 py-1 bg-transparent border-b-2 border-black">
                                                {dataCategory.map((item: any) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <button className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Isi Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
