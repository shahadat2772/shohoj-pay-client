import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import auth from "../../../../firebase.init";

const BusinessLoan = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
    });
    const fullDate = new Date().toLocaleDateString();
    const day = days[new Date().getDay()];
    const [user] = useAuthState(auth);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const loanInfo = {
            requester: user.email,
            amount: data.amount,
            status: "pending",
            fullDate,
            day

        };
        console.log(loanInfo);
    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
                <h2 className="textColor text-[1.70rem] mb-11 pl-1">Business Loan</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("amount", {
                            min: {
                                value: 5,
                                message: "$5 is the minimum send amount.",
                            },
                            max: {
                                value: 1000,
                                message: "$1000 is the maximum send amount at a time.",
                            },
                        })}
                        type="number"
                        className="h-12 p-2 w-full rounded"
                        placeholder="How much to send?"
                        required
                    />
                    {errors.amount?.message && (
                        <span className="text-[12px] text-red-600">
                            {errors.amount?.message}
                        </span>
                    )}

                    <input
                        type="submit"
                        className="actionButton mt-12 border-0"
                        value="Send"
                    />
                </form>
            </div>
        </div>
    );
};

export default BusinessLoan;