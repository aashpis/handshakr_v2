


export default function ProfileCard({ username, userId, email }) {
   return (
      <div className="bg-white text-neutral-dark text-sm border rounded">
         <div className="p-4">
            <h1 className="text-primary font-bold">Hello {username}</h1>
            <p>username: <span className="text-primary font-bold">{username}</span></p>
            <p>user ID: <span className="text-primary font-bold">{userId}</span></p>
            <p>email: <span className="text-primary font-bold">{email}</span></p>
         </div>
      </div>

      
   );
}