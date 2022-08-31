import React from 'react';

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
            <div className="form-control w-full max-w-xs ">
                <label className="label">
                    <span className="label-name">Address</span>
                </label>
                <input
                    type="text"
                    placeholder="city, country"
                    className="input input-bordered w-full max-w-xs lg:max-w-sm"
                    {...register("address", {
                        required: {
                            value: true,
                            message: "Address is Required",
                        },
                    })}
                />
                <label className="label">
                    {errors.address?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                            {errors.address.message}
                        </span>
                    )}
                </label>
            </div>
            <div className="form-control w-full max-w-xs ">
                <label className="label">
                    <span className="label-name">Zip Code</span>
                </label>
                <input
                    type="number"
                    placeholder="Zip or Area code"
                    className="input input-bordered w-full max-w-xs lg:max-w-sm"
                    {...register("zip", {
                        required: {
                            value: true,
                            message: "Zip or Area code is Required",
                        },
                    })}
                />
                <label className="label">
                    {errors?.zip?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                            {errors?.zip.message}
                        </span>
                    )}
                </label>
            </div>

            <label className="label ">Account Type</label>
            <div className="flex justify-between items-center mt-2 mb-7 px-1">
                <div className="flex space-x-2 items-center">
                    <input
                        {...register("type", { required: true })}
                        type="radio"
                        name="type"
                        value="personal"
                        className="radio radio-primary"
                        id="personal"
                        checked
                    />
                    <label htmlFor="personal">Personal</label>
                </div>
                <div className="flex space-x-2 items-center">
                    <input
                        {...register("type", { required: true })}
                        type="radio"
                        name="type"
                        value="merchant"
                        className="radio radio-primary"
                        id="merchant"
                    />
                    <label htmlFor="merchant">Merchant</label>
                </div>
            </div>
            <div className="form-control w-full max-w-xs ">
                <label className="label">
                    <span className="label-name">Avatar</span>
                </label>
                <input
                    type="file"
                    className="input input-bordered w-full max-w-xs lg:max-w-sm"
                    {...register("avatar", {
                        required: {
                            value: true,
                            message: "Avatar is Required",
                        },
                    })}
                />
                <label className="label">
                    {errors.avatar?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                            {errors.avatar.message}
                        </span>
                    )}
                </label>
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={() => {
                        setShowNamePart(true);
                        setShowTypePart(false);
                    }}
                    className="btn btn-outline lg:w-5/12"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        if (!errors?.address && !errors?.zip && !errors?.avatar) {
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