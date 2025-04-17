'use client'

import { useActionState } from 'react'
import Image from 'next/image';
import PriceStatsCard from './price-stats-card';

export default function PriceChecker() {
    const [state, action, pending] = useActionState(PLACEHOLDER, undefined)



    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
            <form
                action={action}
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Get Price Analysis</h2>

                <div className="mb-4">
                    <label
                        className="block text-sm font-medium  mb-2"
                        htmlFor="item">
                        Item Name
                    </label>
                    <input
                        id="itemName"
                        name="itemName"
                        required
                        className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    />
                </div>

                <button
                    className="w-full bg-primary text-white py-4 px-4 font-bold text-sm rounded cursor-pointer focus:outline-none focus:shadow-outline hover:bg-primary-dark"
                    disabled={pending}
                    type="submit"
                >
                    {pending ? 'Getting Analysis...' : 'Get Price Analysis'}
                </button>


                {state?.errors?.handshakeName && (
                    <p className="text-warning italic mt-1">
                        Failed to get Price Analysis
                    </p>
                )}
                {state?.success && (
                    <p className="text-success text-center font-semibold my-3">
                        Price Analysis Complete!
                    </p>
                )}
            </form>
            <div>
           <PriceStatsCard />
            </div>
            <Image
                src="/profile.png"
                width={500}
                height={500}
                alt="Picture of the author"
            />
            <Image
                src="/profile.png"
                width={500}
                height={500}
                alt="Picture of the author"
            />
            <Image
                src="/profile.png"
                width={500}
                height={500}
                alt="Picture of the author"
            />
            <div>
            </div>
        </div>
    );
}