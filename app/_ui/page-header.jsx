export default function PageHeader ({title, subTitle}) {
    return (
        <div className="mb-4">
            <h1 className="text-primary font-bold text-3xl">{title}</h1>
            {subTitle && <h2 className="italic">{subTitle}</h2>}
        </div>
    );
}