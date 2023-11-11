'use client'
import React from 'react';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const router = useRouter();

    const handleOnSubmit = async () => {
        axios.get(`/api/register?name=${name}&email=${email}&password=${password}`)
        .then((data) => {
            router.push('/login')
        })
        .catch((err) => {
            console.error(err)
        })
    };

    return (
        <form onSubmit={handleOnSubmit} className="mx-auto w-1/2">
            <div className="space-y-12 m-auto w-1/2">
                <div className="border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Register</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <div className="flex rounded-md ring-1  ring-gray-300">
                                    <input onChange={(e) => setName(e.target.value)} type="text" className="block flex-1 bg-transparent py-1.5 pl-1" placeholder="janesmith" />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            <div className="mt-2">
                                <div className="flex rounded-md ring-1  ring-gray-300">
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="block flex-1 bg-transparent py-1.5 pl-1" placeholder="janesmithQgmail.com" />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <div className="flex rounded-md ring-1  ring-gray-300">
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="block flex-1 bg-transparent py-1.5 pl-1" />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <div className="flex focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <Button className="m-auto w-5" color="primary" onClick={handleOnSubmit}>
                                        Register
                                    </Button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}