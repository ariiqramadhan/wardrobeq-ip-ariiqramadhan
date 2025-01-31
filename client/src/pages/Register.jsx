import SignForm from '../components/SignForm';

export default function Register() {
        return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <p className="py-6">
                            Create new account to have fun with WardrobeQ!
                        </p>
                    </div>
                    <SignForm type={'register'}/>
                </div>
            </div>
        </>
    );
}
