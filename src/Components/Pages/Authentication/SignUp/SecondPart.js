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
                        },
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
            <div className="form-control w-full  ">
                <label className="label">
                    <span className="label-name">Profile Picture</span>
                </label>
                <input
                    type="file"
                    className="input input-bordered w-full   "
                    {...register("avatar", {
                        required: {
                            value: true,
                            message: "Profile picture is Required",
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