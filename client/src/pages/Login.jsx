import SignForm from "../components/SignForm";

export default function Login() {
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Welcome to WardrobeQ, please login to continue.
                        </p>
                    </div>
                    <SignForm type={'login'}/>
                </div>
            </div>
        </>
    );
}
