import React from 'react';

const FirstPart = ({
    showNamePart,
    setShowNamePart,
    setShowTypePart,
    setProgress,
    errors,
    register
}) => {

    return (
        <div className={`${showNamePart ? "block" : "hidden"}`}>
            <div className="form-control w-full max-w-xs ">
                <label className="label">
                    <span className="label-name">Full Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered w-full max-w-xs lg:max-w-sm"
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

            <div className="form-control w-full max-w-xs ">
                <label className="label">
                    <span className="label-email">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs"
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
            <div className="form-control w-full max-w-xs ">
                <label className="label">
                    <span className="label-name">Phone</span>
                </label>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input input-bordered w-full max-w-xs lg:max-w-sm"
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
            <button
                onClick={() => {
                    console.log(errors)
                    if (Object.keys(errors).length !== 0) {
                        if (
                            !errors.firstName &&
                            !errors.lastName &&
                            !errors.email &&
                            !errors.phone
                        ) {
                            setProgress(2);
                            setShowTypePart(true);
                            setShowNamePart(false);
                        }
                    }
                }}
                className="btn w-full"
            >
                Next
            </button>
        </div>
    );
};

export default FirstPart;