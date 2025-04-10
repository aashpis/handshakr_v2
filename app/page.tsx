import Image from 'next/image';
import LoginForm from "@/_ui/login-form"
import CreateNewAccountButton from "@/_ui/create-new-account-button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden mt-10">
        <Image
          src="/handshakr-banner.png"
          width={1153}
          height={370}
          alt="handshakr banner"  
          className="w-full h-auto"
        />
        
        <div className="p-4">
          <LoginForm />
          <div className='flex flex-row items-center justify-center m-4'>
            <hr className="flex-grow border-neutral"/>
            <p className="p-2 text-neutral">or</p>
            <hr className="flex-grow border-neutral"/>
          </div>
          <CreateNewAccountButton />
        </div>
      </div>
    </div>
  );
}