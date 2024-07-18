import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { Bounce, toast } from "react-toastify";

type Props = {};

export default function MasterVariant({}: Props) {
    const [product, setProduct] = useState<any>([]);
    const nameRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    const [image, setImage] = useState(null);
    const [productId, setProductId] = useState<any>();

    const handleSelect = (e: any) => {
        setProductId(e.target.value);
    };

    const router = useRouter();

    const [resizedImage, setResizedImage] = useState(null);
    const maxWidth = 800; // Lebar maksimum gambar yang diinginkan
    const maxFileSize = 10240; // Ukuran maksimum file (dalam byte) - dalam hal ini, 10 KB

    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader: any = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    let newWidth = img.width;
                    let newHeight = img.height;

                    // Mengubah ukuran gambar jika lebar melebihi maksimum
                    if (img.width > maxWidth) {
                        newWidth = maxWidth;
                        newHeight = (img.height * maxWidth) / img.width;
                    }

                    const canvas = document.createElement("canvas");
                    const ctx: any = canvas.getContext("2d");
                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    // Menggambar gambar yang diubah ukurannya ke dalam canvas
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    // Mengompres gambar dengan mengurangi kualitas hingga file kurang dari maxFileSize
                    let quality = 0.7; // Nilai awal kualitas gambar
                    let dataUrl: any = canvas.toDataURL("image/jpeg", quality);

                    while (dataUrl.length > maxFileSize) {
                        // Mengurangi kualitas gambar
                        quality -= 0.1;
                        dataUrl = canvas.toDataURL("image/jpeg", quality);
                    }

                    setImage(reader.result); // Set gambar asli
                    setResizedImage(dataUrl); // Set gambar yang diubah ukurannya
                };

                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const values = {
            name: nameRef.current?.value,
            code: "null",
            qty: quantityRef.current?.value,
            price: priceRef.current?.value,
            image_location: resizedImage,
            active: true,
            updated_user: "admin",
            updated_date: new Date(),
            created_user: "admin",
            created_date: new Date().valueOf(),
            product_id: productId,
        };
        axios
            .post("/api/masterVariant", values)
            .then((res) => {
                res;
                toast.success('Variant Produk berhasil ditambahkan!', {
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
                toast.error('Gagal menambahkan variant produk!', {
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
            .get("/api/masterProduct")
            .then((res) => {
                setProduct(res.data);
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
                                            htmlFor='Nama Product Varian'
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
                                        <label
                                            htmlFor='Quantity'
                                            className='block text-sm font-medium leading-6 text-gray-900'>
                                            Quantity
                                            <span className="ms-2 text-red-500">*</span>
                                        </label>
                                        <div className='mt-2'>
                                            <input
                                                ref={quantityRef}
                                                id='product'
                                                name='product'
                                                type='number'
                                                required
                                                className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            />
                                        </div>
                                    </div>
                                    <div className='p-2'>
                                        <label
                                            htmlFor='Price'
                                            className='block text-sm font-medium leading-6 text-gray-900'>
                                            Price
                                            <span className="ms-2 text-red-500">*</span>
                                        </label>
                                        <div className='mt-2'>
                                            <input
                                                ref={priceRef}
                                                id='price'
                                                name='price'
                                                type='number'
                                                required
                                                className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='Input Image'
                                            className='block text-sm font-medium leading-6 text-gray-900'>
                                            Input Image
                                            <span className="ms-2 text-red-500">*</span>
                                        </label>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            onChange={handleImageUpload}
                                            required
                                        />
                                        {image && <img src={image} alt='Preview' />}
                                    </div>
                                    <div className='p-2'>
                                        <label>
                                            Product
                                            <span className="ms-2 text-red-500">*</span>
                                            <select
                                                onChange={handleSelect}
                                                name='selectCategoryProd' className="mx-4 px-1 py-1 bg-transparent border-b-2 border-black">
                                                {product.map((item: any) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <button className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                        Isi Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
