export default function ProfileCard({ username, userId, email }) {
   return (
     <div className="bg-white p-6 text-sm rounded-lg shadow-md">
       <div>
         <h1 className="text-primary text-xl font-bold">Hello, {username}</h1>
         <p className="text-neutral-dark italics">Welcome to Handshakr!</p>
         <p className="mt-4">ID#: <span className="text-primary font-bold">{userId}</span></p>
         <p className="mt-2">Email: <span className="text-primary font-bold">{email}</span></p>
       </div>
     </div>
   );
 }
 