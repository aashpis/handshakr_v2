export default function HandshakeAnalyticsCard({count, type}){
    return(
        <div className="bg-white my-4 text-grey-700 text-sm border rounded">
            <p className="text-amber-700 text-lg font-bold ">{count}</p>
            <p>{type}</p>
        </div>
    )
}