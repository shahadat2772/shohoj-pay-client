import { SafetyCertificateTwoTone } from '@ant-design/icons';
import { async } from '@firebase/util';
import { isAsyncThunkAction } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';

const FirstPart = ({
    showNamePart,
    setShowNamePart,
    setShowTypePart,
    setProgress,
    errors,
    register
}) => {
    const [data, setData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cities, setCities] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json");
            const jsonData = await response.json();
            if (jsonData) {
                setData(await jsonData);
                const uniqueData = [...new Set(data.map((item) => item.country))];
                setCountries(uniqueData.sort());
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData();
        const cities = data.filter(c => c.country === selectedCountry);
        setCities(cities.map(c => c.name).sort());
    }, [data]);

    // console.log(cities.length)
    return (
        <div className={`${showNamePart ? "block" : "hidden"}`}>
            <div className="form-control w-full  ">
                <label className="label">
                    <span className="label-name">Full Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered w-full"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "Name is Required",
                        },
                    })}
                />
                <label className="label">
                    {errors.name?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                            {errors.name.message}
                        </span>
                    )}
                </label>
            </div>

            <div className="form-control w-full  ">
                <label className="label">
                    <span className="label-email">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="Email"
                    autoComplete="new-password"
                    className="input input-bordered w-full "
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Email Is Required",
                        },
                        pattern: {
                            value: /[a-z0-9]+@.[a-z]{3}/,
                            message: "Your Email Have Must Be A Special characters",
                        },
                    })}
                />
                <label className="label">
                    {errors?.email?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                    {errors?.email?.type === "pattern" && (
                        <span className="label-text-alt text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                </label>
            </div>


            <div className='lg:grid grid-cols-2 gap-5 mb-5'>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-name">Country</span>
                    </label>
                    <select
                        {...register("country", {
                            required: {
                                value: true,
                                message: "Country is Required",
                            }
                        })}
                        className='select select-bordered'
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        value={selectedCountry}
                    >
                        {
                            countries.map((c) => (
                                <option key={c} value={c} >
                                    {c}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-name">City</span>
                    </label>
                    <select
                        {...register("city", {
                            required: {
                                value: true,
                                message: "City is Required",
                            }
                        })}
                        className='select select-bordered'>
                        {
                            cities.map((c) => (
                                <option key={c} value={c} >
                                    {c}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <button
                onClick={() => {
                    if (
                        errors &&
                        !errors.name &&
                        !errors.country &&
                        !errors.city &&
                        !errors.email
                    ) {
                        setProgress(2);
                        setShowTypePart(true);
                        setShowNamePart(false);
                    }

                }}
                className="btn w-full "
            >
                Next
            </button>
        </div>
    );
};

export default FirstPart;