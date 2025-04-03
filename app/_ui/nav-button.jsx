export default function NavButton(linkData){
    return(
        <Link
        href= {linkData.pathName}
        >
        {linkData.linkName}
        </Link>
    )
}