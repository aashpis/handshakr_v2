export default function HandshakeResponseButtons(){
    return(
        <div className="flex row">
            <button 
            
            onClick={acceptHandhsake}>
                accept
            </button>
            <button onClick={rejectHandshake}>
                reject
            </button>
        </div>
    )
}