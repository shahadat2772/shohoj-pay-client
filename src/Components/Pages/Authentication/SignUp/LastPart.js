import React from 'react';

const LastPart = ({
    setProgress,
    setShowPasswordPart,
    setShowTypePart,
    showPasswordPart,
    handleShow,
    passwordShowRef,
    show,
    register,
    errors
}) => {
    return (
        <div className={`${showPasswordPart ? "block" : "hidden"}`}>
            <div className="relative form-control w-full  ">
                <label className="label">
                    <span className="label-password">Password</span>
                </label>
                {/* PASSWORD SHOW HIDE */}
                <div
                    onClick={handleShow}
                    className="absolute inset-y-0 right-3 flex items-center px-2 top-6"
                >
                    <label className="swap swap-rotate">
                        <input ref={passwordShowRef} type="checkbox" />
                        <i className="fa-solid fa-eye-low-vision swap-on fill-current"></i>
                        <i className="fa-solid fa-eye swap-off fill-current"></i>
                    </label>
                </div>
                <input
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full "
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Password Is Required",
                        },
                        minLength: {
                            value: 6,
                            message: "Password Must Be 6 characters",
                        },
                    })}
                />
                <label className="label">
                    {errors.password?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                    {errors.password?.type === "minLength" && (
                        <span className="label-text-alt text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </label>
            </div>
            <div className="form-control w-full  ">
                <label className="label">
                    <span className="label-password">Confirm Password</span>
                </label>

                <input
                    type={show ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="input input-bordered w-full "
                    {...register("ConfirmPassword", {
                        required: {
                            value: true,
                            message: "Please Type A Confirm Password",
                        },
                    })}
                />
                <label className="label">
                    {errors.ConfirmPassword?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                            {errors.ConfirmPassword.message}
                        </span>
                    )}
                </label>
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={() => {
                        setProgress(2)
                        setShowPasswordPart(false);
                        setShowTypePart(true);
                    }}
                    className="btn btn-outline lg:w-5/12"
                >
                    Back
                </button>
                <input
                    className="btn lg:w-6/12"
                    type="submit"
                    value="Register"
                />
            </div>
        </div>
    );
};

export default LastPart;