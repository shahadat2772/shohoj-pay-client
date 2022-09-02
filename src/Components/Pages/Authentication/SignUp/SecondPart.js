import React from 'react';
import "./Signup.css";


const SecondPart = ({
    showTypePart,
    setShowNamePart,
    setShowPasswordPart,
    setShowTypePart,
    setProgress,
    register,
    errors
}) => {
    return (
        <div className={`${showTypePart ? "block" : "hidden"}`}>

            <div className="form-control w-full  ">
                <label className="label">
                    <span className="label-name">Phone</span>
                </label>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input input-bordered w-full"
                    {...register("phone", {
                        required: {
                            value: true,
                            message: "Phone Number is Required",
                        }
                    })}
                />
                <label className="label">
                    {errors.phone?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                            {errors.phone.message}
                        </span>
                    )}
                </label>
            </div>

            <label className="label ">Account Type</label>
            <div className="flex justify-between items-center mt-2 px-1">
                <div className="flex space-x-2 items-center">
                    <input
                        {...register("type", {
                            required: {
                                value: true,
                                message: "Type Number is Required",
                            }
                        })}
                        type="radio"
                        name="type"
                        value="personal"
                        className="radio radio-primary"
                        id="personal"

                    />
                    <label htmlFor="personal">Personal</label>
                </div>
                <div className="flex space-x-2 items-center">
                    <input
                        {...register("type", {
                            required: {
                                value: true,
                                message: "Type Number is Required",
                            }
                        })}
                        type="radio"
                        name="type"
                        value="merchant"
                        className="radio radio-primary"
                        id="merchant"
                    />
                    <label htmlFor="merchant">Merchant</label>
                </div>
            </div>
            <label className="label">
                {errors.type?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                        {errors.type.message}
                    </span>
                )}
            </label>
            <div className="form-control w-full mt-2 mb-5">
                <label className="label">
                    <span className="label-name">Profile Picture</span>
                </label>
                <input
                    type="file"
                    className=" file-input block w-full text-basefont-normaltext-gray-700bg-white bg-clip-padding rounded-lg" aria-describedby="file_input_help"
                    {...register("avatar")}
                />

            </div>
            <div className="flex justify-between items-center ">
                <button
                    onClick={() => {
                        setProgress(1)
                        setShowNamePart(true);
                        setShowTypePart(false);
                    }}
                    className="btn btn-outline lg:w-5/12"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        if (!errors?.phone && !errors.type) {
                            setProgress(3);
                            setShowPasswordPart(true);
                            setShowTypePart(false);
                        }
                    }}
                    className="btn lg:w-6/12"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SecondPart;